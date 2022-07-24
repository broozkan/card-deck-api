import { load } from 'ts-dotenv';

const env = load({
    MONGODB_CONNECTION_URL: String,
    MONGODB_CONNECTION_TEST_URL: String,
    PORT: Number
})
const numCpus = require('os').cpus().length;

export default {
    port: env.PORT,
    mongoose: {
        url: env.MONGODB_CONNECTION_URL as string,
        testUrl: env.MONGODB_CONNECTION_TEST_URL as string,
        options: {
            // left blank for customizing mongoDB connection
        }
    },
    numCpus
}