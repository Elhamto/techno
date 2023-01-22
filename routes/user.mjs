import express from 'express';
import { userCntrl } from "../controllers/index.mjs";

const router = express.Router();



router.route('/')
    .get(userCntrl.getUser)
    .post(userCntrl.addUser)
    .patch(userCntrl.updateUser)
    .delete(userCntrl.removeUser);

router.route('/list')
    .get(userCntrl.allUser);

export default router;




