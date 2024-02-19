import express from 'express';
import {
    registerUser, loginUser, getAllUsers, getUserById, updateUserById, deleteUserById
} from './users.controller.js';

const router = express.Router();

// Rutas para el CRUD de usuarios
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
