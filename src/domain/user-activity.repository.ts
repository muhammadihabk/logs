const mongoose = require('mongoose');

export class UserActivityRepository {
  userActivitySchema;
  userActivityModel;

  constructor() {
    this.userActivitySchema = new mongoose.Schema({
      userId: { type: String, required: true },
      activity: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    });

    this.userActivitySchema.index({ userId: 1, timestamp: -1 });
    this.userActivityModel = mongoose.model('user_activity', this.userActivitySchema);
  }

  async save(activity: any) {
    try {
      this.userActivityModel.create(activity);
      console.log('User activity saved:', activity);
    } catch (error) {
      console.error('Error saving user activity:', error);
    }
  }

  async findAll(filter: any, skip: number, limit: number) {
    try {
      return await this.userActivityModel.find(filter).sort({ timestamp: -1 }).skip(skip).limit(limit);
    } catch (error) {
      console.error('Error fetching user activities:', error);
      throw error;
    }
  }
}
