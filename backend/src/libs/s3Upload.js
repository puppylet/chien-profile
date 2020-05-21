const uuid = require('uuid')
const AWS = require('aws-sdk')
const s3Config = require('../../../config/s3')
s3Config.bucket = s3Config.fileBucket
const s3 = new AWS.S3(options = s3Config)

const uploadImage = ({image, Key}, callback) => {
  const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  const type = image.split(';')[0].split('/')[1]
  const params = {
    Bucket: s3Config.fileBucket,
    Key: `${Key}.${type}`,
    UploadId: uuid.v1(),
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`
  }
  return s3.upload(params, callback)
}

module.exports = { uploadImage }
