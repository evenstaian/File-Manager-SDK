require('dotenv/config');

const AWS = require('aws-sdk');

class S3StorageProvider {

  #s3

  constructor(){}

  config(AccessKey, AccessSecret){
    this.#s3 = new AWS.S3({
      accessKeyId: AccessKey,
      secretAccessKey: AccessSecret,
    });
  }

  /**
   * 
   * Get File Url
   * 
   * @description Get file Url of file on a bucket
   * 
   * Parameters (required)
   * @param {Object} params - Required parameters.
   * @param {string} params.bucket - The s3 bucket path where file is localized.
   * @param {string} params.fileName - The name of the file.
   *  
   * @returns {Promise<string>} - A promise that resolves to the file URL.
   */
  async get(params) {
    const { bucket, fileName } = params;
    const response = await this.#s3.headObject(
      {
        Bucket: bucket,
        Key: fileName,
      }
    ).promise()
    .then(data => {
      return data.Location;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
    return response;
  };

  /**
   * 
   * Updaload File
   * 
   * @description Upload file to S3
   * 
   * Parameters (required)
   * @param {Object} params - Required parameters.
   * @param {string} params.fileName - The name of the file
   * @param {Buffer} params.fileContent - The buffer content of the file
   * @param {string} params.mimetype - The mimetype of the file
   * @param {string} params.bucket - The path on s3 where the file have to be saved
   *  
   * @returns {Promise<boolean | { imageUrl: string }>} - A promise that resolves to an object containing the URLs of the uploaded file and its metadata.
   */
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

    const response = await this.#s3.upload(s3Params).promise()
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
