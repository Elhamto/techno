
import userService from '../services/user-service.mjs';

class UserController {

    async addUser(req, res) {
        const user = req.body
        try {
            const userObj = await userService.addUser(user)
            return res.status(200).send(userObj)
        } catch (error) {
            return res.status(404).send({
                status: 'error',
                message: error.message
            })
        }
    }

    async getUsers(req, res) {
        try {
            const result = await userService.getUsers();
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async allUser(res) {
        try {
            const result = await userService.allUser();
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async updateUser(req, res) {
        const user = req.body
        try {
            const result = await userService.updateUser(user);
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

    async removeUser(req, res) {
        try {
            const result = await userService.removeUser(req.body.title);
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json(error.message)
        }
    }

}

export const userCntrl = new UserController();