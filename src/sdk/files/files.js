class Files {
    #fileService;
    #bucketName;

    #s3StorageProvider;
    #ipfsStorageProvider;

    constructor(S3StorageProvider, IPFStorageProvider){
        this.#s3StorageProvider= S3StorageProvider;
        this.#ipfsStorageProvider = IPFStorageProvider;
    }

    async config(bucket = null){
        this.#bucketName = bucket;
    }

    async save(storageType, file, bucket){
        const currentBucket = bucket || this.#bucketName;
        let imageUrl;

        switch (storageType) {
            case 'S3':
                this.#fileService = this.#s3StorageProvider;
                break;

            case 'IPFS':
                this.#fileService = this.#ipfsStorageProvider;
                break;
        
            default:
                return {
                    error: `invalid storageType`
                };
        }

        const { fileName, fileContent } = file;
        if(!fileName || !fileContent){
            return {
                error: `file.fileName and file.fileContent is required`
            };
        }

        const uploaded = await this.#fileService.upload({fileName, fileContent, bucket: currentBucket});
        if(!uploaded){
            return {
                error: `A error ocurrs when try upload to S3`
            };
        }

        return {
            data: uploaded
        };;
    }
}

module.exports = {
    Files
}