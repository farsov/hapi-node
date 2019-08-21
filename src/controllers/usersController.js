const Joi = require('joi')

const plugin = {
    name: 'usersController',
    version: '1.0.0',
    register: (server, options) => {
        server.route([
            {
                method: 'GET',
                path: '/users',
                options: {
                    auth: false,
                },
                handler: getAllUsers,
            },
        ])
    }
}

async function getAllUsers(req, h){
    try {
        //return 'hola'
        return await h.act({ role:'users', cmd:'getAllUsers'})
    } catch (error) {
        console.log(error)
    }
}

module.exports = plugin