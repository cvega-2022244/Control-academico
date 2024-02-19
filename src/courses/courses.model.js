import { Schema, model } from 'mongoose';

const courseSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estudiantes: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    profesor: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false // Deshabilitar el __v (versión del documento)
});

export default model('course', courseSchema);
