import nodemailer from "nodemailer";
import User from "@/models/user";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, id}) => {
  try {
    const hashedToken = await bcryptjs.hash(id.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(id, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else {
      await User.findByIdAndUpdate(id, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "02cc45993b71ae",
        pass: "ce07f52faf8d85",
      },
    });

    const mailOptions = {
      from: "akif@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `${
        emailType === "VERIFY"
          ? `<p>
        Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"/>here</a>
        to Verify your email address <br />
        or copy and paste the link in your browser <br /> 
        "${process.env.DOMAIN}/verifyemail?token=${hashedToken}"
        </p>`
          : `<p>
        Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}"/>here</a>
        to Reset your password <br />
        or copy and paste the link in your browser <br /> 
        "${process.env.DOMAIN}/verifyemailreset?token=${hashedToken}"
        </p>`
      }`,
    };

    const mailRes = await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
};
