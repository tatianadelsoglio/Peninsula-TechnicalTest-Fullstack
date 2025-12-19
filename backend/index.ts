import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/Connection";
import accountRoutes from "./routes/AccountRouter";
import { initializeTestAccount } from "./services/AccountService";

dotenv.config(); //cargo variables de entorno

const app = express();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();
    await initializeTestAccount();

    // Ruta de prueba
    app.get("/", (_, res) => {
      res.send("API corriendo");
    });

    app.use(accountRoutes);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto: ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
};

startServer();
