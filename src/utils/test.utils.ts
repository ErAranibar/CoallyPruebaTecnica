import { Application } from "express";
import request from 'supertest';

export async function registerAndLogin(app: Application): Promise<string> {
    const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
            email: 'testuser@example.com',
            password: 'password123',
        });
    expect(registerResponse.status).toBe(201);

    const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'testuser@example.com',
            password: 'password123',
        });
    expect(loginResponse.status).toBe(200);
    return loginResponse.body.token;
}