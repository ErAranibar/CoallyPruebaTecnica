import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await userRepository.getUserByEmail(email);

        if (!user) {
            res.status(401).json({ message: 'Usuario incorrecto' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password.toString());
        if (!isMatch) {
            res.status(401).json({ message: 'Contraseña incorrecta' });
            return;
        }

        const payload = {
            userId: user._id,
            email: user.email,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token: `Bearer ${token}`,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const userExists = await userRepository.getUserByEmail(email);

        if (userExists) {
            res.status(400).json({ message: 'El usuario ya existe' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userRepository.createUser({ email, password: hashedPassword.toString() });

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
