//import { SESClient, SendEmailCommand, SendEmailCommandInput, SESClientConfig} from '@aws-sdk/client-ses'
import nodeMailer from 'nodemailer'
import pug from 'pug'
import { UserDocument } from 'mongoose'
import dotenv from 'dotenv'                   
dotenv.config()

class Email {
  to: string | undefined;
  firstName: string | undefined;
  url: string | undefined;
  from: string | undefined;

  constructor( user: UserDocument, url: string) {
    this.to = user.email;
    this.firstName = user.name?.split(' ')[0];
    this.url = url;
    this.from = `MovieBook <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    console.log(process.env.APP_PASSWORD)
    return nodeMailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.APP_PASSWORD
      }
    });
  }

  async send(template:string, subject:string) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/emailTemplates/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    }) ;

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    }

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);

  }
  
 
  async sendWelcome() {
    await this.send('welcome', 'Welcome to the MovieBook Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}
/* with AWS SES, but you must talk with AWS Support and request to be able to use it with (to remove SandBox) unverified email option

const {AWS_SES_ACCESS_KEY_ID, AWS_SES_SECRET_ACCESS_KEY, AWS_SES_REGION } = process.env;


const SES_CONFIG:SESClientConfig = {
  credentials: {
    accessKeyId: AWS_SES_ACCESS_KEY_ID as string,
    secretAccessKey: AWS_SES_SECRET_ACCESS_KEY as string,
  },
  region: AWS_SES_REGION as string
}
//create SES service object and pass the configuration object
const sesClient = new SESClient(SES_CONFIG) ;


class Email {
  to: string | undefined;
  firstName: string | undefined;
  url: string | undefined;
  from: string | undefined;
 

  constructor(user: UserDocument, url: string) {
    this.to = user.email;
    this.firstName = user.name?.split(' ')[0];
    this.url = url;
    this.from = `MovieBook <${process.env.AWS_SES_EMAIL}>`;
  }

  async send(template:string, subject:string) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/emailTemplates/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    }) ;
    const params = {
      Source: process.env.AWS_SES_EMAIL,
      Destination: {
        ToAddresses: [
          this.to
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: html,
          },
          Text: {
            Charset: "UTF-8",
            Data: 'hi',
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        }
      },
    };
    try {
      const sendEmailCommand = new SendEmailCommand(params as SendEmailCommandInput);
      const res = await sesClient.send(sendEmailCommand);
      console.log('Email has been sent!', res);
    } catch (error) {
      console.error(error);
    }

  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Moviebook!!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

}

*/


export default Email