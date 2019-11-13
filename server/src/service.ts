import * as express from 'express';
import * as http from 'http';
import * as swaggerUi from 'swagger-ui-express';
import * as courseRouter from './routes/course';
import * as userRouter from './routes/user';
import * as groupRouter from './routes/group';
import * as chatRouter from './routes/chat';
import { initializeChat } from './chat/chat';
require('./db/mongoose');

const server = express();
const service = http.createServer(server);
const swaggerDoc = require('../swagger.json');

server.use(express.json());
server.use('/user', userRouter);
server.use('/course', courseRouter);
server.use('/group', groupRouter);
server.use('/chat', chatRouter);

initializeChat(service);

// host API documentation
server.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = service;
