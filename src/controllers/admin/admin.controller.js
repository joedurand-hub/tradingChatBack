import User from "../../models/User.js";
import jwt from "jsonwebtoken"
import { transporter } from "../../libs/nodemailer.js";

export const signup = async (req, res, next) => {
    try {
        const { email, password, role } = req.body
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.status(400).json("The email is already in use")
        }
        else {
            if (password.length >= 6 && password.length < 16) {
                const user = new User({ password, email, role })
                user.password = await user.encryptPassword(user.password)
                const userSaved = await user.save()
                const token = jwt.sign({ _id: userSaved._id }, `${process.env.TOKEN_KEY_JWT}`, {
                    expiresIn: 1815000000
                })
                // await transporter.sendMail({
                //     from: 'chatappco@gmail.com', // sender address
                //     to: `${email}`, // list of receivers
                //     subject: `Hola ${email}, registro exitoso!`, // Subject line
                //     text: "Has sido registrado con éxito!", // plain text body
                //     // html: "<b>Hello world?</b>", // html body
                // });
                return res.status(200).json({ message: 'Success', token: token, role: user.role, email: user.email })
            }
        }
    } catch (error) {
        console.log("error:", error)
        res.status(400).json(error)
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params.id
        const user = await User.find({_id: id})
        console.log(user)
        res.status(200).json({message: "Usuario eliminado", user})
    } catch (error) {
        console.log("error:", error)
        res.status(400).json(error)
        next(error)
    }
}


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        console.log(users)
        res.status(200).json(users)
    } catch (error) {
        console.log("error:", error)
        res.status(400).json(error)
        next(error)
    }
}
