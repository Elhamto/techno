import User from '../schema/user-schema.mjs';

class UserService {

    async addUser(user) {
        const cteateUser = await User.create(user)
        return cteateUser
    }

   async getUsers() { //get currentUser
        const user = await User.find()
        return user
    }

    async updateUser(username, firstName, lastName, email) {
        return await User.updateOne({ username: username }, { firstName: firstName })
    }

    async removeUser(username) {
        return await User.deleteOne({username: username}, function (err) {
            if (err) return handleError(err);})
    }

}

export default new UserService();
