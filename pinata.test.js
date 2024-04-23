const fs = require('fs');
const { PinataStorageProvider } = require("./src/shared/Providers/StorageProvider/Implementations/PinataStorageProvider/Pinata")


const pinataStorage = new PinataStorageProvider()

async function upload() {
    const readableStream = fs.createReadStream('./tokenImage2.jpeg');
    const fileName = 'teste2'
    const metadata = { name: 'teste de nft', background: 'azul' }
    const response = await pinataStorage.upload({ readableStream: readableStream, fileName: fileName, metadata: metadata })
    console.log(response)
    return response
}

upload()