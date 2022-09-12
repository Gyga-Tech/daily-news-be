const Auth = require('../model/Auth')

module.exports = {
    login: async (req, res)=> {
        try {
            const results = await Auth.login(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(error ? error.status ? error.status : 500 : 500).send(error)
        }
    },
    register: async (req, res)=> {
        try {
            console.log("halo")
            const results = await Auth.register(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(error ? error.status ? error.status : 500 : 500).send(error)
        }
    },
}