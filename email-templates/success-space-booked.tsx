import {
	REENITE_CONTACT_PHONE_NUMBER,
	REENITE_EMAIL_ADDRESS,
	REENITE_LOGO,
	REENITE_WEBSITE_URL,
	REENITE_WIFI_NAME,
	REENITE_WIFI_PASSWORD,
} from "@/constants";
import { formatDate, formatMoneyInput } from "@/lib/utils";

interface Props {
	bookingId: string;
	title: string;
	createdAt: string;
	startDate: string;
	endDate: string;
	totalAmount: string;
	address: string;
	city: string;
	state: string;
	country: string;
	id: string;
	name: string;
	noOfUsers: string;
}

export const SuccessSpaceBooked = ({
	bookingId,
	title,
	createdAt,
	startDate,
	endDate,
	totalAmount,
	address,
	city,
	state,
	country,
	id,
	name,
	noOfUsers,
}: Props) => {
	const year = new Date().getFullYear();
	return `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmed - Reenite</title>
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
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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
        
        .confirmation-badge {
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
            color: #1e40af;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .message-text {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .booking-card {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 2px solid #bfdbfe;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            position: relative;
        }
        
        .booking-card::before {
            content: "📅";
            position: absolute;
            top: -15px;
            left: 30px;
            background: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 20px;
        }
        
        .booking-header {
            text-align: center;
            margin-bottom: 25px;
        }
        
        .booking-id {
            font-size: 14px;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .space-name {
            font-size: 22px;
            font-weight: 700;
            color: #1e40af;
            margin-top: 5px;
        }
        
        .booking-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 25px;
        }
        
        .detail-card {
            background-color: white;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            text-align: center;
        }
        
        .detail-icon {
            font-size: 24px;
            margin-bottom: 8px;
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
        
        .price-summary {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .price-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 14px;
        }
        
        .price-row.total {
            border-top: 2px solid #e5e7eb;
            padding-top: 15px;
            margin-top: 15px;
            font-size: 18px;
            font-weight: 700;
            color: #1e40af;
        }
        
        .location-section {
            background-color: #f9fafb;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }
        
        .location-title {
            font-size: 18px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 15px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .location-title::before {
            content: "📍";
            margin-right: 10px;
            font-size: 20px;
        }
        
        .address {
            font-size: 16px;
            color: #4b5563;
            text-align: center;
            margin-bottom: 15px;
        }
        
        .directions-button {
            display: block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 14px;
            text-align: center;
            margin: 0 auto;
            width: fit-content;
            transition: transform 0.2s ease;
        }
        
        .directions-button:hover {
            transform: translateY(-1px);
        }
        
        .access-info {
            background-color: #fef3c7;
            border: 1px solid #fcd34d;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .access-info h3 {
            font-size: 16px;
            font-weight: 600;
            color: #92400e;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .access-info h3::before {
            content: "🔑";
            margin-right: 10px;
            font-size: 18px;
        }
        
        .access-item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            font-size: 14px;
            color: #78350f;
        }
        
        .access-item::before {
            content: "•";
            margin-right: 8px;
            font-weight: bold;
        }
        
        .contact-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 30px 0;
        }
        
        .contact-card {
            background-color: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }
        
        .contact-card h4 {
            font-size: 14px;
            font-weight: 600;
            color: #0c4a6e;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .contact-card p {
            font-size: 16px;
            font-weight: 600;
            color: #1e40af;
        }
        
        .contact-card a {
            color: #1e40af;
            text-decoration: none;
        }
        
        .contact-card a:hover {
            text-decoration: underline;
        }
        
        .cta-section {
            text-align: center;
            margin: 35px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
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
        
        .important-notes {
            background-color: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
        }
        
        .important-notes h3 {
            font-size: 16px;
            font-weight: 600;
            color: #dc2626;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .important-notes h3::before {
            content: "⚠️";
            margin-right: 10px;
            font-size: 18px;
        }
        
        .note-item {
            font-size: 14px;
            color: #7f1d1d;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
        }
        
        .note-item::before {
            content: "•";
            position: absolute;
            left: 0;
            font-weight: bold;
        }
        
        .calendar-section {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            text-align: center;
        }
        
        .calendar-section h3 {
            font-size: 16px;
            font-weight: 600;
            color: #475569;
            margin-bottom: 15px;
        }
        
        .calendar-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
        }
        
        .calendar-button {
            display: inline-flex;
            align-items: center;
            background-color: white;
            border: 1px solid #d1d5db;
            color: #374151;
            text-decoration: none;
            padding: 10px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.2s ease;
        }
        
        .calendar-button:hover {
            background-color: #f3f4f6;
        }
        
        .calendar-button::before {
            content: "📅";
            margin-right: 8px;
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
            
            .booking-details {
                grid-template-columns: 1fr;
            }
            
            .contact-section {
                grid-template-columns: 1fr;
            }
            
            .cta-button {
                display: block;
                margin: 10px 0;
            }
            
            .calendar-buttons {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo"><img src="https://res.cloudinary.com/dh0rc6p1c/image/upload/v1749562302/reenite/logo-full_c3oa7p.png" alt="Reenite full logo in it's blue color" class="group-hover:hidden w-[130px] md:w-[160px]" /></div>
            <div class="header-subtitle">Your Workspace is Reserved</div>
            <div class="confirmation-badge">✓ Booking Confirmed</div>
        </div>
        
        <div class="content">
            <h1 class="success-message">Your Booking is Confirmed!</h1>
            
            <p class="message-text">
                Great news, ${name}! Your workspace reservation has been successfully confirmed. 
                Here are all the details you need for your upcoming visit.
            </p>
            
            <div class="booking-card">
                <div class="booking-header">
                    <div class="booking-id">Booking #${bookingId}</div>
                    <div class="space-name">${title}</div>
                </div>
                
                <div class="booking-details">
                    <div class="detail-card">
                        <div class="detail-icon">📅</div>
                        <div class="detail-label">Date</div>
                        <div class="detail-value">${formatDate(createdAt)}</div>
                    </div>
                    
                    <div class="detail-card">
                        <div class="detail-icon">⏰</div>
                        <div class="detail-label">Duration</div>
                        <div class="detail-value">${startDate} - ${endDate}</div>
                    </div>
                    
                    <div class="detail-card">
                        <div class="detail-icon">👥</div>
                        <div class="detail-label">Number of users</div>
                        <div class="detail-value">${noOfUsers} people</div>
                    </div>
                </div>
                
                <div class="price-summary">
                    <div class="price-row total">
                        <span>Total Paid: </span>
                        <span>₦${formatMoneyInput(totalAmount)}</span>
                    </div>
                </div>
            </div>
            
            <div class="location-section">
                <h3 class="location-title">Location & Directions</h3>
                <div class="address">
                    ${address}<br>
                    ${city}, ${state}, ${country}
                </div>
            </div>
            
            <div class="access-info">
                <h3>Access Instructions</h3>
                <div class="access-item">WiFi: ${REENITE_WIFI_NAME} | Password: ${REENITE_WIFI_PASSWORD}</div>
            </div>
            
            <div class="contact-section">
              <div class="contact-card">
                    <h4>Reenite Support</h4>
                    <p><a href="tel:${REENITE_CONTACT_PHONE_NUMBER}">${REENITE_CONTACT_PHONE_NUMBER}</a></p>
                    <p><a href="mailto:${REENITE_EMAIL_ADDRESS}">Email Support</a></p>
                </div>
            </div>
            
            <div class="cta-section">
                <a href="${REENITE_WEBSITE_URL}/bookings/${id}" class="cta-button">View Booking</a>
            </div>
            
            <p style="text-align: center; color: #718096; font-size: 14px; margin-top: 30px;">
                Questions about your booking? We're here to help at 
                <a href="mailto:${REENITE_EMAIL_ADDRESS}" style="color: #3b82f6;">${REENITE_EMAIL_ADDRESS}</a>
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; ${year} Reenite. All rights reserved.</p>
            <p>Thank you for choosing Reenite for your workspace needs.</p>
            
            <div class="footer-links">
                <a href="${REENITE_WEBSITE_URL}/spaces">Browse Spaces</a>
                <a href="${REENITE_WEBSITE_URL}/dabookingsshboard">My Bookings</a>
                <a href="${REENITE_WEBSITE_URL}/help-center">Help Center</a>

            </div>
            
            <p style="margin-top: 20px; font-size: 12px; color: #718096;">
                You received this email because you made a booking with Reenite.<br>
                Booking confirmation emails are sent automatically and cannot be unsubscribed from.
            </p>
        </div>
    </div>
</body>
</html>
        `;
};
