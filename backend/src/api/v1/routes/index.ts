import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerSchemas } from '../../../types/swagger';
import userRoutes from '../users/user.routes';
import authRoutes from '../auth/auth.routes';
import postRoutes from '../posts/post.routes';

const router: Router = Router();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Blogging API',
      version: '1.0.0',
      description: 'A mini blogging platform API with user management and post creation',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: swaggerSchemas
    }
  },
  apis: ['./src/api/v1/**/*.ts', './src/dto/**/*.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

export default router;
