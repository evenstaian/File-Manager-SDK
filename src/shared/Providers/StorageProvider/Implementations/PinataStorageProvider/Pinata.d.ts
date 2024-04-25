export class PinataStorageProvider {
    pinata: any;
    /**
     * 
     * Get File Url
     * 
     * @description Get file Url of an ipfsHash
     * 
     * Parameters (required)
     * @param {Object} params - Required parameters.
     * @param {string} params.ipfsHash - The IPFS hash of the file.
     *  
     * @returns {Promise<string>} - A promise that resolves to the file URL.
     */
    get(params: { ipfsHash: string } ): Promise<string>;

    /**
     * 
     * Updaload File
     * 
     * @description Upload file with metadata to Pinata
     * 
     * Parameters (required)
     * @param {Object} params - Required parameters.
     * @param {string} params.fileName - The name of the file
     * @param {Buffer} params.fileContent - The buffer content of the file
     * @param {object} params.metadata - The metadata json required to link image
     *  
     * @returns {Promise<boolean | {metadataUrl: string, imageUrl: string}>} - A promise that resolves to an object containing the URLs of the uploaded file and its metadata.
     */
    upload(params: { 
        fileName: string, 
        fileContent: Buffer, 
        metadata: object 
    }): Promise<false | {
        metadataUrl: string;
        imageUrl: string;
    }>;
}
