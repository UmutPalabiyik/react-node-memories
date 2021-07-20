import express from "express";
import mongoose from "mongoose";
import Memory from "../models/memoryModel.js";

const router = express.Router();

// Get all memories from db
router.get("/", async (req, res) => {
  const memories = await Memory.find();
  res.status(200).json(memories);
});

// Get single memory from db
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({ message: "Memory id is not valid" });

    const memory = await Memory.findById(id);
    res.status(200).json(memory);
  } catch (err) {
    res.status(404).json({ message: "Memory not found" });
  }
});

// Create a memory
router.post("/", async (req, res) => {
  try {
    const memory = req.body;
    const createdMemory = await Memory.create(memory);
    res.status(201).json(createdMemory);
  } catch (error) {
    res.json({ message: "Create memory failed" });
  }
});

// Update a memory
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({ message: "Memory id is not valid" });

    const { title, content, creator, image } = req.body;
    const updatedMemory = await Memory.findByIdAndUpdate(
      id,
      { title, content, creator, image, _id: id },
      { new: true }
    );

    res.status(200).json(updatedMemory);
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
});

//Delete a memory
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({ message: "Memory id is not valid" });
    const deletedMemory = await Memory.findByIdAndDelete(id);
    res.status(200).json(deletedMemory);
  } catch (error) {
    res.json({ message: error });
  }
});

export default router;
