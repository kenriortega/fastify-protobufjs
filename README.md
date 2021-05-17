# Fastify-protobufjs

Fastify and protobufjs, together at last. Uses protobufjs by default.

## Functionality

Provides transparent middleware that can be used to support clients requesting Accept: application/x-protobuf from endpoints using res.json or sending Content-Type: application/x-protobufjs to any endpoint. You can continue to use req.body and res.json and fastifyProtobuf will handle the conversion in the background using protobufjs.

Installation
------------

```bash
$ npm install --save fastify-protobufjs
// or
$ yarn add fastify-protobufjs
```

Usage
-----

```javascript
const fastifyProtobuf = require("fastify-protobufjs");

// ...
// custom plugin

fastify.register(fastifyProtobuf), {
    protoloadPath: path.join(__dirname, 'schema', 'package.proto'),
    messagePackage: 'Package'
})
````

Usage in simple app
-------------------


```javascript

'use strict'
const path = require('path')

const fastify = require('fastify')({
    logger: true
})

fastify.register(require('fastify-protobufjs'), {
    protoloadPath: path.join(__dirname, 'schema', 'package.proto'),
    messagePackage: 'Package'
})

fastify.post('/decode', (req, reply) => {
    // http POST http://localhost:5000/decode Accept:application/x-protobuf Content-Type:application/x-protobuf @grpc\package-protobuf.dat
    const body = req.body
    return body
})
fastify.get('/encode', (req, reply) => {
    // http http://localhost:5000/encode Accept:application/x-protobuf

    reply.send({
        name: "binari-encodings",
        private: true,
        version: "1.0.0",
        main: "index.js",
        licence: "MIT",
        value: 42
    })
})

const start = async () => {
    try {
        await fastify.listen(5000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
```
