import express from 'express';
import { user } from "../controllers";

const router = express.Router();



router.route('/')
    .get(user.getUser)
    .post(user.addUser)
    .patch(user.updateUser)
    .delete(user.removeUser);

router.route('/list')
    .get(user.allUser);

export default router;




