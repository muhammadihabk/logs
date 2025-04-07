import express from 'express';
import { userActivityService } from '..';

const app = express();

app.get('/user-activities', async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.query;
    const filter = userId ? { userId } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const userActivities = await userActivityService.findAll(filter, skip, Number(limit));

    res.status(200).json({ data: userActivities });
  } catch (error) {
    console.error('Error fetching user activities:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default app;
