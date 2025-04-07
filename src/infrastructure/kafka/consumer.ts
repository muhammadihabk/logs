const { Kafka } = require('kafkajs');

export class Consumer {
  kafka;
  consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'log-service',
      brokers: ['kafka:9092'],
    });
    this.consumer = this.kafka.consumer({ groupId: 'log-group' });
  }

  async connect() {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: 'user-activity-logs', fromBeginning: true });
      console.log('Kafka Consumer is connected and ready.');

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }: any) => {
          console.log('Message received:', {
            topic,
            partition,
            value: message.value.toString(),
          });
        },
      });
    } catch (error) {
      console.error('Error connecting Kafka Consumer:', error);
    }
  }
}
