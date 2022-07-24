import cluster from 'cluster';
import mongoose from 'mongoose'
import app from "./app";
import config from "./config/config";

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    console.log('connected to mongoDB');
    if (cluster.isPrimary) {
        console.log('master cluster setting up ' + config.numCpus + ' workers...');

        for (var i = 0; i < config.numCpus; i++) {
            cluster.fork();
        }

        cluster.on('online', function (worker) {
            console.log('worker ' + worker.process.pid + ' is online');
        });

        cluster.on('exit', function (worker, code, signal) {
            console.log('worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            cluster.fork();
        });
    } else {
        app.listen(config.port, () => {
            console.log(`listening on ${config.port} with process ${process.pid}`);
        });
    }
});