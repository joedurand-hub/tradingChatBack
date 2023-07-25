import User from "../../models/User.js";
import jwt from "jsonwebtoken"
import { transporter } from "../../libs/nodemailer.js";

export const signup = async (req, res, next) => {
    try {
        const { email, userName, password, } = req.body
        const userNameExist = await User.findOne({ userName })
        if (userNameExist) {
            return res.json({ message: "The username is already in use." })
        }
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.json({ message: "The email is already in use." })
        }
        else {
            if (password.length >= 6 && password.length < 16) {
                const user = new User({ userName, password, email })
                user.password = await user.encryptPassword(user.password)
                user.profilePicture.secure_url = "https://res.cloudinary.com/groob/image/upload/v1661108370/istoremovebg-preview_hzebg1.png"
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
                await transporter.sendMail({
                    from: 'chatappco@gmail.com', // sender address
                    to: `${email}`, // list of receivers
                    subject: `Hola ${userName}, registro exitoso!`, // Subject line
                    text: "Gracias por registrarte. Groob es una plataforma creada por Joel Durand.", // plain text body
                    // html: "<b>Hello world?</b>", // html body
                });
                console.log(user)
                res.status(200).json({ message: 'Success', token: token })
            }
        }
    } catch (error) {
        console.log("error:", error)
        res.status(400).json(error)
        next()
    }
}
