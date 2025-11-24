const nodemailer = require('nodemailer')

const sendMail = async (to, OTP) => {
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
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="width:100%; background:linear-gradient(135deg, #f5f3ff 0%, #e0e7ff 100%); padding:40px 0;">
        <div style="max-width:520px; margin:auto; background:#ffffff; padding:32px 28px; border-radius:16px; border:1px solid #e5e7eb; box-shadow:0 10px 25px -5px rgba(139, 92, 246, 0.1);">

            <!-- Header with Brand -->
            <div style="text-align:center; margin-bottom:25px;">
                <div style="display:inline-flex; align-items:center; gap:10px; padding:12px 24px; background:linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); border-radius:12px; color:#ffffff; font-weight:700; font-size:20px; margin-bottom:8px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;">
                        <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    BlogSphere
                </div>
                <p style="margin:8px 0 0; font-size:14px; color:#6b7280; font-weight:500;">
                    Account Security Verification
                </p>
            </div>

            <!-- Main Content -->
            <div style="background:#fafafa; border-radius:12px; padding:24px; border:1px solid #f1f5f9; margin-bottom:20px;">
                <h2 style="color:#374151; font-size:18px; font-weight:600; margin:0 0 16px 0;">
                    Password Reset Verification
                </h2>
                <p style="font-size:15px; color:#4b5563; line-height:1.6; margin:0;">
                    Hi there,
                    <br><br>
                    We received a request to reset your password. Use the verification code below to confirm your identity and proceed with creating a new password.
                </p>
            </div>

            <!-- OTP Section -->
            <div style="text-align:center; margin:32px 0;">
                <p style="font-size:14px; color:#6b7280; margin-bottom:12px; font-weight:500;">
                    Your verification code:
                </p>
                <div style="
                    font-size:42px;
                    font-weight:800;
                    letter-spacing:12px;
                    color:#ffffff;
                    padding:20px 32px;
                    background:linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
                    border-radius:16px;
                    border:1px solid #c4b5fd;
                    display:inline-block;
                    box-shadow:0 8px 20px -4px rgba(139, 92, 246, 0.3);
                    text-shadow:0 2px 4px rgba(0,0,0,0.1);
                ">
                    ${OTP}
                </div>
            </div>

            <!-- Security Info -->
            <div style="background:#fef7ff; border-radius:12px; padding:20px; border:1px solid #f3e8ff; margin-bottom:20px;">
                <div style="display:flex; align-items:flex-start; gap:12px;">
                    <div style="flex-shrink:0; width:20px; height:20px; background:#8b5cf6; border-radius:50%; display:flex; align-items:center; justify-content:center;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                            <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div>
                        <p style="font-size:14px; color:#7c3aed; font-weight:600; margin:0 0 4px 0;">
                            Security Notice
                        </p>
                        <p style="font-size:13px; color:#6b7280; line-height:1.5; margin:0;">
                            This code will expire in <strong>2 minutes</strong>. For your account's security, please do not share this code with anyone.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Additional Info -->
            <div style="background:#f8fafc; border-radius:8px; padding:16px; border:1px solid #e2e8f0;">
                <p style="font-size:13px; color:#64748b; line-height:1.5; margin:0; text-align:center;">
                    If you didn't request this password reset, you can safely ignore this email. 
                    Your account remains secure.
                </p>
            </div>

            <!-- Support Section -->
            <div style="margin-top:24px; text-align:center;">
                <p style="font-size:12px; color:#9ca3af; margin:0 0 8px 0;">
                    Need help? Contact our support team
                </p>
                <a href="mailto:support@blogsphere.com" style="color:#8b5cf6; text-decoration:none; font-size:12px; font-weight:500;">
                    support@blogsphere.com
                </a>
            </div>

            <!-- Footer -->
            <div style="margin-top:32px; padding-top:20px; text-align:center; border-top:1px solid #f1f5f9;">
                <p style="font-size:11px; color:#9ca3af; margin:0;">
                    © 2025 BlogSphere. All rights reserved.
                    <br>
                    <span style="color:#d1d5db;">Secure Email Service</span>
                </p>
            </div>

        </div>
    </div>
</body>
</html>
`
    };

    await transporter.sendMail(mailOption)
}

module.exports = { sendMail }