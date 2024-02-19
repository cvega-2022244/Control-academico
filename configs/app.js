import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './user/user.routes.js';
import courseRoutes from './course/course.routes.js';

config();

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
});

// Configuraciones de Express
const app = express();
const port = process.env.PORT || 3056;

// Rutas
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor HTTP en ejecución en el puerto ${port}`);
});
