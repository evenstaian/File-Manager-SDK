const { s3StorageProvider } = require("../../shared/Providers/StorageProvider");
const { Files } = require("./files");

const files = new Files(s3StorageProvider, null);

module.exports = {
    files
}