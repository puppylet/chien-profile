const uuid = require('uuid')
const AWS = require('aws-sdk')
const s3Config = require('../../../config/s3')
const sharp = require('sharp')

const s3 = new AWS.S3(options = s3Config)

const upload = (image, name, size) => {
  const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  const type = image.split(';')[0].split('/')[1]

  return sharp(base64Data)
  .resize(size.width, size.height)
  .max()
  .toBuffer()
  .then(function(outputBuffer) {
    const params = {
      Bucket: s3Config.bucket,
      Key: `staging/avatars/${name}.${type}`,
      UploadId: uuid.v1(),
      Body: outputBuffer,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    }
    return s3.upload(params, (err, data) => ({ err, data }))
  })
}

module.exports = { upload }
