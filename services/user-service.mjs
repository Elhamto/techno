import User from '../schema/user-schema.mjs';

class UserService {

    async addUser(user) {
        const cteateUser = await User.create(user)
        return cteateUser
    }

    async getUsers(id) { //get currentUser
        const user = await User.findOne({ _id: id })
        return user
    }

    updateUser(user) {
    }

    removeUser(title) {
    }

}

export default new UserService();
