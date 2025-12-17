import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI no está definida en las variables de entorno");
    }

    await mongoose.connect(mongoUri);

    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error al conectarse a la base de datos:", error);
    process.exit(1);
  }
};

export default connectDB;
