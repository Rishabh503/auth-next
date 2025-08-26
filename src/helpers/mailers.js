import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    // created a hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.mailtrap_user,
    pass: process.env.mailtrap_password
  }
});
    const mailOptions = {
  from: "abcdef@gmail.com",
  to: email,
  subject: emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "RESET PASSWORD",
  html: `
    <p>
      Click 
      <a href="${process.env.domain}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">
        here
      </a> 
      to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
    </p>
    <p>
      Or copy this link: 
      ${process.env.domain}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword/view"}?token=${hashedToken}
    </p>
  `
}

    const mailRespone=await transport.sendMail(mailOptions);
    return mailRespone

  } catch (error) {
    throw new Error("error is in sendmail", error.message);
  }
};
