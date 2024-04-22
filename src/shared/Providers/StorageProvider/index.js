const { S3StorageProvider } = require('./Implementations/S3StorageProvider/S3');
const { PinataStorageProvider } = require('./Implementations/PinataStorageProvider/Pinata');

const s3StorageProvider = new S3StorageProvider();
const pinataStorageProvider = new PinataStorageProvider();

module.exports = { 
    s3StorageProvider,
    pinataStorageProvider
};
