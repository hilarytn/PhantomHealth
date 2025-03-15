import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Phantom Health API',
            version: '1.0.0',
            description: 'API documentation for Phantom Health',
        },
        servers: [{ url: 'http://localhost:5000' }],
    },
    apis: ['./routes/*.js'], // Auto-detects API routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
