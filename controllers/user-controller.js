'use strict';

const userService = require('../services/user-service');

class UserController {

    async addUser(req, res) {
        const user = req.body
        try {
            const user = await userService.adduser(user)
            return res.status(200).send(user)
        } catch (error) {
            return res.status(404).send({
                status: 'error',
                message: error.message
            })
        }
    }

    async getUser(req, res) {
        try {
            const result = await userService.getuser(req.body.title);
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async allUser(res) {
        try {
            const result = await userService.alluser();
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async updateUser(req, res) {
        const user = req.body
        try {
            const result = await userService.updateuser(user);
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async removeUser(req, res) {
        try {
            const result = await userService.removeuser(req.body.title);
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

}

export default new UserController();