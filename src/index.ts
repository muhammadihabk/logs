import app from './api/server';
import { UserActivityRepository } from './domain/user-activity.repository';
import { UserActivityService } from './domain/user-activity.service';
import { Consumer } from './infrastructure/kafka/consumer';
import { Producer } from './infrastructure/kafka/producer';
import 'dotenv/config'

const userActivityRepository = new UserActivityRepository();
export const userActivityService = new UserActivityService(userActivityRepository);

async function bootstrap() {
  require('./infrastructure/mongo/setup');
  const producer = new Producer();
  await producer.connect();
  const consumer = new Consumer(userActivityService);
  await consumer.connect();

  await producer.sendMessage(
    'user-activity-logs',
    JSON.stringify({
      userId: 1,
      activity: 'User logged in',
      timestamp: new Date(),
    })
  );
  await producer.sendMessage(
    'user-activity-logs',
    JSON.stringify({
      userId: 1,
      activity: 'User updated profile',
      timestamp: new Date(),
    })
  );
  await producer.sendMessage(
    'user-activity-logs',
    JSON.stringify({
      userId: 1,
      activity: 'User logged out',
      timestamp: new Date(),
    })
  );

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

bootstrap();
