import { Schema, model } from 'mongoose';

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['TEACHER_ROLE', 'STUDENT_ROLE'],
        required: true
    },
    courses: [{ type: Schema.Types.ObjectId, ref: 'course' }]
});

export default model('user', userSchema);
