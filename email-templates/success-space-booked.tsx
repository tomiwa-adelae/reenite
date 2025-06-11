import {
	REENITE_CONTACT_PHONE_NUMBER,
	REENITE_EMAIL_ADDRESS,
	REENITE_WEBSITE_URL,
	REENITE_WIFI_NAME,
	REENITE_WIFI_PASSWORD,
} from "@/constants";
import { formatDate, formatMoneyInput } from "@/lib/utils";

export const SuccessUserSpaceBooked = ({
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
				background: linear-gradient(135deg, #1a2142 0%, #4f46e5 100%);
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
				background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
				opacity: 0.3;
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

			a{
				color: #ffffff;
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
					<h1>Booking Confirmed!</h1>
					<h2>Hello ${name},</h2>
				</div>

				<p class="intro-text">
					Thank you for your booking! Your workspace reservation has
					been successfully confirmed. Here are the details you need
					for your upcoming visit:
				</p>

				<div class="booking-card">
					<p class="booking-id">Booking #${bookingId}</p>
					<h3 class="workspace-name">${spaceTitle}</h3>

					<div class="booking-details">
						<div class="detail-item">
							<span class="detail-value">Date booked: ${formatDate(createdAt)}</span>
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
						<p class="total-amount">₦${formatMoneyInput(totalAmount)}</p>
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
							Access Instructions
						</h4>
						<p><strong>WiFi Name:</strong> ${REENITE_WIFI_NAME}</p>
						<p><strong>WiFi Password:</strong> ${REENITE_WIFI_PASSWORD}</p>
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
					Questions about your booking? We're here to help at
					<strong>${REENITE_EMAIL_ADDRESS}</strong>
				</p>

				<p class="support-text">
					You can view or manage this booking in your
					<a href="${REENITE_WEBSITE_URL}/bookings/${id}" class="dashboard-link"
						>dashboard</a
					>.
				</p>

				<p class="closing-text">We look forward to seeing you!</p>

				<div class="footer">
					<p>&copy; ${year} Reenite. All rights reserved.</p>
				</div>
			</div>
		</div>
	</body>
</html>

        `;
};

export const SuccessSpaceAdminBooking = ({
	createdAt,
	bookingId,
	bookingStatus,
	spaceTitle,
	name,
	email,
	phoneNumber,
	company,
	startDate,
	endDate,
	noOfUsers,
	address,
	city,
	state,
	country,
	totalAmount,
	transactionId,
	id,
	customerId,
}: {
	createdAt: string;
	bookingId: string;
	bookingStatus: string;
	spaceTitle: string;
	name: string;
	email: string;
	phoneNumber: string;
	company: string;
	startDate: string;
	endDate: string;
	noOfUsers: string;
	address: string;
	city: string;
	state: string;
	country: string;
	totalAmount: string;
	transactionId: string;
	id: string;
	customerId: string;
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
		<title>New Booking Alert - Reenite Admin</title>
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
				background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
				min-height: 100vh;
			}

			.email-container {
				max-width: 700px;
				margin: 0 auto;
				background: white;
				border-radius: 16px;
				box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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

			.alert-badge {
				background: rgba(255, 255, 255, 0.2);
				color: white;
				padding: 0.5rem 1rem;
				border-radius: 50px;
				font-size: 0.9rem;
				font-weight: 600;
				margin-top: 1rem;
				display: inline-block;
				position: relative;
				z-index: 1;
			}

			.notification-icon {
				width: 60px;
				height: 60px;
				background: rgba(255, 255, 255, 0.15);
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 1rem auto 0;
				position: relative;
				z-index: 1;
			}

			.bell-icon {
				width: 24px;
				height: 24px;
				color: white;
			}

			.main-content {
				padding: 2.5rem;
			}

			.alert-header {
				text-align: center;
				margin-bottom: 2rem;
			}

			.alert-header h1 {
				font-size: 2.2rem;
				font-weight: 700;
				color: #dc2626;
				margin: 0 0 0.5rem 0;
			}

			.alert-header .timestamp {
				font-size: 1rem;
				color: #6b7280;
				font-weight: 500;
			}

			.priority-banner {
				background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
				border-left: 4px solid #f59e0b;
				padding: 1rem 1.5rem;
				border-radius: 0 8px 8px 0;
				margin-bottom: 2rem;
				display: flex;
				align-items: center;
				gap: 0.75rem;
			}

			.priority-icon {
				width: 20px;
				height: 20px;
				color: #d97706;
			}

			.priority-text {
				color: #92400e;
				font-weight: 600;
				margin: 0;
			}

			.booking-overview {
				background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
				border: 2px solid #e2e8f0;
				border-radius: 12px;
				padding: 2rem;
				margin-bottom: 2rem;
				position: relative;
				overflow: hidden;
			}

			.booking-overview::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				height: 4px;
				background: linear-gradient(90deg, #dc2626, #f59e0b, #059669);
			}

			.booking-header {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				margin-bottom: 1.5rem;
			}

			.booking-id {
				font-size: 1rem;
				color: #6b7280;
				font-weight: 600;
				background: white;
				padding: 0.5rem 1rem;
				border-radius: 6px;
				border: 1px solid #e5e7eb;
			}

			.booking-status {
				background: #dcfce7;
				color: #166534;
				padding: 0.5rem 1rem;
				border-radius: 6px;
				font-size: 0.9rem;
				font-weight: 600;
			}

			.workspace-name {
				font-size: 1.8rem;
				font-weight: 700;
				color: #1f2937;
				margin: 0 0 1.5rem 0;
			}

			.customer-info {
				background: white;
				border: 1px solid #e5e7eb;
				border-radius: 8px;
				padding: 1.5rem;
				margin-bottom: 2rem;
			}

			.customer-info h3 {
				font-size: 1.2rem;
				font-weight: 700;
				color: #1f2937;
				margin: 0 0 1rem 0;
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}

			.customer-details {
				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 1rem;
			}

			.customer-item {
				display: flex;
				flex-direction: column;
			}

			.customer-label {
				font-size: 0.85rem;
				color: #6b7280;
				font-weight: 600;
				text-transform: uppercase;
				letter-spacing: 0.5px;
				margin-bottom: 0.25rem;
			}

			.customer-value {
				font-size: 1rem;
				color: #1f2937;
				font-weight: 600;
				margin: 0;
			}

			.booking-details {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
				gap: 1.5rem;
				margin-bottom: 2rem;
			}

			.detail-card {
				background: white;
				border: 1px solid #e5e7eb;
				border-radius: 8px;
				padding: 1.5rem;
				transition: all 0.3s ease;
			}

			.detail-card:hover {
				border-color: #dc2626;
				transform: translateY(-2px);
				box-shadow: 0 8px 25px rgba(220, 38, 38, 0.15);
			}

			.detail-card h4 {
				font-size: 1rem;
				font-weight: 700;
				color: #1f2937;
				margin: 0 0 1rem 0;
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}

			.detail-card p {
				color: #4b5563;
				margin: 0.5rem 0;
				font-weight: 500;
			}

			.detail-card .highlight {
				color: #1f2937;
				font-weight: 700;
			}

			.financial-summary {
				background: linear-gradient(135deg, #f0f9f4 0%, #dcfce7 100%);
				border: 2px solid #bbf7d0;
				border-radius: 12px;
				padding: 2rem;
				text-align: center;
				margin-bottom: 2rem;
			}

			.financial-summary h3 {
				font-size: 1.2rem;
				color: #166534;
				margin: 0 0 1rem 0;
				font-weight: 600;
			}

			.total-amount {
				font-size: 2.5rem;
				font-weight: 800;
				color: #059669;
				margin: 0;
			}

			.payment-method {
				font-size: 0.9rem;
				color: #166534;
				margin-top: 0.5rem;
				font-weight: 500;
			}

			.action-buttons {
				display: flex;
				gap: 1rem;
				justify-content: center;
				margin: 2rem 0;
				flex-wrap: wrap;
			}

			.action-btn {
				padding: 0.75rem 2rem;
				border: none;
				border-radius: 8px;
				font-size: 1rem;
				font-weight: 600;
				cursor: pointer;
				text-decoration: none;
				display: inline-block;
				transition: all 0.3s ease;
			}

			.btn-primary {
				background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
				color: white;
				box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
			}

			.btn-primary:hover {
				transform: translateY(-2px);
				box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
			}

			.btn-secondary {
				background: white;
				color: #1f2937;
				border: 2px solid #e5e7eb;
			}

			.btn-secondary:hover {
				border-color: #9ca3af;
				transform: translateY(-1px);
			}

			.admin-notes {
				background: #fef9e7;
				border-left: 4px solid #f59e0b;
				padding: 1.5rem;
				border-radius: 0 8px 8px 0;
				margin-bottom: 2rem;
			}

			.admin-notes h4 {
				color: #92400e;
				font-size: 1.1rem;
				margin: 0 0 0.5rem 0;
				font-weight: 700;
			}

			.admin-notes p {
				color: #78350f;
				margin: 0;
				font-style: italic;
			}

			.footer {
				text-align: center;
				color: #9ca3af;
				font-size: 0.9rem;
				margin-top: 2rem;
				padding-top: 2rem;
				border-top: 1px solid #e5e7eb;
			}

			.quick-stats {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
				gap: 1rem;
				margin-bottom: 2rem;
			}

			.stat-item {
				background: white;
				border: 1px solid #e5e7eb;
				border-radius: 8px;
				padding: 1rem;
				text-align: center;
			}

			.stat-number {
				font-size: 1.5rem;
				font-weight: 800;
				color: #dc2626;
				margin: 0;
			}

			.stat-label {
				font-size: 0.8rem;
				color: #6b7280;
				text-transform: uppercase;
				letter-spacing: 0.5px;
				margin: 0.25rem 0 0 0;
			}

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

				.alert-header h1 {
					font-size: 1.8rem;
				}

				.booking-header {
					flex-direction: column;
					gap: 1rem;
				}

				.customer-details {
					grid-template-columns: 1fr;
				}

				.action-buttons {
					flex-direction: column;
				}
			}
		</style>
	</head>
	<body>
		<div class="email-container">
			<div class="header">
				<h2 class='logo'>Reenite</h2>
				<div class="alert-badge">BOOKING ALERT</div>
			</div>

			<div class="main-content">
				<div class="alert-header">
					<h1>New Booking Received</h1>
					<p class="timestamp">${formatDate(createdAt)}</p>
				</div>

				<div class="priority-banner">
					<svg
						class="priority-icon"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						></path>
					</svg>
					<p class="priority-text">
						Action Required: New workspace booking needs
						confirmation
					</p>
				</div>

				<div class="booking-overview">
					<div class="booking-header">
						<span class="booking-id">Booking #${bookingId}</span>
						<span class="booking-status">${bookingStatus}</span>
					</div>
					<h2 class="workspace-name">${spaceTitle}</h2>
				</div>

				<div class="customer-info">
					<h3>
						<svg
							class="icon"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fill-rule="evenodd"
								d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
								clip-rule="evenodd"
							></path>
						</svg>
						Customer Information
					</h3>
					<div class="customer-details">
						<div class="customer-item">
							<span class="customer-value">Customer Name: ${name}</span>
						</div>
						<div class="customer-item">
							<span class="customer-value">Email Address: ${email}</span>
						</div>
						<div class="customer-item">
							<span class="customer-value">Phone Number: ${phoneNumber}</span>
						</div>
						<div class="customer-item">
							<span class="customer-value">Company: ${company}</span>
						</div>
					</div>
				</div>

				<div class="booking-details">
					<div class="detail-card">
						<h4>
							<svg
								class="icon"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
									clip-rule="evenodd"
								></path>
							</svg>
							Booking Period
						</h4>
						<p><strong>Start:</strong> ${startDate}</p>
						<p><strong>End:</strong> ${endDate}</p>
					</div>

					<div class="detail-card">
						<h4>
							<svg
								class="icon"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
									clip-rule="evenodd"
								></path>
							</svg>
							Capacity Details
						</h4>
						<p><strong>Booked for:</strong> ${noOfUsers} people</p>
					</div>

					<div class="detail-card">
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
							Location
						</h4>
						<p><strong>Address:</strong> ${address}, ${city}, ${state}, ${country}</p>
					</div>
				</div>

				<div class="financial-summary">
					<h3>Payment Summary</h3>
					<p class="total-amount">₦${formatMoneyInput(totalAmount)}</p>
					<p class="payment-method">
						Paid via Paystack - Transaction ID:
						${transactionId}
					</p>
				</div>
				<div class="action-buttons">
					<a
						href="${REENITE_WEBSITE_URL}/all-bookings/${id}"
						class="action-btn btn-primary"
					>
						Manage Booking
					</a>
					<a
						href="${REENITE_WEBSITE_URL}/all-users/${customerId}"
						class="action-btn btn-secondary"
					>
						View Customer
					</a>
				</div>

				<div class="footer">
					<p>
						This is an automated notification from the Reenite
						booking system.
					</p>
					<p>&copy; ${year} Reenite. All rights reserved.</p>
				</div>
			</div>
		</div>
	</body>
</html>

        `;
};
