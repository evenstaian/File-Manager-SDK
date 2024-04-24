require('dotenv/config');

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

class S3StorageProvider {
  async get(params) {
    const { bucket, fileName } = params;
    const response = await s3.headObject(
      {
        Bucket: bucket,
        Key: fileName,
      }
    ).promise();
    return response;
  };

  async upload(params) {
    const { fileName, fileContent, mimetype, bucket } = params;

    const s3Params = {
      Bucket: bucket,
      Key: fileName,
      Body: fileContent,
      ContentType: mimetype,
      acl: 'public-read',
      contentDisposition: 'attachment',
      ServerSideEncryption: 'AES256',
    };

    const response = await s3.upload(s3Params).promise()
      .then(data => {
        return { imageUrl: data.Location };
      })
      .catch(e => {
        console.log(e);
        return false;
      });

    return response;
  }
}

module.exports = {
  S3StorageProvider
};
