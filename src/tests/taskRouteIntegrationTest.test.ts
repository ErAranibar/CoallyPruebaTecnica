import request from 'supertest';
import app from '../server';
import mongoose from 'mongoose';

afterEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  for (let collection of (collections || [])) {
    await collection.deleteMany({});
  }
});

describe('Task API Integration Tests', () => {

  describe('Task Creation', () => {
    it('should return 400 if title is missing', async () => {
      const response = await request(app)
        .post('/api/tasks/add')
        .send({ description: 'Test task1' });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('El título es obligatorio.');
    });

    it('should return 400 if title is not a string', async () => {
      const response = await request(app)
        .post('/api/tasks/add')
        .send({ title: 123, description: 'Test task' });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('El título debe ser un texto');
    });

    it('should return 400 if completed is not a boolean', async () => {
      const response = await request(app)
        .post('/api/tasks/add')
        .send({ title: '123', description: 'Test task', completed: 'trued' });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('El estado debe ser un valor booleano');
    });

    it('should successfully create a task with required fields and store it in the database', async () => {
      const response = await request(app)
        .post('/api/tasks/add')
        .send({ title: 'Test Task', description: 'Valid task description' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Test Task');
      expect(response.body).toHaveProperty('description', 'Valid task description');
      expect(response.body).toHaveProperty('completed', false);

      const task = await mongoose.model('Task').findOne({ title: 'Test Task' });
      expect(task).not.toBeNull();
      expect(task?.title).toBe('Test Task');
      expect(task?.description).toBe('Valid task description');
      expect(task?.completed).toBe(false);
    });
  });

  describe('Get All Tasks', () => {
    it('should return all tasks', async () => {
      await request(app)
        .post('/api/tasks/add')
        .send({ title: 'Task 1', description: 'Description 1' });

      await request(app)
        .post('/api/tasks/add')
        .send({ title: 'Task 2', description: 'Description 2' });

      const response = await request(app)
        .get('/api/tasks/all');

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(1);
    });
  });

  describe('Get Task by ID', () => {
    it('should return a task by ID', async () => {
      const taskResponse = await request(app)
        .post('/api/tasks/add')
        .send({ title: 'Task By ID', description: 'Description for task by id' });

      const taskId = taskResponse.body._id;

      const response = await request(app)
        .get(`/api/tasks/getById/${taskId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id', taskId);
      expect(response.body).toHaveProperty('title', 'Task By ID');
      expect(response.body).toHaveProperty('description', 'Description for task by id');
    });

    it('should return 404 if task not found', async () => {
      const response = await request(app)
        .get('/api/tasks/getById/invalidid');
      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Tarea no encontrada');
    });
  });

  describe('Task Update', () => {
    it('should update a task successfully', async () => {
      const taskResponse = await request(app)
        .post('/api/tasks/add')
        .send({ title: 'Task to Update', description: 'Description' });

      const taskId = taskResponse.body._id;

      const response = await request(app)
        .put(`/api/tasks/update/${taskId}`)
        .send({ title: 'Updated Task', description: 'Updated description', completed: true });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Updated Task');
      expect(response.body).toHaveProperty('description', 'Updated description');
      expect(response.body).toHaveProperty('completed', true);

      const updatedTask = await mongoose.model('Task').findById(taskId);
      expect(updatedTask?.title).toBe('Updated Task');
      expect(updatedTask?.description).toBe('Updated description');
      expect(updatedTask?.completed).toBe(true);
    });

    it('should return 404 if task to update is not found', async () => {
      const response = await request(app)
        .put('/api/tasks/update/invalidid')
        .send({ title: 'Updated Task', description: 'Updated description' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Tarea no encontrada');
    });
  });

  describe('Task Deletion', () => {
    it('should delete a task successfully', async () => {
      const taskResponse = await request(app)
        .post('/api/tasks/add')
        .send({ title: 'Task to Delete', description: 'Description' });

      const taskId = taskResponse.body._id;

      const response = await request(app)
        .delete(`/api/tasks/delete/${taskId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Tarea eliminada');

      const deletedTask = await mongoose.model('Task').findById(taskId);
      expect(deletedTask).toBeNull();
    });

    it('should return 404 if task to delete is not found', async () => {
      const response = await request(app)
        .delete('/api/tasks/delete/invalidid');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Tarea no encontrada');
    });
  });
});


