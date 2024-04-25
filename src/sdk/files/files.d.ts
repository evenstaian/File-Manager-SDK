export class Files {
    constructor(S3StorageProvider: any, IPFStorageProvider: any);
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
    config(params: { AWSConfigs?: { AccessKey: string, AccessSecret: string }, PinataConfigs?: { AccessKey: string, AccessSecret: string } }): Promise<void>;

    /**
     * Save File to Storage
     * 
     * @description Saves a file to the specified storage type (AWS S3 or Pinata IPFS).
     * 
     * @param {string} storageType - The type of storage provider to save the file to (e.g., 'S3', 'IPFS').
     * @param {object} file - The file object to be saved.
     * @param {string} [bucket] - The bucket name for AWS S3 storage (optional, required if storageType is 'S3').
     * @param {object} [metadata] - Metadata associated with the file (optional, required if storageType is 'IPFS').
     * 
     * @returns {Promise<{ data: any } | { error: string }>} - A promise that resolves to an object containing the saved file data or an error message.
     */
    save(storageType: string, file: object, bucket?: string, metadata?: object): Promise<{
        error: string;
        data?: undefined;
    } | {
        data: any;
        error?: undefined;
    }>;
    #private;
}
