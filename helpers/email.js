import nodemailer from 'nodemailer';

export const emailRegister=async (datos)=>{

    const{name,email,token} = datos;
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST ,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user:process.env.EMAIL_USER ,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    
    //Informacion del Email
      const info = await transport.sendMail({
            from: '"ComparaCompras - Comparador de Productos" <cuentas@uptask.com>',
            to:email,
            subject:"ComparaCompras - Comprueba tu cuenta",
            text: "Comprueba tu cuenta en ComparaCompras",
            html:` <p>Hola: ${name} Comprueba tu cuenta en ComparaCompras</p>
            <p>Tu cuenta ya esta casi lista, solo debes comprobar en el siguiente enlace: </p>
            <a href="${process.env.FRONTEND_URL}/confirm/${token}">Comprobar cuenta</a> 

            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
            
            `
      })
}

export const emailForgotPassword=async (datos)=>{

  const{name,email,token} = datos;
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST ,
      port: process.env.EMAIL_PORT,
      auth: {
        user:process.env.EMAIL_USER ,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  
  //Informacion del Email
    const info = await transport.sendMail({
          from: '"ComparaCompras - Comparador de Productos" <cuentas@uptask.com>',
          to:email,
          subject:"ComparaCompras - Restablece tu Contraseña",
          text: "Restablece tu Contraseña",
          html:` <p>Hola: ${name} has solicitado restablecer tu contraseña</p>
          <p>Sigue el siguiente enlace para generar una nueva contraseña: </p>
          <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restableces Contraseña</a> 

          <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
          
          `
    })
}