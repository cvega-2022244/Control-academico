import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | No se pudo conectar a MongoDB');
            mongoose.disconnect();
        });

        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | Intentando conectar');
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB | Conectado a MongoDB');
        });

        mongoose.connection.once('open', () => {
            console.log('MongoDB | Conexión exitosa a la base de datos');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | Reconectado a MongoDB');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | Desconectado');
        });

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        });
    } catch (err) {
        console.error('La conexión a la base de datos falló', err);
    }
};
