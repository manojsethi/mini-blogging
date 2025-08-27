export const swaggerSchemas = {
  User: {
    type: 'object',
    properties: {
      _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
      username: { type: 'string', example: 'john_doe' },
      email: { type: 'string', example: 'john@example.com' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  Post: {
    type: 'object',
    properties: {
      _id: { type: 'string', example: '507f1f77bcf86cd799439012' },
      title: { type: 'string', example: 'My First Blog Post' },
      content: { type: 'string', example: 'This is the content of my blog post...' },
      author: { $ref: '#/components/schemas/User' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  RegisterDto: {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
      username: { 
        type: 'string', 
        minLength: 3, 
        maxLength: 30,
        example: 'john_doe'
      },
      email: { 
        type: 'string', 
        format: 'email',
        example: 'john@example.com'
      },
      password: { 
        type: 'string', 
        minLength: 6,
        example: 'Password123'
      }
    }
  },
  LoginDto: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { 
        type: 'string', 
        format: 'email',
        example: 'john@example.com'
      },
      password: { 
        type: 'string',
        example: 'Password123'
      }
    }
  },
  UpdateUserDto: {
    type: 'object',
    properties: {
      username: { 
        type: 'string', 
        minLength: 3, 
        maxLength: 30,
        example: 'john_doe'
      },
      email: { 
        type: 'string', 
        format: 'email',
        example: 'john@example.com'
      }
    }
  },
  CreatePostDto: {
    type: 'object',
    required: ['title', 'content'],
    properties: {
      title: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100,
        example: 'My First Blog Post'
      },
      content: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 1000,
        example: 'This is the content of my blog post...'
      }
    }
  },
  UpdatePostDto: {
    type: 'object',
    properties: {
      title: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 100,
        example: 'Updated Blog Post Title'
      },
      content: { 
        type: 'string', 
        minLength: 1, 
        maxLength: 1000,
        example: 'Updated content of my blog post...'
      }
    }
  },
  AuthResponse: {
    type: 'object',
    properties: {
      user: { $ref: '#/components/schemas/User' },
      token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
    }
  },
  ApiResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      data: { type: 'object' },
      message: { type: 'string' }
    }
  },
  ErrorResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean', example: false },
      error: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Error message' }
        }
      }
    }
  }
};
