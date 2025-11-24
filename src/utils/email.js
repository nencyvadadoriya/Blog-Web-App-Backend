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
        from: `"BlogSphere Security" <${process.env.USER_EMAIL}>`,
        to: to,
        subject: "Action Required: Verify Your Identity - BlogSphere",
        html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    </style>
</head>
<body style="margin:0; padding:0; background:#fafbfc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
    <div style="width:100%; min-height:100vh; padding:60px 20px;">
        <!-- Main Container -->
        <div style="max-width:480px; margin:0 auto; background:#ffffff; border-radius:12px; border:1px solid #e1e5e9; box-shadow:0 4px 24px rgba(0,0,0,0.08); overflow:hidden;">
            
            <!-- Security Header -->
            <div style="background:linear-gradient(135deg, #1a1f36 0%, #2d3748 100%); padding:32px 40px; text-align:center;">
                <div style="display:inline-flex; align-items:center; gap:12px; background:rgba(255,255,255,0.12); padding:12px 20px; border-radius:8px; backdrop-filter:blur(10px);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="flex-shrink:0;">
                        <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
                        <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span style="color:white; font-size:16px; font-weight:600; letter-spacing:-0.2px;">Identity Verification Required</span>
                </div>
            </div>

            <!-- Content Area -->
            <div style="padding:40px;">
                <!-- Brand Logo -->
                <div style="text-align:center; margin-bottom:32px;">
                    <div style="display:inline-flex; align-items:center; gap:8px; color:#1a1f36; font-size:24px; font-weight:700; letter-spacing:-0.5px;">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        BlogSphere
                    </div>
                </div>

                <!-- Main Message -->
                <div style="margin-bottom:32px;">
                    <h1 style="color:#1a1f36; font-size:20px; font-weight:600; margin:0 0 16px 0; line-height:1.4;">
                        Password Reset Verification Code
                    </h1>
                    <p style="color:#4a5568; font-size:15px; line-height:1.6; margin:0;">
                        You've requested to reset your password for your BlogSphere account. 
                        To complete this process, please use the verification code below:
                    </p>
                </div>

                <!-- OTP Code -->
                <div style="background:#f7fafc; border:1px solid #e2e8f0; border-radius:12px; padding:32px; text-align:center; margin-bottom:32px;">
                    <div style="font-size:48px; font-weight:700; letter-spacing:8px; color:#1a1f36; line-height:1; margin-bottom:8px;">
                        ${OTP}
                    </div>
                    <div style="font-size:14px; color:#718096; font-weight:500;">
                        VERIFICATION CODE
                    </div>
                </div>

                <!-- Security Alert -->
                <div style="background:#fff5f5; border:1px solid #fed7d7; border-radius:8px; padding:20px; margin-bottom:24px;">
                    <div style="display:flex; align-items:flex-start; gap:12px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#e53e3e">
                            <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.5322 19 5.07183 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div>
                            <p style="color:#c53030; font-size:14px; font-weight:600; margin:0 0 4px 0;">
                                Security Advisory
                            </p>
                            <p style="color:#744210; font-size:13px; line-height:1.5; margin:0;">
                                This code expires in 2 minutes. Do not share this code with anyone. 
                                BlogSphere employees will never ask for your verification code.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Additional Information -->
                <div style="border-top:1px solid #e2e8f0; padding-top:24px;">
                    <p style="color:#718096; font-size:13px; line-height:1.5; margin:0;">
                        If you didn't request this password reset, please secure your account by:
                    </p>
                    <ul style="color:#718096; font-size:13px; line-height:1.5; margin:12px 0 0 0; padding-left:20px;">
                        <li>Ignoring this email</li>
                        <li>Reviewing your account security settings</li>
                        <li>Contacting our support team immediately</li>
                    </ul>
                </div>
            </div>

            <!-- Footer -->
            <div style="background:#f7fafc; border-top:1px solid #e2e8f0; padding:24px 40px;">
                <div style="text-align:center;">
                    <p style="color:#718096; font-size:12px; margin:0 0 8px 0;">
                        Need immediate assistance?
                    </p>
                    <a href="mailto:security@blogsphere.com" style="color:#2d3748; font-size:13px; font-weight:600; text-decoration:none;">
                        security@blogsphere.com
                    </a>
                    <div style="margin-top:16px; padding-top:16px; border-top:1px solid #e2e8f0;">
                        <p style="color:#a0aec0; font-size:11px; margin:0;">
                            © 2025 BlogSphere, Inc. • 123 Tech Park, San Francisco, CA 94107
                            <br>
                            This is an automated security message. Please do not reply.
                        </p>
                    </div>
                </div>
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