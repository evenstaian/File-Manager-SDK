const fs = require('fs');
const { PinataStorageProvider } = require("./src/shared/Providers/StorageProvider/Implementations/PinataStorageProvider/Pinata")


const pinataStorage = new PinataStorageProvider()

async function upload() {
    const fileContent = fs.readFileSync('./tokenImage2.jpeg');
    console.log(fileContent)
    const fileName = 'teste2'
    const metadata = { name: 'teste de nft', background: 'azul' }
    const response = await pinataStorage.upload({ fileContent, fileName: fileName, metadata: metadata })
    console.log(response)
    return response
}

upload()