import Mailgen from "mailgen";

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

export { emailVerificationMailgenContent, forgotPasswordMailgenContent };
