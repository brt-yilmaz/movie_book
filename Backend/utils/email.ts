import { SESClient, SendEmailCommand,SESClientConfig } from '@aws-sdk/client-ses'

const SES_CONFIG:SESClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY || '',
  },
  region: process.env.AWS_SES_REGION
}

//create SES service object
const sesClient = new SESClient(SES_CONFIG) ;


const sendEmail = async (email: string, subject: string, text: string, name: string) => {
  const params = {
    Source: process.env.AWS_SES_EMAIL,
    Destination: {
      ToAddresses: [
        email
      ],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: '<h1>This is the body of my email!</h1>',
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is the body of my email!"
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Hello, ${name}!`,
      }
    },
  };
  try {
    console.log(process.env.AWS_SES_EMAIL, process.env.AWS_SES_REGION, process.env.AWS_SES_ACCESS_KEY_ID, process.env.AWS_SES_SECRET_ACCESS_KEY,email,name,)
    const sendEmailCommand = new SendEmailCommand(params);
    const res = await sesClient.send(sendEmailCommand);
    console.log('Email has been sent!', res);
  } catch (error) {
    console.error(error);
  }
    
}

export default sendEmail