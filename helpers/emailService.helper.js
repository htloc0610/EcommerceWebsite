const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports.sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://127.0.0.1:3000/account/verify?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email",
    html: `
        <h1>Email Verification</h1>
        <p>Please click the button below to verify your email:</p>
        <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
      `,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
