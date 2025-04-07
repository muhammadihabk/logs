const { Kafka } = require('kafkajs');

export class Producer {
  kafka;
  producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'log-service',
      brokers: ['kafka:9092'],
    });
    this.producer = this.kafka.producer();
  }

  async connect() {
    try {
      await this.producer.connect();
      console.log('Kafka Producer is connected and ready.');
    } catch (error) {
      console.error('Error connecting Kafka Producer:', error);
    }
  }

  async sendMessage(topic: string, message: string) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      console.log('Message sent:', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
