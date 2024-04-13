
const { SQSConsumer } = require('./Implementations/SQSQueueProvider/SingleHolders/SQSConsumer');
const { SQSProducer } = require('./Implementations/SQSQueueProvider/SingleHolders/SQSProducer');

const getSQSProducer = (queueUrl) => new SQSProducer(queueUrl);
const getSQSConsumer = (queueUrl, service) => new SQSConsumer(queueUrl, service);

module.exports = { getSQSProducer, getSQSConsumer };
