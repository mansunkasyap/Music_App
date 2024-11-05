import { Router} from "express";
import { userLoginController, userRegisterController, userLogoutController, forgetPasswordController } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route('/register').post(
    upload.fields([{
        name : 'avatar',
        maxCount : 1
    }]),
    userRegisterController
)

userRouter.route('/login').post(userLoginController)
userRouter.route('/logout').post(userLogoutController)
userRouter.route('/forget').get(forgetPasswordController)
userRouter.route('*').get()

export default userRouter