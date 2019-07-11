import * as Express from 'express';
import UserController from'../controllers/UserController';

const router: Express.Router = Express.Router();

router.route('/users/auth')
	.post(UserController.authUser);

router.route('/users')
    .get(UserController.getUsers)
    .post(UserController.createUser);

router.route('/users/forgot')
	.post(UserController.forgotPassword);

router.route('/users/reset/:reset_token')
	.get(UserController.confirmResetPasswordToken)
	.post(UserController.resetPassword);

router.route('/users/:user_id')
    .get(UserController.getUserById)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

export default router;
