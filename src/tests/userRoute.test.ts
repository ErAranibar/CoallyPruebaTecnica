import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../server';
import { User } from '../models/user.model';

beforeEach(async () => {
  await User.deleteMany({});
});

describe('User API', () => {
  const testUser = {
    email: 'testuser@example.com',
    password: 'password123',
  };

  it('Debe crear un nuevo usuario', async () => {
    const response = await request(app).post('/api/auth/register').send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuario creado exitosamente');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('email', testUser.email);

    const savedUser = await User.findOne({ email: testUser.email });
    expect(savedUser).not.toBeNull();
    expect(savedUser!.password).not.toBe(testUser.password);
  });

  it('Debe devolver un error si el usuario ya existe', async () => {
    await request(app).post('/api/auth/register').send(testUser);
    const response = await request(app).post('/api/auth/register').send(testUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'El usuario ya existe');
  });

  it('Debe iniciar sesión con credenciales correctas', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const response = await request(app).post('/api/auth/login').send(testUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Inicio de sesión exitoso');
    expect(response.body).toHaveProperty('token');
  });

  it('Debe devolver un error si las credenciales son incorrectas', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const response = await request(app).post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Contraseña incorrecta');
  });

  it('Debe devolver un error si el usuario no existe', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'nonexistent@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Usuario incorrecto');
  });
});

