/// <reference types="node" />

import { FastifyPluginCallback } from 'fastify';
export interface FastifyProtobufOptions {
    /**
   * Configures the path for the <Service.proto>.
   */
    protoloadPath: String;
    /**
    * Configures the name for the message namePackage.
    * 
    * message <namePackage> {
    * }
    */
    messagePackage: String;
}
declare const fastifyProtobuf: FastifyPluginCallback<FastifyProtobufOptions>;
export default fastifyProtobuf;