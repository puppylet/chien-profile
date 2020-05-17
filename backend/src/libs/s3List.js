const AWS = require('aws-sdk')
const s3Config = require('../../../config/s3')
const s3 = new AWS.S3(options = s3Config)
const trimStart = (s, ch) => (s[0] === ch ? trimStart(s.substr(1), ch) : s);
const trimEnd = (s, ch) => s[s.length - 1] === ch ? trimEnd(s.substr(0, s.length - 1), ch) : s;

module.exports = function S3LS() {

  const bucket = s3Config.bucket

  return {
    ls(path) {
      const prefix = trimStart(trimEnd(path, "/") + "/", "/");
      const result = { files: [], folders: [] };

      function s3ListCheckTruncated(data) {
        result.data = data
        result.files = result.files.concat((data.Contents || []).map(f => {
          f.Name = f.Key.replace(path, '')
          f.Extension = f.Name.split('.').pop()
          return f
        }));
        result.folders = result.folders.concat((data.CommonPrefixes || []).map(i => i.Prefix.replace(path, '').replace('/', '')));

        if (data.IsTruncated) {
          return s3.listObjectsV2({
            Bucket: bucket,
            MaxKeys: 2147483647, // Maximum allowed by S3 API
            Delimiter: "/",
            Prefix: prefix,
            ContinuationToken: data.NextContinuationToken
          })
          .promise()
          .then(s3ListCheckTruncated);
        }

        return result;
      }

      return s3.listObjectsV2({
        Bucket: bucket,
        MaxKeys: 2147483647, // Maximum allowed by S3 API
        Delimiter: "/",
        Prefix: prefix,
        StartAfter: prefix // removes the folder name from listing
      })
      .promise()
      .then(s3ListCheckTruncated);
    }
  };
};
