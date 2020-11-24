import { Router } from "express";
import messageRoutes from "./messages/messageRoutes";
import authRoutes from "./auth/authRoutes";

const router = Router();

router.get("/", (req, res) => {
  res.json({ msg: "hello" });
});

router.use("/auth", authRoutes);

router.use("/messages", messageRoutes);

export default router;
