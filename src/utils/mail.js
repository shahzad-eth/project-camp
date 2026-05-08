import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // setting up the branding for Mailgen
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Project Manager",
      link: "http://projectmanagement.com",
    },
  });

  //Incase client doesn't support HTML
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  const emailHTML = mailGenerator.generate(options.mailgenContent);

  const transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  try {
    await transport.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed silently. Make sure to provide MAILTRAP credential ins .env file",
    );
    console.error("Error: ", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App! we're exited to have you onboard",
      action: {
        instructions: "To verify please click the following button",
        button: {
          color: "#3cab54",
          text: "Verify",
          link: verificationUrl,
        },
      },
      outro:
        "Need help or have questions? reply to this email, we'd love to help!",
    },
  };
};

const forgotPasswordMailgenContent = (username, resetPasswordUrl) => {
  return {
    body: {
      name: username,
      intro: "We have received a request to reset your password",
      action: {
        instructions: "Click below button to reset your password",
        button: {
          color: "#3cab54",
          text: "Reset Password",
          link: resetPasswordUrl,
        },
      },
      outro:
        "Need our help or have questions? reply to this email, we'd love to help!",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
