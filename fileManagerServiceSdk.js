const { files } = require('./src/sdk/files');

class FileManagerServiceSdk {

    constructor() {
        this.#startModules();
    }

    #startModules(){
        this.files = files;
    }
}

module.exports = {
    FileManagerServiceSdk
}