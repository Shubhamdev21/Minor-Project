import { Router, Request, Response } from "express";
import Subscriber from "../models/Subscriber";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { chatId, name } = req.body;
    const existing = await Subscriber.findOne({ chatId });
    if (existing) {
      res.status(400).json({ error: "Already subscribed!" });
      return;
    }
    const subscriber = await Subscriber.create({ chatId, name });
    res.status(201).json({ message: "Subscribed successfully!", subscriber });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:chatId", async (req: Request, res: Response) => {
  try {
    const chatId = String(req.params["chatId"]);
    await Subscriber.findOneAndDelete({ chatId });
    res.json({ message: "Unsubscribed successfully!" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
