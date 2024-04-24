class Files {
    #fileService;
    #bucketName;

    #s3StorageProvider;
    #ipfsStorageProvider;

    constructor(S3StorageProvider, IPFStorageProvider) {
        this.#s3StorageProvider = S3StorageProvider;
        this.#ipfsStorageProvider = IPFStorageProvider;
    }

    async config(bucket = null) {
        this.#bucketName = bucket;
    }
    async save(storageType, file, bucket = null, metadata = null) {
        const currentBucket = bucket || this.#bucketName;
        //let imageUrl;
        let hasUploaded;

        const { originalname, buffer } = file;
        if (!originalname || !buffer) {
            return {
                error: `file.originalname and file.buffer is required`
            };
        }

        switch (storageType) {
            case 'S3':
                this.#fileService = this.#s3StorageProvider;

                const uploadedS3 = await this.#fileService.upload({ fileName: originalname, fileContent: buffer, bucket: currentBucket });
                if (!uploadedS3) {
                    return {
                        error: `A error ocurrs when try upload to S3`
                    };
                } else {
                    hasUploaded = uploadedS3
                }
                break;

            case 'IPFS':
                this.#fileService = this.#ipfsStorageProvider;
                if (!metadata) {
                    return {
                        error: `.metadata is required`
                    };
                }

                const uploadedIPFS = await this.#fileService.upload({ fileName: originalname, fileContent: buffer, metadata: metadata });
                if (!uploadedIPFS) {
                    return {
                        error: `A error ocurrs when try upload to IPFS`
                    };
                } else {
                    hasUploaded = uploadedIPFS
                }
                break;

            default:
                return {
                    error: `invalid storageType`
                };
        }

        return {
            data: hasUploaded
        };;
    }
}

module.exports = {
    Files
}