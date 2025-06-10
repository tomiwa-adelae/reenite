import {
	REENITE_EMAIL_ADDRESS,
	REENITE_LOGO,
	REENITE_WEBSITE_URL,
} from "@/constants";
import { formatDate } from "@/lib/utils";

interface Props {
	title: string;
	spaceId: string;
	category: string;
	hourlyPricing: string;
	dailyPricing: string;
	weeklyPricing: string;
	monthlyPricing: string;
	address: string;
	city: string;
	state: string;
	country: string;
	createdAt: string;
	description: string;
	id: string;
	status: string;
}

export const NewSpaceEmail = ({
	title,
	spaceId,
	category,
	hourlyPricing,
	dailyPricing,
	weeklyPricing,
	monthlyPricing,
	address,
	city,
	state,
	country,
	createdAt,
	description,
	id,
	status,
}: Props) => {
	const year = new Date().getFullYear();
	return `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Space Successfully Created - Reenite Admin</title>
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
            max-width: 650px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
        
        .success-badge {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 600;
            margin-top: 15px;
            display: inline-block;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .success-message {
            font-size: 24px;
            font-weight: 600;
            color: #065f46;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .message-text {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .space-preview {
            background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
            border: 2px solid #d1fae5;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .space-preview h3 {
            font-size: 20px;
            font-weight: 700;
            color: #065f46;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .space-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .detail-item {
            background-color: white;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .detail-label {
            font-size: 12px;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        
        .detail-value {
            font-size: 16px;
            color: #111827;
            font-weight: 600;
        }
        
        .space-description {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .space-description h4 {
            font-size: 14px;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
        }
        
        .space-description p {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.6;
        }
        
        .amenities-section {
            background-color: #f9fafb;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .amenities-title {
            font-size: 16px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .amenities-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
        }
        
        .amenity-item {
            background-color: white;
            border-radius: 6px;
            padding: 10px 12px;
            font-size: 13px;
            color: #374151;
            text-align: center;
            border: 1px solid #e5e7eb;
        }
        
        .status-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .status-info {
            display: flex;
            align-items: center;
            justify-content: between;
        }
        
        .status-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: white;
            font-size: 18px;
        }
        
        .status-text {
            font-size: 16px;
            font-weight: 600;
            color: #0c4a6e;
        }
        
        .status-badge {
            background-color: #dbeafe;
            color: #1e40af;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .cta-section {
            text-align: center;
            margin: 35px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 0 10px 10px 0;
            transition: transform 0.2s ease;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
        }
        
        .cta-button.secondary {
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        }
        
        .next-steps {
            background-color: #fffbeb;
            border: 1px solid #fed7aa;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .next-steps h3 {
            font-size: 18px;
            font-weight: 600;
            color: #92400e;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .step-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
            padding: 10px 0;
        }
        
        .step-number {
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: white;
            font-size: 12px;
            font-weight: 600;
            flex-shrink: 0;
        }
        
        .step-text {
            font-size: 14px;
            color: #78350f;
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
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .space-details {
                grid-template-columns: 1fr;
            }
            
            .amenities-grid {
                grid-template-columns: 1fr;
            }
            
            .status-section {
                flex-direction: column;
                text-align: center;
            }
            
            .status-info {
                margin-bottom: 15px;
            }
            
            .cta-button {
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
            <div class="header-subtitle">Admin Dashboard</div>
            <div class="success-badge">✓ Space Created Successfully</div>
        </div>
        
        <div class="content">
            <h1 class="success-message">New Space Listed Successfully!</h1>
            
            <p class="message-text">
                Great news! Your new workspace has been successfully created and added to the Reenite platform. Here are the details of your newly listed space.
            </p>
            
            <div class="space-preview">
                <h3>${title}</h3>
                
                <div class="space-details">
                    <div class="detail-item">
                        <div class="detail-label">Space ID</div>
                        <div class="detail-value">#${spaceId}</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Category</div>
                        <div class="detail-value">${category}</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Hourly Rate</div>
                        <div class="detail-value">${hourlyPricing}/user</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Daily Rate</div>
                        <div class="detail-value">${dailyPricing}/user</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Weekly Rate</div>
                        <div class="detail-value">${weeklyPricing}/user</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Monthly Rate</div>
                        <div class="detail-value">${monthlyPricing}/user</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Location</div>
                        <div class="detail-value">${address}, ${city}, ${state}, ${country}</div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-label">Created</div>
                        <div class="detail-value">${formatDate(createdAt)}</div>
                    </div>
                </div>
                
                <div class="space-description">
                    <h4>Description</h4>
                    <p>${description}</p>
                </div>
            </div>
            
            <div class="status-section">
                <div class="status-info">
                    <div class="status-text">Space Visibility Status</div>
                </div>
                <div class="status-badge">${status}</div>
            </div>
            
            <div class="cta-section">
                <a href="${REENITE_WEBSITE_URL}/spaces/${id}" class="cta-button">View Space</a>
                <a href="${REENITE_WEBSITE_URL}/all-spaces/${id}" class="cta-button secondary">Edit Details</a>
            </div>
        </div>
        
        <div class="footer">
            <p>&copy; ${year} Reenite Admin Portal. All rights reserved.</p>
            <p>Empowering space owners to maximize their potential.</p>
            
            <div class="footer-links">
                <a href="${REENITE_WEBSITE_URL}/dashboard">Admin Dashboard</a>
            </div>
            
            <p style="margin-top: 20px; font-size: 12px; color: #718096;">
                You received this email because you created a new space listing on Reenite.<br>
                For support, contact us at ${REENITE_EMAIL_ADDRESS}
            </p>
        </div>
    </div>
</body>
</html>
        `;
};
