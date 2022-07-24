import mongoose from 'mongoose'
import app from "./app";
import config from "./config/config";

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    console.log('connected to mongoDB');
    let server = app.listen(config.port, () => {
        console.log(`listening on ${config.port}`);
    });
});