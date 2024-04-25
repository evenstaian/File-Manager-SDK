export class S3StorageProvider {
    get(params: any): Promise<import("aws-sdk/lib/request").PromiseResult<AWS.S3.HeadObjectOutput, AWS.AWSError>>;
    upload(params: any): Promise<boolean | {
        imageUrl: string;
    }>;
}
import AWS = require("aws-sdk");
