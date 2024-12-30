import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'Coally Prueba Técnica Erick Aranibar Task Manager API',
    },
    servers: [
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);
export const swaggerDocs = (app: any, port: string): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`Docs available at http://localhost:${port}/api-docs`);
};
