# Card Deck API

## Prerequesties

* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. 
* Docker - [Download & Install Docker](https://docs.docker.com/get-docker/) and the npm package manager. 

## Configuration

Your .env file should have these items below
```
PORT=5000
MONGODB_CONNECTION_URL=<mongoDB connection url>
MONGODB_CONNECTION_TEST_URL=<mongoDB connection url>
```

## Downloading 

Cloning the git repository 

```bash
$ git clone https://github.com/broozkan/card-deck-api.git
```

## Installation 

There is two way for install the app

### 1 - With npm
```bash
$ npm install
```
```bash
$ npm run dev
```
### 2 - With docker

Build image

```bash
$ docker build -t carddeckapi .
```
Run container

```bash
$ docker run -d -p 5000:5000 carddeckapi
```

After both installation you can access app from [here](http://localhost:3002).

## Running Tests

You can run unit tests with 

```bash
# runs all tests
$ npm run test 

# runs only unit tests
$ npm run test:unit 

# runs only integration tests
$ npm run test:integration
```

## License
[The MIT License](LICENSE.md)