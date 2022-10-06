"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export async function main(token: string, email: string) {

  let transporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  // send mail with defined transport object
  return new Promise((resolve, reject) => {
    transporter.sendMail({
    from: '"Tuesday" <tuesdayWildCodeSchool@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Récupération de mot de passe", // Subject line
    text: "Mot de passe oublié", // plain text body
    html: "<b>Mot de passe oublié?</b> " + token , // html body
  }, (err : any, data : any) => {
    if (err) {
      reject(false);
    } else {
      resolve(true);
    }
  });
  })
}



// Logique 
// 1. L'utilisateur clique sur "Mot de passe oublié"
// 2. L'utilisateur entre son adresse mail
// Je verifie que le mail appartient bien à quelqu'un 
// Sur le serveur, je reçois son mail que je transforme en token
// je lui envoie un mail avec un lien qui possède le token (exemple: tuesday.com/reset-password/sdfjqsdiofjqsdiofjqsdfijq)
// la route decrypte le token et utilise le mail qui a été décrypter pour faire le findUnique.update()

