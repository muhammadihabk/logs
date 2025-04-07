import { Consumer } from './infrastructure/kafka/consumer';
import { Producer } from './infrastructure/kafka/producer';

async function bootstrap() {
  const producer = new Producer();
  await producer.connect();
  const consumer = new Consumer();
  await consumer.connect();

  await producer.sendMessage('user-activity-logs', 'User logged in');
  await producer.sendMessage('user-activity-logs', 'User updated profile');
  await producer.sendMessage('user-activity-logs', 'User logged out');
}

bootstrap();
