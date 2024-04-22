const { s3StorageProvider, pinataStorageProvider } = require("../../shared/Providers/StorageProvider");
const { Files } = require("./files");

const files = new Files(s3StorageProvider, pinataStorageProvider);

module.exports = {
    files
}