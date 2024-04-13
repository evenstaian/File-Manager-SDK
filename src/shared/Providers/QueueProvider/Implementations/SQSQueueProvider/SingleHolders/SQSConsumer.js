const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');

class SQSConsumer {
    constructor(QueueUrl, Service) {
        this.service = Service;
        this.queueUrl = QueueUrl;
        this.createConsumer();
    }

    setupSQS() {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET,
            region: 'us-east-1',
        });

        return new AWS.SQS({ apiVersion: '2012-11-05' });
    }

    createConsumer() {
        const sqs = this.setupSQS();
        const queueUrl = this.queueUrl;

        this.app = Consumer.create({
            queueUrl,
            handleMessage: async message => {
                this.workerConsumer(message);
            },
            sqs,
        });

        this.app.on('error', err => {
            console.error(err.message);
        });

        this.app.on('processing_error', err => {
            console.error(err.message);
        });

        this.app.start();
    }

    workerConsumer(message) {
        const params = JSON.parse(message.Body);
        this.service.execute(params, response => { console.log(response) });
    }
}

module.exports = {
    SQSConsumer,
};
