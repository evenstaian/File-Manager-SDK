export class Files {
    constructor(S3StorageProvider: any, IPFStorageProvider: any);
    config(bucket?: any): Promise<void>;
    save(storageType: any, file: any, bucket?: any, metadata?: any): Promise<{
        error: string;
        data?: undefined;
    } | {
        data: any;
        error?: undefined;
    }>;
    #private;
}
