import * as log from 'log';
import * as logNode from 'log-node';
const service = require('./service');

// create server DB connection
require('./db/mongoose');

const ENDPOINT = process.env.ENDPOINT_SERVER;
const PORT = process.env.PORT;

// enable node logging
logNode();

service.listen(PORT, () => {
    log.notice(`Server is running in ${ENDPOINT}:${PORT}`);
});
