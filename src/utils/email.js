const nodemailer = require('nodemailer')
 const sendMail = async (to , OTP) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS_KEY,
        },
    });
    let mailOption = {
        from: process.env.USER_EMAIL,
        to: to,
        subject: "BlogSphere - OTP Verification",
        html: `
  <div style="
      width: 100%;
      background: #f4f4f4;
      padding: 40px 0;
      font-family: Arial, sans-serif;
  ">
    <div style="
        max-width: 500px;
        margin: auto;
        background: white;
        padding: 25px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    ">
      
      <h2 style="text-align:center; color:#4F46E5; margin-bottom: 10px;">
        <span style="font-size: 28px; font-weight: 700;">BlogSphere</span>
      </h2>

      <p style="font-size: 15px; color:#444;">
        Hi, your OTP for resetting the password is:
      </p>

      <div style="
          text-align:center;
          margin: 25px 0;
      ">
        <span style="
            font-size: 30px;
            font-weight: 700;
            letter-spacing: 5px;
            color: #4F46E5;
            background: #eef2ff;
            padding: 10px 20px;
            border-radius: 8px;
            display: inline-block;
        ">
          ${OTP}
        </span>
      </div>

      <p style="font-size: 14px; color:#555;">
        This OTP is valid for <b>2 minutes</b>.  
        Do not share it with anyone for security reasons.
      </p>

      <br/>

      <p style="font-size: 13px; color:#888; text-align:center;">
        © 2025 BlogSphere. All rights reserved.
      </p>

    </div>
  </div>
  `,
    };

    await transporter.sendMail(mailOption)
}
module.exports = {sendMail};