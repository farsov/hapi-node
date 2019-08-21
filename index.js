'use strict'

const config = require('./src/config/config.json')
const Hapi = require('hapi')
const HapiJWT = require('hapi-jsonwebtoken');
const HapiJWTConfig = require('./src/config/jsonwebtoken');

const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: 'localhost',
    routes:{
        cors: {
            origin: ["*"]
        }
    }
})

async function init(){
    try {
        await server.register({ plugin: require('./src/plugins/seneca'), options: config.seneca})
        await server.register(HapiJWT.plugin);
        server.auth.strategy('jwt', 'hapi-jsonwebtoken', HapiJWTConfig);
        server.auth.default('jwt');

        await server.register(require('./src/controllers/usersController'))
        await server.start()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    console.log(`Servidor lanzado en: ${ server.info.uri}`)
}

init()