export class S3StorageProvider {
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
    get(params: { bucket: string, fileName: string }): Promise<string>;

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
    upload(params: { 
        fileName: string, 
        fileContent: Buffer, 
        mimetype?: string, 
        bucket: string 
    }): Promise<false | {
        imageUrl: string;
    }>;
}
