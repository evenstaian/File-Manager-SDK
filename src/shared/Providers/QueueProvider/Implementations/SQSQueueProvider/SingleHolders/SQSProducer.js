const AWS = require('aws-sdk');

class SQSProducer {
    constructor(QueueUrl) {
        this.queueUrl = QueueUrl;
        this.sqs = this.setupSQS();
    }

    setupSQS(){
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET,
            region: 'us-east-1',
        });

        return new AWS.SQS({ apiVersion: '2012-11-05' });
    }

    async sendMessage(
        params
    ) {
        this.sqs = this.setupSQS();

        const sqsParams = {
            MessageBody: JSON.stringify(params),
            QueueUrl: this.queueUrl,
            DelaySeconds: 0,
            MessageDeduplicationId: new Date().toISOString(),
            MessageGroupId: new Date().toISOString(),
        };

        const sqsPromise = new Promise((resolve) => {
            this.sqs.sendMessage(sqsParams, (err, data) => {
                if (err) {
                    console.log('Error', err);
                    resolve(false);
                } else {
                    console.log('On Queue', data.MessageId);
                    resolve(data.MessageId);
                }
            });
        });

        const response = await sqsPromise;

        return response;
    }
}

module.exports = {
    SQSProducer,
};
