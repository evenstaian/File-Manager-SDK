const pinataSDK = require('@pinata/sdk');
const { Readable } = require('stream');
require('dotenv/config');


class PinataStorageProvider {
    #pinata;

    constructor() {}

    config({AccessKey, AccessSecret}){
        const apiKey = AccessKey
        const apiSecret = AccessSecret
        this.#pinata = new pinataSDK({ pinataApiKey: apiKey, pinataSecretApiKey: apiSecret });
    }

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
    async get(params) {
        const { ipfsHash } = params
        return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    }

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
     * @returns {Promise<{metadataUrl: string, imageUrl: string}>} - A promise that resolves to an object containing the URLs of the uploaded file and its metadata.
     */
    async upload(params) {
        const { fileName, fileContent, metadata } = params;
        const readableStream = Readable.from(fileContent);

        const options = {
            pinataMetadata: {
                name: fileName,
            }
        };

        try {
            const filePinned = await this.#pinata.pinFileToIPFS(readableStream, options);
            metadata.imageUrl = `ipfs://${filePinned.IpfsHash}`
            const jsonPinned = await this.#pinata.pinJSONToIPFS(metadata, options)
            return { metadataUrl: `https://gateway.pinata.cloud/ipfs/${jsonPinned.IpfsHash}`, imageUrl: `https://gateway.pinata.cloud/ipfs/${filePinned.IpfsHash}` };

        } catch (error) {
            console.log(error)
            return false
        }

    }
}

module.exports = {
    PinataStorageProvider
}