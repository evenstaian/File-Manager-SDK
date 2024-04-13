const { S3StorageProvider } = require('./Implementations/S3StorageProvider/S3');

const s3StorageProvider = new S3StorageProvider();

module.exports = { s3StorageProvider };
