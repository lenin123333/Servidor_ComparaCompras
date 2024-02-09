import jwt from 'jsonwebtoken'

 const generateJWT = (id) =>{

    //toma lo que va colocar en el token
    return jwt.sign({
       id
    },process.env.JWT_SECRET,{ expiresIn:'30d'})
}

export default generateJWT;