const fs = require('fs');
const { PinataStorageProvider } = require("./src/shared/Providers/StorageProvider/Implementations/PinataStorageProvider/Pinata")


const pinataStorage = new PinataStorageProvider()
pinataStorage.get('test')

async function upload() {
    const readableStream = fs.createReadStream('./tokenImage2.jpeg');
    const fileName = 'teste2'
    const metadata = { name: 'teste de nft', background: 'azul' }
    const ipfsHash = await pinataStorage.upload({ readableStream: readableStream, fileName: fileName, metadata: metadata })
    console.log(ipfsHash)
    return ipfsHash
}

upload()