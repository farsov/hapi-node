const secretOrPrivateKey = 'node.com'

module.exports = {
    secretOrPrivateKey,
    validate: async (req, payload, h) => {
        let credentials = {}
        if(payload.username) {
            credentials.username = payload.username
            return  {
                isValid: true,
                credentials
            }
        }else{
            return { isValid:false, credentials}
        }
    }
}