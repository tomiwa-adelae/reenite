import {
	REENITE_EMAIL_ADDRESS,
	REENITE_FACEBOOK_URL,
	REENITE_INSTAGRAM_URL,
	REENITE_LINKEDIN_URL,
	REENITE_LOGO,
	REENITE_TWITTER_URL,
	REENITE_WEBSITE_URL,
} from "@/constants";
import { formatDate } from "@/lib/utils";

export const AccountCreationEmail = ({
	name,
	email,
}: // createdAt,
// userId,
{
	name: string;
	email: string;
	// createdAt: string;
	// userId: string;
}) => {
	const year = new Date().getFullYear();
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Reenite - Account Created Successfully</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .logo {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 10px;
            letter-spacing: -1px;
        }
        
        .header-subtitle {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .welcome-message {
            font-size: 24px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .user-name {
            color: #667eea;
        }
        
        .message-text {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .features-section {
            background-color: #f7fafc;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .features-title {
            font-size: 18px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 10px 0;
        }
        
        .feature-icon {
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: white;
            font-size: 12px;
            flex-shrink: 0;
        }
        
        .feature-text {
            font-size: 14px;
            color: #4a5568;
        }
        
        .cta-section {
            text-align: center;
            margin: 30px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
        }
        
        .account-details {
            background-color: #edf2f7;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }
        
        .account-details h3 {
            font-size: 16px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 15px;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
        }
        
        .detail-label {
            color: #718096;
            font-weight: 500;
        }
        
        .detail-value {
            color: #2d3748;
            font-weight: 600;
        }
        
        .footer {
            background-color: #2d3748;
            color: #a0aec0;
            padding: 30px;
            text-align: center;
            font-size: 14px;
        }
        
        .footer-links {
            margin-top: 20px;
        }
        
        .footer-links a {
            color: #81e6d9;
            text-decoration: none;
            margin: 0 15px;
        }
        
        .footer-links a:hover {
            text-decoration: underline;
        }
        
        .social-links {
            margin-top: 20px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #81e6d9;
            text-decoration: none;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .header {
                padding: 25px 15px;
            }
            
            .logo {
                font-size: 28px;
            }
            
            .welcome-message {
                font-size: 20px;
            }
            
            .footer {
                padding: 25px 15px;
            }
            
            .footer-links a {
                display: block;
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo"><img src="${REENITE_LOGO}" alt="Reenite full logo in it's blue color" class="group-hover:hidden w-[130px] md:w-[160px]" /></div>
            <div class="header-subtitle">Premium Co-working Spaces</div>
        </div>
        
        <div class="content">
            <h1 class="welcome-message">Welcome, <span class="user-name">${name}!</span></h1>
            
            <p class="message-text">
                Your Reenite account has been successfully created. You're now part of a community that values productivity, collaboration, and premium workspace experiences.
            </p>
            
            <div class="cta-section">
                <a href="${REENITE_WEBSITE_URL}/spaces" class="cta-button">Explore Workspaces</a>
            </div>
            
            <div class="account-details">
                <h3>Your Account Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${email}</span>
                </div>
            </div>
            
            <div class="features-section">
                <h2 class="features-title">What You Can Do Next</h2>
                
                <div class="feature-item">
                    <div class="feature-icon">🏢</div>
                    <div class="feature-text">
                        <strong>Browse Premium Spaces:</strong> Discover co-working spaces tailored to your needs and location preferences.
                    </div>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">📅</div>
                    <div class="feature-text">
                        <strong>Book Instantly:</strong> Reserve desks, meeting rooms, and private offices with just a few clicks.
                    </div>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">💼</div>
                    <div class="feature-text">
                        <strong>Manage Bookings:</strong> View, modify, or cancel your reservations from your personal dashboard.
                    </div>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">🤝</div>
                    <div class="feature-text">
                        <strong>Connect & Network:</strong> Join a community of like-minded professionals and entrepreneurs.
                    </div>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">⭐</div>
                    <div class="feature-text">
                        <strong>Rate & Review:</strong> Share your experiences and help others find the perfect workspace.
                    </div>
                </div>
            </div>
            
            <p style="text-align: center; color: #718096; font-size: 14px; margin-top: 30px;">
                Need help getting started? Our support team is here to assist you at 
                <a href="mailto:${REENITE_EMAIL_ADDRESS}" style="color: #667eea;">${REENITE_EMAIL_ADDRESS}</a>
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; ${year} Reenite. All rights reserved.</p>
            <p>Transforming the way you work, one space at a time.</p>
            
            <div class="footer-links">
                <a href="${REENITE_WEBSITE_URL}">Visit Website</a>
                <a href="${REENITE_WEBSITE_URL}/help-center">Help Center</a>
                <a href="${REENITE_WEBSITE_URL}/privacy-policy">Privacy Policy</a>
                <a href="${REENITE_WEBSITE_URL}/terms-of-services">Terms of Service</a>
            </div>
            
            <div class="social-links">
                <a href="${REENITE_FACEBOOK_URL}">Facebook</a>
                <a href="${REENITE_TWITTER_URL}">Twitter</a>
                <a href="${REENITE_LINKEDIN_URL}">LinkedIn</a>
                <a href="${REENITE_INSTAGRAM_URL}">Instagram</a>
            </div>
            
            <p style="margin-top: 20px; font-size: 12px; color: #718096;">
                You received this email because you created an account with Reenite.<br>
                If you have any questions, please contact us at ${REENITE_EMAIL_ADDRESS}
            </p>
        </div>
    </div>
</body>
</html>`;
};
