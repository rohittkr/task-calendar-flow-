import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGO_URI);
}

const EventSchema = new mongoose.Schema({
  title: String,
  category: String,
  date: String,
  startTime: String,
  endTime: String
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const events = await Event.find();
      return res.status(200).json(events);
    }

    if (req.method === 'POST') {
      const newEvent = await Event.create(req.body);
      return res.status(201).json(newEvent);
    }

    if (req.method === 'PUT') {
      const updatedEvent = await Event.findByIdAndUpdate(req.body.id, req.body, { new: true });
      return res.status(200).json(updatedEvent);
    }

    if (req.method === 'DELETE') {
      await Event.findByIdAndDelete(req.body.id);
      return res.status(200).json({ message: 'Deleted' });
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}
