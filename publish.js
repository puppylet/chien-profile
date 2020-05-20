/* eslint-disable prefer-promise-reject-errors,no-new,handle-callback-err */

// const readline = require('readline')
const Path = require('path')
const Crypto = require('crypto')
const Fs = require('fs')

const Async = require('async')
const AWS = require('aws-sdk')
const chalk = require('chalk')
const Glob = require('glob')
const Mime = require('mime')
const exec = require('child_process').exec
require('colors')

const paths = require('../config/paths')
const buildFolder = Path.relative(process.cwd(), paths.appBuild)

let config, s3, cloudfront

const status = {
  total: 0,
  uploaded: 0,
  skipped: 0
}

const s3Config = require('./config/s3.json')

const options = {
  publicRoot: buildFolder,
  bucket: s3Config.pageBucket,
  region: s3Config.region,
  accessKeyId: s3Config.accessKeyId,
  secretAccessKey: s3Config.secretAccessKey,
  cloudFrontId: s3Config.cloudFrontId
}

// if (process.env.NODE_ENV === 'production') {
//   console.log(chalk.green('Deploying to production...'))
//   options.bucket = s3Config.bucketProd
// }

const deploy = (options, callback) => {
  return setup(options)
  .then(startDeploy)
  .then(() => {
    console.log('-------------------------------------------')
    console.log(
      `Deployed`,
      chalk.green.bold(options.publicRoot),
      'to',
      chalk.green.bold(options.bucket),
      'on S3!'
    )
    console.log('-------------------------------------------')
    console.log('')
    console.log(chalk.bold('Total:    '), status.total)
    console.log(chalk.green.bold('Uploaded: '), status.uploaded)
    console.log(chalk.red.bold('skipped:  '), status.skipped)
    if (callback) {
      return callback(null, '')
    }
    return Promise.resolve('')
  })
  .catch(error => {
    console.error(('error: ' + error).red)
    if (callback) {
      return callback(error)
    }
    return Promise.reject(error)
  })
}

function setup (options) {
  config = options
  if (config.accessKeyId && config.secretAccessKey) {
    AWS.config.credentials = new AWS.Credentials(
      config.accessKeyId,
      config.secretAccessKey
    )
  } else if (config.profile) {
    AWS.config.credentials = new AWS.SharedIniFileCredentials({
      profile: config.profile
    })
  } else {
    return Promise.reject(
      'Must specify profile or accessKeyId and secretAccessKey'
    )
  }

  if (config.cloudFrontId) AWS.config.cloudFrontId = config.cloudFrontId

  if (config.region) {
    AWS.config.region = config.region
  } else {
    AWS.config.region = 'us-east-1'
  }

  if (!config.publicRoot) {
    return Promise.reject('Must specify publicRoot')
  }

  if (!config.bucket) {
    return Promise.reject('Must specify bucket')
  }

  if (!config.acl) {
    config.acl = 'public-read'
  }

  config.concurrentRequests = config.concurrentRequests || 10

  s3 = new AWS.S3()
  cloudfront = new AWS.CloudFront()

  return Promise.resolve()
}

function startDeploy () {
  return getFiles()
  .then(uploadFiles)
  .then(createInvalidation)
}

function getFiles () {
  return new Promise((resolve, reject) => {
    new Glob('**/*.*', { cwd: config.publicRoot }, (err, files) => {
      if (err) {
        return reject(err)
      }
      files = files.filter(
        f => !Fs.lstatSync(Path.join(config.publicRoot, f)).isDirectory()
      )
      resolve(
        files.map(f => {
          const body = Fs.readFileSync(Path.join(config.publicRoot, f))
          return {
            body: body,
            md5: Crypto.createHash('md5')
            .update(body)
            .digest('hex'),
            path: Path.parse(f)
          }
        })
      )
    })
  })
}

function checkIfUploadRequired (file, callback) {
  const key = Path.join(file.path.dir, file.path.base).replace(/\\/g, '/').replace('.gz', '')
  s3.headObject(
    {
      Bucket: config.bucket,
      Key: key
    },
    (err, data) => {
      if (err && err.code === 'NotFound') {
        return callback(null, true)
      } else if (err) {
        return callback(err)
      }
      // console.log(key, data.Metadata['content-md5'], file.md5)
      if (data.Metadata['content-md5'] === file.md5) {
        return callback(null, false)
      }
      callback(null, true)
    }
  )
}

function uploadFile (file, callback) {
  const filePath = Path.join(file.path.dir, file.path.base).replace(/\\/g, '/')
  const isGzipped = file.path.ext === '.gz'
  const normalizeGzippedFile = (filePath) => filePath.replace(/.gz$/, '')

  const key = isGzipped ? normalizeGzippedFile(filePath) : filePath
  const contentType = Mime.getType(Path.extname(key))

  const params = {
    Bucket: config.bucket,
    Key: key,
    ACL: config.acl,
    Body: file.body,
    ContentType: contentType,
    CacheControl: 'max-age=604800', // 7 days
    Metadata: {
      'Content-MD5': file.md5
    }
  }

  if (isGzipped) {
    params.ContentEncoding = 'gzip'
  }

  s3.putObject(params, err => {
    if (err) {
      return callback(err)
    }
    status.uploaded++
    console.log(
      chalk.green.bold('Uploaded: '),
      key
    )
    callback(null)
  })
}

function uploadFiles (files) {
  let processFile
  status.total = files.length

  processFile = (file, callback) => {
    checkIfUploadRequired(file, (err, required) => {
      if (err) {
        return callback(err)
      }
      if (required) {
        return uploadFile(file, callback)
      }
      status.skipped++
      console.log(
        chalk.red.bold('Skipped:  '),
        file.path.dir + '/' + file.path.base.replace('.gz', '')
      )
      return callback()
    })
  }

  return new Promise((resolve, reject) => {
    Async.eachLimit(files, config.concurrentRequests, processFile, err => {
      if (err) {
        return reject(err)
      }
      console.log('\n')
      resolve()
    })
  })
}

function createInvalidation () {
  return new Promise((resolve, reject) => {
    let params
    if (!config.cloudFrontId) {
      return resolve()
    }

    if (status.uploaded === 0) {
      console.log(chalk.bgYellow.bold(' Nothing uploaded. Skip creating invalidation '))
      console.log('')
      return resolve()
    }

    console.log(chalk.green.bold('Creating CloudFront invalidation...'))
    console.log('...')
    params = {
      DistributionId: config.cloudFrontId,
      InvalidationBatch: {
        CallerReference: new Date().toISOString(),
        Paths: {
          Quantity: 1,
          Items: ['/*']
        }
      }
    }
    cloudfront.createInvalidation(params, function (err) {
      if (err) {
        return reject(err)
      }
      resolve()
      console.log(chalk.green.bold('Invalidation created successfully!'))
      console.log('')
    })
  })
}

console.log(chalk.green.bold('Start deploying to S3'))
deploy(options).then(
  result => {
    console.log(result)
  },
  error => {
    console.log(error)
  }
)
