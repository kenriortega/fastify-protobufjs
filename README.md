# Fastify-protobuf

A simple fastify-plugin to serialize binary data to protobuf

```javascript

fastify.register(require('./fastify-protobufjs-serializer'), {
    protoloadPath: path.join(__dirname, 'schema', 'package.proto'),
    messagePackage: 'Package'
})
```