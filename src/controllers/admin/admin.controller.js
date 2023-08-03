import User from "../../models/User.js";
import jwt from "jsonwebtoken"
import { transporter } from "../../libs/nodemailer.js";

export const signup = async (req, res, next) => {
    try {
        const { email, password, } = req.body
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.json({ message: "The email is already in use." })
        }
        else {
            if (password.length >= 6 && password.length < 16) {
                const user = new User({ password, email })
                user.password = await user.encryptPassword(user.password)
                const userSaved = await user.save()
                const token = jwt.sign({ _id: userSaved._id }, `${process.env.TOKEN_KEY_JWT}`, {
                    expiresIn: 1815000000
                })
                user.online = true
                await user.save()
                // res.cookie('authtoken', token, {
                //     maxAge: 1815000000, //21 days
                //     httpOnly: true, // Para consumir sólo en protocolo HTTP
                //     sameSite: 'none',
                //     secure: true,
                // })
                // await transporter.sendMail({
                //     from: 'chatappco@gmail.com', // sender address
                //     to: `${email}`, // list of receivers
                //     subject: `Hola ${email}, registro exitoso!`, // Subject line
                //     text: "Has sido registrado con éxito!", // plain text body
                //     // html: "<b>Hello world?</b>", // html body
                // });
                console.log(user)
                return res.status(200).json({ message: 'Success', token: token })
            }
        }
    } catch (error) {
        console.log("error:", error)
        res.status(400).json(error)
        next(error)
    }
}
