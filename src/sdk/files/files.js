class Files {
    #fileService;

    #s3StorageProvider;
    #ipfsStorageProvider;

    constructor(S3StorageProvider, IPFStorageProvider) {
        this.#s3StorageProvider = S3StorageProvider;
        this.#ipfsStorageProvider = IPFStorageProvider;
    }

    /**
     * Configure Storage Providers - Step Required
     * 
     * @description Configures the storage providers for the application, including AWS S3 and Pinata IPFS.
     * 
     * @param {Object} params - Required parameters.
     * @param {Object} params.AWSConfigs - Configuration parameters for AWS S3 storage.
     * @param {string} params.AWSConfigs.AccessKey - The access key for AWS S3.
     * @param {string} params.AWSConfigs.AccessSecret - The access secret for AWS S3.
     * @param {Object} params.PinataConfigs - Configuration parameters for Pinata IPFS storage.
     * @param {string} params.PinataConfigs.AccessKey - The access key for Pinata IPFS.
     * @param {string} params.PinataConfigs.AccessSecret - The access secret for Pinata IPFS.
     * 
     * @returns {void}
     */
    async config(params) {
        this.#s3StorageProvider.config(params.AWSConfigs);
        this.#ipfsStorageProvider.config(params.PinataConfigs);
    }

    /**
     * Save File to Storage
     * 
     * @description Saves a file to the specified storage type (AWS S3 or Pinata IPFS).
     * 
     * @param {string} storageType - The type of storage provider to save the file to (e.g., 'S3', 'IPFS').
     * @param {Buffer} file - The file content to be saved.
     * @param {string} [bucket] - The bucket name for AWS S3 storage (optional, required if storageType is 'S3').
     * @param {object} [metadata] - Metadata associated with the file (optional, required if storageType is 'IPFS').
     * 
     * @returns {Promise<{ data: any } | { error: string }>} - A promise that resolves to an object containing the saved file data or an error message.
     */
    async save(storageType, file, bucket = null, metadata = null) {
        const currentBucket = bucket;
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