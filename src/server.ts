import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as courseRouter from './routes/course';
import * as userRouter from './routes/user';
require('./db/mongoose');

const server = express();
const swaggerDoc = require('../swagger.json');
const ENDPOINT = process.env.ENDPOINT_SERVER;
const PORT = process.env.PORT;

server.use(express.json());
server.use('/user', userRouter);
server.use('/course', courseRouter);

// host API documentation
server.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

server.listen(PORT, () => {
    console.log(`Server is running in ${ENDPOINT}:${PORT}`);
});
