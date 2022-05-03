const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const db = require('./config/db-connection');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ToDo API',
      version: '1.0.0',
      description: "Cybersecurity diplomate. Team 2"
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: "apiKey",
          name: "Authorization",
          description: "Token provided at login",
          in: "header"
        }
      }
    },
  },
  apis: ['./src/routes/*.js'],
};
const openapiSpecification = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.redirect('/api-docs'); });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api/tasks', require('./src/routes/task.route'));
app.use('/api/users', require('./src/routes/user.route'));

app.listen(port, () => console.log(`Listening on port ${port}`));