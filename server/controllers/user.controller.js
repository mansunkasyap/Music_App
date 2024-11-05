import User from "../models/user.model.js"
import { sendEmail } from "../services/Gmail.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
// import bcrypt from 'bcryptjs';

export const userRegisterController = async function (req, res, next) {
    console.log(req.url);
    // get data from front-end
    // check fields
    // confirm whether it is already exist

    const { userName, password, email } = req.body;
    // console.log(req.files);
    // console.log(userName, password, email);

    const existedUser = await User.findOne({
        $or: [{ email }, { userName }]
    }).select("-password -refreshToken")
    console.log(existedUser);

    if (existedUser) {
        res.status(409).json(new ApiResponse(409, existedUser, "User already Exist.."))
        // res.status(409).send({"msg" : "User already Exist.."})
        return
    }
    else {
        const newUser = new User();
        const refreshToken = await newUser.generateRefreshToken();
        const accessToken = await newUser.generateAccessToken();
        const localImagePath = req.files.avatar[0].path;
        const avatar = await uploadOnCloudinary(localImagePath)

        await User.create({ userName, password, email, refreshToken, avatar: avatar.url })
        await sendEmail("mansunkasyap@gmail.com", "TEST", 'Hello , there thanks for registration')
        res.status(201).json({
            message: "Registered Successfully..",
            refreshToken,
            accessToken,
            user: {
                newUser
            }
        });
    }
}

export const userLoginController = async function (req, res, next) {

    let { userName, password } = req.body
    console.log(userName, password);
    const user = await User.findOne({ userName })
    // console.log(user);

    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "user not found"))
    }
    const isCorrect = await user.isPasswordCorrect(password)
    console.log(isCorrect);

    if (!isCorrect) {
        return res.status(401).json(new ApiResponse(401, null, "Invalid username or password"))
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateAccessToken();
    if (isCorrect) {
        console.log("sending res..");

        res.status(200).json({
            message: "Login successful",
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: {
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
            }
        })
    }
    else {
        res.status(401).json({
            message: "Invalid Credentials"
        })
    }
}

export const forgetPasswordController = async function (req, res) {
    try {
        const { email } = req.body
        const existedUser = await User.findOne({ email })
        if (existedUser) {
            await sendEmail(email, "XYZ", "Sending TEXT......")
        }
    }
    catch(err){
        console.log(err);
    }
}

export const userLogoutController = async function (req, res, next) {
    console.log("Logged out.....")
    res.render('Logout')
}