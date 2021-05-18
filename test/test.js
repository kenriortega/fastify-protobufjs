'use strict'

const t = require('tap')
const test = t.test
const plugin = require('../')
const Fastify = require('fastify')
const path = require('path')
const protobuf = require('protobufjs')
const root = protobuf.loadSync('test/schema/package.proto')
const AwesomeMessage = root.lookupType('Package')
test('serializer', t => {
    t.plan(1)
    const fastify = Fastify()

    fastify.register(plugin, {
        protoloadPath: path.join(__dirname, 'schema', 'package.proto'),
        messagePackage: 'Package'
    })

    fastify.get('/encode', (req, reply) => {
        reply.send({ hello: 'fastify-plugin' })
    })

    t.test('application/x-protobuf -> protobuf', t => {
        t.plan(3)
        fastify.inject({
            method: 'GET',
            url: '/encode',
            payload: {},
            headers: {
                accept: 'application/x-protobuf'
            }
        }, (err, res) => {
            t.error(err)
            t.strictSame(res.headers['content-type'], 'application/x-protobuf')
            t.strictSame(
                res.payload,
                AwesomeMessage.encode(AwesomeMessage.create({ hello: 'fastify-plugin' })).finish().toString(),
            )
        })
    })
})

test('serializer - default = application/json by fastify', t => {
    t.plan(1)
    const fastify = Fastify()

    fastify.register(plugin, {
        protoloadPath: path.join(__dirname, 'schema', 'package.proto'),
        messagePackage: 'Package'
    })

    fastify.get('/request', function (req, reply) {
        reply.send({ hello: 'world' })
    })

    t.test('no match -> json', t => {
        t.plan(4)

        fastify.inject({
            method: 'GET',
            url: '/request'
        }, (err, response) => {
            t.error(err)
            t.equal(response.statusCode, 200)
            t.equal(response.headers['content-type'], 'application/json; charset=utf-8')
            t.same(response.json(), { hello: 'world' })
        })

    })
})