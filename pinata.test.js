const fs = require('fs');
const { PinataStorageProvider } = require("./src/shared/Providers/StorageProvider/Implementations/PinataStorageProvider/Pinata")


const pinataStorage = new PinataStorageProvider()

async function upload() {
    const fileContent = fs.readFileSync('./tokenImage01.jpeg');
    console.log(fileContent)
    const fileName = 'teste de hoje'
    const metadata = { name: 'colleçao do ouro', traits: { background: 'sas', eye: 'vermelho', mustache: 'preto' } }
    const response = await pinataStorage.upload({ fileContent, fileName: fileName, metadata: metadata })
    console.log(response)
    return response
}

upload()