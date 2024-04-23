const pinataSDK = require('@pinata/sdk');

class PinataStorageProvider {
    pinata

    constructor() {
        const apiKey = '11fd5d4ab44ab8b226af'
        const apiSecret = '87262a94116fc7b24b838605037cb46363ce2cd1e6de91a9c647733ef786dcb5'
        this.pinata = new pinataSDK({ pinataApiKey: apiKey, pinataSecretApiKey: apiSecret });
    }

    /**
     * return
     * string : imageUrl 
     */
    async get(params) {
        const { imageHash } = params
        return `https://gateway.pinata.cloud/ipfs/${imageHash}`
    }

    /**
     * return
     * string : nftURI
     */
    async upload(params) {
        const { fileName, readableStream, metadata } = params;
        const options = {
            pinataMetadata: {
                name: fileName,
            }
        };

        try {
            const filePinned = await this.pinata.pinFileToIPFS(readableStream, options);
            metadata.imageUrl = `ipfs://${filePinned.IpfsHash}`
            const jsonPinned = await this.pinata.pinJSONToIPFS(metadata, options)
            return `https://gateway.pinata.cloud/ipfs/${jsonPinned.IpfsHash}`;

        } catch (error) {
            console.log(error)
            return false
        }

    }
}

module.exports = {
    PinataStorageProvider
}