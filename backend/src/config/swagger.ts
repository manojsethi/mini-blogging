import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import * as pkg from '../../package.json';

export function setupSwagger(app: Express) {
  const options: swaggerJSDoc.Options = {
    definition: {
      openapi: '3.0.3',
      info: {
        title: `Mini Blogging API - ${process.env.NODE_ENV}`,
        description: 'API documentation',
        version: (pkg as any).version,
      },
      servers: [
        {
          url: process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
        },
      ],
    },
    apis: ['src/api/v1/routes/**/*.ts'], // only scan your route files for JSDoc
  };

  const swaggerSpec = swaggerJSDoc(options);

  // Expose raw JSON (for type generation tools)
  app.get('/api/v1/openapi.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
