# File Manager SDK

A lightweight SDK for managing file uploads across multiple cloud storage providers, with built-in support for AWS S3 and IPFS (via Pinata).

## Features

- Multi-provider support (AWS S3 and IPFS/Pinata)
- TypeScript definitions included
- Simple unified interface
- Comprehensive error handling

## Quick Start

### Installation

```bash
npm install file-manager-sdk
# or
yarn add file-manager-sdk
```

### Basic Usage

1. **Initialize**
```javascript
const { FileManagerServiceSdk } = require('file-manager-sdk');
const fileManager = new FileManagerServiceSdk();
```

2. **Configure**
```javascript
await fileManager.files.config({
    AWSConfigs: {
        AccessKey: 'YOUR_AWS_KEY',
        AccessSecret: 'YOUR_AWS_SECRET'
    },
    PinataConfigs: {
        AccessKey: 'YOUR_PINATA_KEY',
        AccessSecret: 'YOUR_PINATA_SECRET'
    }
});
```

3. **Upload Files**

AWS S3:
```javascript
const result = await fileManager.files.save('S3', {
    originalname: 'example.jpg',
    buffer: fileBuffer
}, 'my-bucket');
```

IPFS:
```javascript
const result = await fileManager.files.save('IPFS', {
    originalname: 'example.jpg',
    buffer: fileBuffer
}, null, {
    name: 'My File',
    description: 'File description'
});
```

## API Reference

### files.config(params)
Configure storage providers credentials.

```typescript
interface ConfigParams {
    AWSConfigs?: {
        AccessKey: string;
        AccessSecret: string;
    };
    PinataConfigs?: {
        AccessKey: string;
        AccessSecret: string;
    };
}
```

### files.save(storageType, file, bucket?, metadata?)
Upload a file to the specified storage provider.

```typescript
interface FileData {
    originalname: string;
    buffer: Buffer;
}

type Response = Promise<{
    data?: any;
    error?: string;
}>;
```

Parameters:
- `storageType`: 'S3' | 'IPFS'
- `file`: FileData
- `bucket`: string (required for S3)
- `metadata`: object (required for IPFS)

## Error Handling

The SDK returns structured responses:
```typescript
{
    data?: any;    // Success data
    error?: string // Error message if failed
}
```

## Contributing

We're open to contributions! If you'd like to improve this SDK, here are some ways you can contribute:

- **New Storage Providers**: Help us expand support for more cloud storage solutions
- **Bug Fixes**: Found a bug? Open an issue or submit a fix
- **Documentation**: Help improve or translate the documentation
- **Features**: Suggest or implement new features
- **Examples**: Add more example use cases

Please feel free to submit pull requests or create issues for any improvements you'd like to see.

### Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Make your changes
5. Run tests: `npm test`
6. Submit a pull request

We appreciate any contributions, whether it's code, documentation, or bug reports!

## Author

**Evens Taian**

## License

MIT License