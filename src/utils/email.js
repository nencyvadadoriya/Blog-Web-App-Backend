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
  width:100%;
  background:#f8fafc;
  padding:40px 0;
  font-family: 'Arial', sans-serif;
">
  <div style="
    max-width:520px;
    margin:auto;
    background:#ffffff;
    padding:32px 28px;
    border-radius:14px;
    border:1px solid #e5e7eb;
  ">

    <!-- TOP BRAND STRIP -->
    <div style="text-align:center; margin-bottom:25px;">
      <div style="
        display:inline-block;
        padding:10px 22px;
        background:#eef2ff;
        border-radius:50px;
        color:#4F46E5;
        font-weight:700;
        font-size:20px;
      ">
        BlogSphere
      </div>
      <p style="margin:10px 0 0; font-size:14px; color:#6b7280;">
        Account Security Verification
      </p>
    </div>

    <!-- MAIN MESSAGE -->
    <p style="font-size:15px; color:#444; line-height:1.6;">
      Hi,
      <br/><br/>
      Use the verification code below to confirm your identity and continue
      with your password reset request.
    </p>

    <!-- OTP BOX -->
    <div style="text-align:center; margin:30px 0;">
      <div style="
        font-size:36px;
        font-weight:800;
        letter-spacing:10px;
        color:#1e3a8a;
        padding:18px 28px;
        background:#f0f4ff;
        border-radius:12px;
        border:1px solid #c7d2fe;
        display:inline-block;
      ">
        ${OTP}
      </div>
    </div>

    <!-- INFO TEXT -->
    <p style="font-size:14px; color:#555; line-height:1.6;">
      This code is valid for <b>2 minutes</b>.  
      For your safety, do not share it with anyone.
    </p>

    <!-- SUPPORT LINE -->
    <p style="
      font-size:13px; 
      color:#7c7c7c; 
      margin-top:25px;
      line-height:1.6;
    ">
      If you did not request this, you can safely ignore this email or contact
      our support team if you have concerns.
    </p>

    <!-- FOOTER -->
    <div style="
      margin-top:30px;
      padding-top:18px;
      text-align:center;
      border-top:1px solid #eee;
    ">
      <p style="font-size:12px; color:#9ca3af;">
        © 2025 BlogSphere • Secure Mail Service
      </p>
    </div>

  </div>
</div>
`

    };

    await transporter.sendMail(mailOption)
}
module.exports = {sendMail};