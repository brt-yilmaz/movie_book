import { SESClient, SendEmailCommand, SendEmailCommandInput} from '@aws-sdk/client-ses'
import pug from 'pug'
import { SESClientConfig } from '@aws-sdk/client-ses'
import { UserDocument } from 'mongoose'
import dotenv from 'dotenv'                   
dotenv.config()

const {AWS_SES_ACCESS_KEY_ID, AWS_SES_SECRET_ACCESS_KEY, AWS_SES_REGION } = process.env;

// Without nodemailer
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


// const sendEmail = async (to: string, subject: string, text: string, name: string) => {
//   const params = {
//     Source: process.env.AWS_SES_EMAIL,
//     Destination: {
//       ToAddresses: [
//         to
//       ],
//     },
//     ReplyToAddresses: [],
//     Message: {
//       Body: {
//         Html: {
//           Charset: 'UTF-8',
//           Data: '<h1>This is the body of my email!</h1>',
//         },
//         Text: {
//           Charset: "UTF-8",
//           Data: "This is the body of my email!"
//         }
//       },
//       Subject: {
//         Charset: 'UTF-8',
//         Data: `Hello, ${name}!`,
//       }
//     },
//   };
//   try {
//     const sendEmailCommand = new SendEmailCommand(params);
//     const res = await sesClient.send(sendEmailCommand);
//     console.log('Email has been sent!', res);
//   } catch (error) {
//     console.error(error);
//   }
    
// }



  
  /*
  // Create SES service object.
  const ses = new AWS.SES({
    region: AWS_SES_REGION,
    credentials: {
      accessKeyId: AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: AWS_SES_SECRET_ACCESS_KEY,
    },
  } as SESClientConfig );
  
  const transporter = nodemailer.createTransport({
    SES: { ses, aws: AWS },
  });
  
  const sendEmail = async () => {
    try {
      // Email content
      const mailOptions:MailOptions = {
        from: {
          name: 'MovieBook',
          address: process.env.AWS_SES_EMAIL || '',
        }, // sender address
        to: ["beratyilmaz3102@gmail.com"], // list of receivers
        subject: 'Test Email with Attachments', // Subject line
        text: 'Hello, this is a test email with attachments!', // plain text body
        html: "<b>Hello, this is a test email with attachments!</b>", // html body
        attachments: [
          {
            filename: 'test.pdf',
            path: path.join(__dirname, 'test.pdf'),
            contentType: 'application/pdf'
          },
          {
            filename: 'sample.jpg',
            path: path.join(__dirname, 'logo.png'),
            contentType: 'image/png'
          },
        ]
      }
  
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
    } catch (error) {
      console.error(error);
    }
  }
  */
export default Email