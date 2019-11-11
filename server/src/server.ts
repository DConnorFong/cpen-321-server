import * as express from 'express';
import * as http from 'http';
import * as log from 'log';
import * as logNode from 'log-node';
import * as swaggerUi from 'swagger-ui-express';
import * as courseRouter from './routes/course';
import * as userRouter from './routes/user';
import * as groupRouter from './routes/group';
import { initializeChat } from './chat/chat';
require('./db/mongoose');

// enable node logging
logNode();

const server = express();
const service = http.createServer(server);
const swaggerDoc = require('../swagger.json');
const ENDPOINT = process.env.ENDPOINT_SERVER;
const PORT = process.env.PORT;

server.use(express.json());
server.use('/user', userRouter);
server.use('/course', courseRouter);
server.use('/group', groupRouter);

initializeChat(service);

// host API documentation
server.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

service.listen(PORT, () => {
    log.notice(`Server is running in ${ENDPOINT}:${PORT}`);
});
