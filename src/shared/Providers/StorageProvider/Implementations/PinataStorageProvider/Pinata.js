const pinataSDK = require('@pinata/sdk');
const { Readable } = require('stream');
require('dotenv/config');


class PinataStorageProvider {
    pinata;

    constructor() {
        const apiKey = process.env.PINATA_ACCESS_KEY
        const apiSecret = process.env.PINATA_SECRET
        this.pinata = new pinataSDK({ pinataApiKey: apiKey, pinataSecretApiKey: apiSecret });
    }

    /**
     * return
     * string : imageUrl 
     */
    async get(params) {
        const { ipfsHash } = params
        return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    }

    /**
     * return
     * string : URI
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
            const filePinned = await this.pinata.pinFileToIPFS(readableStream, options);
            metadata.imageUrl = `ipfs://${filePinned.IpfsHash}`
            const jsonPinned = await this.pinata.pinJSONToIPFS(metadata, options)
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