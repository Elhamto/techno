import User from '../schema/user-schema.mjs';

class UserService {

    async addUser(user) {
        const cteateUser = await User.create(user)
        return cteateUser
    }

    getUser(title) {
    }

    updateUser(user) {
    }

    removeUser(title) {
    }

}

export default new UserService();
