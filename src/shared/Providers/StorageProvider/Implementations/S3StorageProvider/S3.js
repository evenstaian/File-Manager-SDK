require('dotenv/config');

const AWS = require('aws-sdk');
const mime = require('mime');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

class S3StorageProvider {
  async get(params) {
    const {bucket, fileName} = params;
    const response = await s3.headObject(
      {
        Bucket: bucket,
        Key: fileName,
      }
    ).promise();
    return response;
  };
  
  async upload(params) {
    const { fileName, fileContent, bucket } = params;
    const ContentType = mime.getType(null);
  
    const s3Params = {
      bucket,
      Key: fileName,
      Body: fileContent,
      ContentType,
      acl: 'public-read',
      contentDisposition: 'attachment',
      ServerSideEncryption: 'AES256',
    };
  
    const response = await s3.upload(s3Params).promise();
    return response;
  }
}

module.exports = {
  S3StorageProvider
};