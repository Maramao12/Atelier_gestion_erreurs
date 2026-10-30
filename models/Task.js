import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  duration: { type: Number, required: true },
});
export default mongoose.model("Task", taskSchema);