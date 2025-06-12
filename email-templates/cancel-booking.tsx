import {
	REENITE_CONTACT_PHONE_NUMBER,
	REENITE_EMAIL_ADDRESS,
	REENITE_WEBSITE_URL,
	REENITE_WIFI_NAME,
	REENITE_WIFI_PASSWORD,
} from "@/constants";
import { formatDate, formatMoneyInput } from "@/lib/utils";

export const CancelBooking = ({
	bookingId,
	spaceTitle,
	createdAt,
	startDate,
	endDate,
	noOfUsers,
	totalAmount,
	address,
	city,
	state,
	country,
	name,
	id,
}: {
	bookingId: string;
	spaceTitle: string;
	createdAt: string;
	startDate: string;
	endDate: string;
	noOfUsers: string;
	totalAmount: string;
	address: string;
	city: string;
	state: string;
	country: string;
	id: string;
	name: string;
}) => {
	const year = new Date().getFullYear();
	return `
            <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
            rel="stylesheet"
        />
        <title>Booking Confirmed - Reenite</title>
        <style>
            * {
                box-sizing: border-box;
            }

            html {
                padding: 0;
                margin: 0;
            }

            body {
                font-family: "DM Sans", sans-serif;
                font-optical-sizing: auto;
                font-weight: 400;
                font-style: normal;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%);
                min-height: 100vh;
            }

            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }

           .header {
				background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
				padding: 2rem;
				text-align: center;
				position: relative;
			}

           .header::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="admin-grid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23admin-grid)"/></svg>');
				opacity: 0.4;
			}

			.logo {
				font-size: 3rem;
				font-weight: 600;
				color: #ffffff;
			}

            .success-icon {
                width: 60px;
                height: 60px;
                background: rgba(34, 197, 94, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 1.5rem auto 0;
                position: relative;
                z-index: 1;
            }

            .checkmark {
                width: 24px;
                height: 24px;
                color: #22c55e;
            }

            .main-content {
                padding: 2.5rem;
            }

            .greeting {
                text-align: center;
                margin-bottom: 2rem;
            }

            .greeting h1 {
                font-size: 2.5rem;
                font-weight: 700;
                color: #1f2937;
                margin: 0 0 0.5rem 0;
                background: linear-gradient(135deg, #2b4eff, #7c3aed);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .greeting h2 {
                font-size: 1.25rem;
                font-weight: 500;
                color: #6b7280;
                margin: 0;
            }

            .intro-text {
                color: #4b5563;
                font-size: 1.1rem;
                line-height: 1.6;
                text-align: center;
                margin-bottom: 2.5rem;
            }

            .booking-card {
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 2rem;
                margin-bottom: 2rem;
                position: relative;
                overflow: hidden;
            }

            .booking-card::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #2b4eff, #7c3aed, #ec4899);
            }

            .booking-id {
                font-size: 0.9rem;
                color: #6b7280;
                margin-bottom: 0.5rem;
                font-weight: 500;
            }

            .workspace-name {
                font-size: 1.8rem;
                font-weight: 700;
                color: #1f2937;
                margin: 0 0 1.5rem 0;
            }

            .booking-details {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1.5rem;
                margin-bottom: 1.5rem;
            }

            .detail-item {
                display: flex;
                flex-direction: column;
            }

            .detail-label {
                font-size: 0.85rem;
                color: #6b7280;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 0.25rem;
            }

            .detail-value {
                font-size: 1rem;
                color: #1f2937;
                font-weight: 600;
                margin: 0;
            }

            .total-section {
                text-align: center;
                background: white;
                padding: 1.5rem;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
            }

            .total-label {
                font-size: 0.9rem;
                color: #6b7280;
                margin-bottom: 0.25rem;
            }

            .total-amount {
                font-size: 2rem;
                font-weight: 800;
                color: #059669;
                margin: 0;
            }

            .info-sections {
                display: grid;
                grid-template-columns: 1fr;
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .info-card {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 1.5rem;
                transition: all 0.3s ease;
            }

            .info-card:hover {
                border-color: #2b4eff;
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(43, 79, 255, 0.15);
            }

            .info-card h4 {
                font-size: 1.1rem;
                font-weight: 700;
                color: #1f2937;
                margin: 0 0 1rem 0;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .info-card p {
                color: #4b5563;
                margin: 0.5rem 0;
                font-weight: 500;
            }

            .cta-section {
                text-align: center;
                margin: 2.5rem 0;
            }

            .view-booking-btn {
                background: #1A2142;
                color: white;
                border: none;
                padding: 1rem 2.5rem;
                font-size: 1.1rem;
                font-weight: 600;
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-block;
                box-shadow: 0 4px 15px rgba(43, 79, 255, 0.3);
            }

            .view-booking-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(43, 79, 255, 0.4);
            }

            .support-text {
                text-align: center;
                color: #6b7280;
                font-size: 1rem;
                line-height: 1.6;
                margin-bottom: 1rem;
            }

            .dashboard-link {
                color: #2b4eff;
                text-decoration: none;
                font-weight: 600;
                border-bottom: 2px solid transparent;
                transition: border-color 0.3s ease;
            }

            .dashboard-link:hover {
                border-bottom-color: #2b4eff;
            }

            .closing-text {
                text-align: center;
                color: #1f2937;
                font-size: 1.1rem;
                font-weight: 600;
                margin: 2rem 0;
            }

            .footer {
                text-align: center;
                color: #9ca3af;
                font-size: 0.9rem;
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 1px solid #e5e7eb;
            }

            /* Icons */
            .icon {
                width: 16px;
                height: 16px;
                display: inline-block;
            }

            @media (max-width: 640px) {
                body {
                    padding: 10px;
                }

                .main-content {
                    padding: 1.5rem;
                }

                .greeting h1 {
                    font-size: 2rem;
                }

                .booking-details {
                    grid-template-columns: 1fr;
                }

                .booking-card {
                    padding: 1.5rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h2 class='logo'>Reenite</h2>
            </div>

            <div class="main-content">
                <div class="greeting">
                    <h1>Booking Cancelled!</h1>
                    <h2>Hello ${name},</h2>
                </div>

                <p class="intro-text">
                   We’ve received your request to cancel the booking. Here are the details of the cancelled reservation:
                </p>

                <div class="booking-card">
                    <p class="booking-id">Booking #${bookingId}</p>
                    <h3 class="workspace-name">${spaceTitle}</h3>

                    <div class="booking-details">
                        <div class="detail-item">
                            <span class="detail-value">Date booked: ${formatDate(
								createdAt
							)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-value">Duration: ${startDate} - ${endDate}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-value">Number of users: ${noOfUsers} people</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-value">Location: ${address}, ${city}, ${state}, ${country}</span>
                        </div>
                    </div>

                    <div class="total-section">
                        <p class="total-label">Total Paid</p>
                        <p class="total-amount">₦${formatMoneyInput(
							totalAmount
						)}</p>
                    </div>
                </div>

                <div class="info-sections">
                    <div class="info-card">
                        <h4>
                            <svg
                                class="icon"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            Location & Directions
                        </h4>
                        <p>${address}, ${city}, ${state}, ${country}</p>
                    </div>

                    <div class="info-card">
                        <h4>
                            <svg
                                class="icon"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-4 4-4-4 4-4 .257.257A6 6 0 1118 8zm-6-2a1 1 0 11-2 0 1 1 0 012 0z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            Payment refund
                        </h4>
                            <p style="margin-top: 20px;">If you’re eligible for a refund, it will be processed within the next 5–7 business days depending on your payment method.</p>

                    </div>

                    <div class="info-card">
                        <h4>
                            <svg
                                class="icon"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                                ></path>
                            </svg>
                            Reenite Support
                        </h4>
                        <p><strong>Phone:</strong> ${REENITE_CONTACT_PHONE_NUMBER}</p>
                        <p><strong>Email:</strong> ${REENITE_EMAIL_ADDRESS}</p>
                    </div>
                </div>

                <div class="cta-section">
                    <a href="${REENITE_WEBSITE_URL}/bookings/${id}" class="view-booking-btn"
                        >View Booking Details</a
                    >
                </div>

                <p class="support-text">
                    If this was a mistake or you need further help, contact support via
                    <strong>${REENITE_EMAIL_ADDRESS}</strong>
                </p>

                <p class="closing-text">We look forward to seeing you again!</p>

                <div class="footer">
                    <p>&copy; ${year} Reenite. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
</html>

        `;
};
