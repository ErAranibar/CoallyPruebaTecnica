import { Router } from 'express';
import * as authController from '../controllers/authController';

const authRoute: Router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: 
 *      - Auth
 *     summary: Iniciar sesión con credenciales
 *     description: Permite a un usuario iniciar sesión usando su correo electrónico y contraseña, y recibir un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: testuser@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Inicio de sesión exitoso'
 *                 token:
 *                   type: string
 *                   example: 'Bearer <token>'
 *       401:
 *         description: Contraseña o usuario incorrecto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Contraseña incorrecta'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Usuario incorrecto'
 */
authRoute.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: 
 *      - Auth
 *     summary: Registrar un nuevo usuario
 *     description: Permite a un usuario crear una cuenta proporcionando su correo electrónico y una contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: testuser@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Usuario creado exitosamente'
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: 'testuser@example.com'
 *       400:
 *         description: El usuario ya existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'El usuario ya existe'
 */
authRoute.post('/register', authController.register);

export default authRoute;
