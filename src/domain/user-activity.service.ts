import { UserActivityRepository } from './user-activity.repository';

export class UserActivityService {
  userActivityRepository;

  constructor(userActivityRepository: UserActivityRepository) {
    this.userActivityRepository = userActivityRepository;
  }

  async save(activity: string) {
    try {
      const parsedActivity = JSON.parse(activity);
      const userActivity = {
        userId: parsedActivity.userId,
        activity: parsedActivity.activity,
        timestamp: parsedActivity.timestamp,
      };

      await this.userActivityRepository.save(userActivity);
      console.log('User activity saved:', userActivity);
    } catch (error) {
      console.error('Error saving user activity:', error);
    }
  }

  async findAll(filter: any, skip: number, limit: number) {
    try {
      const userActivities = await this.userActivityRepository.findAll(filter, skip, limit);
      return userActivities;
    } catch (error) {
      console.error('Error fetching user activities:', error);
      throw error;
    }
  }
}
