import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

await connectDB(process.env.MONGO_URI);
app.listen(5000, () => {
  console.log("Serveur sur le port 5000");
});
