import { emailRegister,emailForgotPassword } from "../helpers/email.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import User from "../models/User.js";



const register = async (req, res) => {
    //Eviar regitros duplicados
    
    const { email } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({ msg: error.message })
    }

    try {
        const user = new User(req.body);
        user.token = generateId();
        await user.save();
        //Enviar Email de confirmacion
        emailRegister({
            name:user.name,
            email:user.email,
            token:user.token
        })
        res.json({msg:"Usuario Creado Correctamente, Revisa tu correo para activar tu cuenta"})
        
    } catch (error) {
        console.log(error);
    }



}

const authenticate = async (req, res) => {

    const { email, password } = req.body
    //comprobar si el usaurio existe
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('Usuario no esta registrado')
        return res.status(400).json({ msg: error.message })
    }
    //comprobar si el usuario esta confirmado
    if (!user.confirm) {
        const error = new Error('Usuario no esta confirmado')
        return res.status(400).json({ msg: error.message })
    }
    //confirmar su contraseña
    if (await user.findPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })
    } else {
        const error = new Error('La contraseña es incorrecta')
        return res.status(400).json({ msg: error.message })
    }
}

const confirm = async (req, res) => {
    const { token } = req.params
    const userConfirm = await User.findOne({ token })
    if (!userConfirm) {
        const error = new Error('Token no valido')
        return res.status(400).json({ msg: error.message })
    }
    try {
        userConfirm.confirm = true;
        userConfirm.token = ''
        await userConfirm.save()
        res.json({ msg: 'Confirmado Correctamente' })
    } catch (error) {
        console.log(error)
    }

}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error('Usuario no esta registrado')
        return res.status(400).json({ msg: error.message })
    }
    if(!user.confirmado){
        const error = new Error('Usuario no esta confirmado')
        return res.status(400).json({ msg: error.message })
    }
    try {
        user.token = generarId();
        await usuario.save()
        //enviar email
        emailForgotPassword({
            name:user.name,
            email:user.email,
            token:user.token
        })
        res.json({ msg: 'Hemos enviado un email con las intrucciones ' })

    } catch (error) {
        console.log(error)
    }


}


const chekToken = async (req, res) => {
    const { token } = req.params
    const tokenValid = await User.findOne({ token })
    if (tokenValid) {
        res.json({ msg: 'Token valido y el Usuario existe' })
    } else {
        const error = new Error('Token no valido')
        return res.status(400).json({ msg: error.message })
    }


}


const newPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ token })
    if (user) {
        user.password = password
        user.token = ''
        try {
            await user.save()
            res.json({ msg: 'Contraseña modificada Correctamente' })
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error('Token no valido')
        return res.status(400).json({ msg: error.message })
    }


}

const profile = async (req, res) => {
    const {user} = req
    res.json(user)
}


export {
    register,
    authenticate,
    confirm,
    forgotPassword,
    chekToken,
    profile,
    newPassword
}