import {
	Facebook,
	Instagram,
	Twitter,
	Wifi,
	Monitor,
	Presentation,
	FolderKanban,
	Coffee,
	QrCode,
	CircleUser,
	FolderClock,
	Settings,
	CircleHelp,
	Info,
	LayoutDashboard,
	HousePlus,
	House,
	Folder,
	Users,
	Car,
	CookingPot,
	Snowflake,
	Printer,
	Shield,
	Phone,
	Video,
	Lightbulb,
} from "lucide-react";
import * as Icons from "lucide-react";

export const navLinks = [
	{
		slug: "/spaces",
		label: "Book Space",
	},
	{
		slug: "/",
		label: "Blogs",
	},
	{
		slug: "/about",
		label: "About us",
	},
	{
		slug: "/support",
		label: "Support",
	},
];

export const socialLinks = [
	{
		name: "X",
		icon: Twitter,
		slug: "www.twitter.com",
	},
	{
		name: "Instagram",
		icon: Facebook,
		slug: "www.facebook.com",
	},
	{
		name: "Instagram",
		icon: Instagram,
		slug: "www.instagram.com",
	},
];

export const SHOWCASE_VIDEO_URL =
	"https://res.cloudinary.com/dh0rc6p1c/video/upload/v1748267168/reenite/3248997-uhd_3840_2160_25fps_nqpaqm.mp4";

export const footerDetails = [
	{
		title: "Quick links",
		links: [
			{
				slug: "/",
				label: "Home",
			},
			{
				slug: "/spaces",
				label: "Book a Space",
			},
			{
				slug: "/about",
				label: "About us",
			},
			{
				slug: "/contact",
				label: "Contact",
			},
		],
	},
	{
		title: "Legal",
		links: [
			{
				slug: "/terms-of-use",
				label: "Terms of Use",
			},
			{
				slug: "/privacy-policy",
				label: "Privacy Policy",
			},
			{
				slug: "/cancellation-policy",
				label: "Cancellation Policy",
			},
		],
	},
];

export const galleryImages = [
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744575017/innovation/WhatsApp_Image_2025-04-13_at_8.37.44_PM_1_g5zsrt.jpg",
	},
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744575017/innovation/WhatsApp_Image_2025-04-13_at_8.37.47_PM_awa1ja.jpg",
	},
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744575016/innovation/WhatsApp_Image_2025-04-13_at_8.37.45_PM_1_piginm.jpg",
	},
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744307822/innovation/DSC_1108_uetvgq.jpg",
	},
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744725668/innovation/WhatsApp_Image_2025-04-14_at_7.45.51_PM_ucve3u.jpg",
	},
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744307877/innovation/DSC_1269_uerpo3.jpg",
	},
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744307914/innovation/DSC_1057_hi7z5t.jpg",
	},
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744307925/innovation/DSC_1062_q7cxbv.jpg",
	},
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744308380/innovation/IMG-20250410-WA0063_xvqpfu.jpg",
	},
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744308382/innovation/DSC_1065_pp4qio.jpg",
	},
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744308689/innovation/DSC_1383-Joe_Photography_ulwvwy.jpg",
	},
	{
		src: "https://res.cloudinary.com/dh0rc6p1c/image/upload/v1744725767/innovation/WhatsApp_Image_2025-04-14_at_6.30.48_PM_c8cjl9.jpg",
	},
];

export const ourServices = [
	{
		icon: Wifi,
		title: "High speed internet",
		description:
			"Our workspaces offers a cutting-edge high speed internet service designed to meet te demanding needs of business and individuals in today's fast paced digital landscape",
	},
	{
		icon: Monitor,
		title: "Tech Hub",
		description:
			"Plug into a community of tech enthusiasts, attend developer meetups, or build your startup idea in an environment tailored for tech growth and collaboration.",
	},
	{
		icon: Presentation,
		title: "Meeting Room",
		description:
			"Host meetings, strategy sessions, or client presentations in our well-equipped, private meeting rooms designed to impress and deliver results.",
	},
	{
		icon: FolderKanban,
		title: "Training & Workshops",
		description:
			"We offer hands-on digital skills training, and professional development workshops to help you and your team stay ahead in the digital economy.",
	},
	{
		icon: Coffee,
		title: "Café & Refreshments",
		description:
			"Grab a cup of freshly brewed coffee, enjoy our signature parfaits, or unwind with a variety of chilled beverages—all available right within the space.",
	},
	{
		icon: QrCode,
		title: "Digital Presence Setup",
		description:
			"From website design and branding to social media setup and digital marketing strategies, we help you establish a professional online presence that attracts customers and builds credibility.",
	},
];

export const spaces = [
	{
		src: "/assets/images/space-one.jpg",
		name: "Shared Work Lounge",
		description:
			"A vibrant, open-plan area perfect for freelancers, remote workers, and casual creatives. Bring your laptop and plug into productivity.",
	},
	{
		src: "/assets/images/space-two.jpg",
		name: "Private desk",
		description:
			"Need focus and zero distractions? Our private desk gives you a dedicated space to concentrate and get things done — all yours for the session.",
	},
	{
		src: "/assets/images/space-three.jpg",
		name: "Mini meeting rooms",
		description:
			"Perfect for 2–4 people, this cozy meeting space is great for client catch-ups, interviews, or team brainstorming sessions.",
	},
	{
		src: "/assets/images/space-four.jpg",
		name: "Call Booth",
		description:
			"Take private calls, virtual meetings, or online interviews in peace. Sound-insulated and comfy for short focused sessions.",
	},
	{
		src: "/assets/images/space-five.jpg",
		name: "Creative Corner",
		description:
			"A relaxed corner with armchairs and soft lighting — ideal for reading, journaling, or light laptop work over a cup of parfait or coffee.",
	},
];

export const firstMarquee = [
	"🚀 Book instantly",
	"💼 Premium workspaces",
	"⭐ Verified spaces",
	"📱 Mobile first",
	"🌍 Global Networks",
	"🔒 Secure payments",
	"🎯 Find your flow",
	"⚡ Work anywhere",
];

export const secondMarquee = [
	"☕ Parfait",
	"🌿 Calm environment",
	"🎉 Creativity",
	"📶 Super-fast Wi-Fi",
	"🪑 Comfort & Clarity",
	"📍	Best location",
	"🧠 Think & Create",
	"🕒 Flexible bookings",
];

export const testimonials = [
	{
		image: "/assets/images/user-one.jpeg",
		name: "Tomiwa Adelae",
		testimony:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eius molestiae illo id, ab dolor modi, est aut atque iure facilis reiciendis ex exercitationem, perspiciatis fugiat consequuntur ? Dolor, itaque.",
		borderColor: "border-white",
		bgColor: "bg-[#EEE6FD]",
		textColor: "text-purple-900",
		rotate: "lg:-rotate-6",
	},
	{
		image: "/assets/images/user-two.webp",
		name: "Sandra Reddington",
		testimony:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eius molestiae illo id, ab dolor modi, est aut atque iure facilis reiciendis ex exercitationem, perspiciatis fugiat consequuntur ? Dolor, itaque.",
		borderColor: "border-gray-200",
		bgColor: "bg-[#FFFBFD]",
		textColor: "text-primary",
		rotate: "rotate-0",
	},
	{
		image: "/assets/images/user-three.jpg",
		name: "Israel Ibitoye",
		testimony:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam eius molestiae illo id, ab dolor modi, est aut atque iure facilis reiciendis ex exercitationem, perspiciatis fugiat consequuntur ? Dolor, itaque.",
		borderColor: "border-orange-400",
		bgColor: "bg-[#FEF8E8]",
		textColor: "text-orange-400",
		rotate: "lg:rotate-6",
	},
];

export const faqs = [
	{
		question: "How do I book a workspace at Reenite?",
		answer: "You can browse available spaces on the Explore Spaces page and click “Book Now” to select your preferred date and time. Booking is instant and secure.",
	},
	{
		question: "Can I walk in without booking online?",
		answer: "Yes, walk-ins are welcome — but we recommend booking in advance to guarantee availability, especially during peak hours.",
	},
	{
		question: "What amenities are included with each booking?",
		answer: "All workspaces come with fast Wi-Fi, charging ports, air conditioning, and complimentary water. Some spaces include access to our Parfait bar, meeting boards, or phone booths.",
	},
	{
		question: "Can I cancel or reschedule my booking?",
		answer: "Yes! You can cancel or reschedule up to 2 hours before your booked time via your dashboard. Last-minute changes may be subject to a small fee.",
	},
	{
		question: "Is there a minimum or maximum booking time?",
		answer: "You can book a space for as little as 30 minutes or up to an entire day, depending on the space. Each listing shows its available booking durations.",
	},
	{
		question: "Do you offer food or refreshments?",
		answer: "Absolutely! We serve fresh Parfait, coffee, and light snacks onsite. You can pre-order during your booking or buy at the space.",
	},
	{
		question: "Is Reenite open every day?",
		answer: "Is Reenite open every day?",
	},
	{
		question: "Can I host a small meeting or event here?",
		answer: "Yes! Some of our spaces are perfect for team huddles, interviews, or private sessions. Be sure to check the capacity listed in each space before booking.",
	},
];

export const spaceBookings = [
	{
		type: "hour",
		price: "21,616",
	},
	{
		type: "daily",
		price: "21,616",
	},
	{
		type: "week",
		price: "21,616",
	},
	{
		type: "month",
		price: "21,616",
	},
];

export const noOfHours = ["1", "2", "3", "4", "5", "6", "7"];
export const noOfDays = ["1", "2", "3", "4", "5", "6", "7"];
export const noOfWeeks = ["1", "2", "3", "4"];
export const noOfMonths = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
];
export const noOfUsers = [
	{ user: "1", label: "1 user" },
	{ user: "2", label: "2 users" },
	{ user: "3", label: "3 users" },
	{ user: "4", label: "4 users" },
	{ user: "5", label: "5 users" },
	{ user: "6", label: "6 users" },
	{ user: "7+", label: "7+ users" },
];

export const userNavLinks = [
	{
		icon: CircleUser,
		slug: "/profile",
		label: "Profile",
	},
	{
		icon: Info,
		slug: "/about",
		label: "About me",
	},
	{
		icon: FolderClock,
		slug: "/bookings",
		label: "Past bookings",
	},
	// {
	// 	icon: Settings,
	// 	slug: "/account-settings",
	// 	label: "Account settings",
	// },
	// {
	// 	icon: CircleHelp,
	// 	slug: "/help-center",
	// 	label: "Help center",
	// },
];

export const adminNavLinks = [
	{
		slug: "/dashboard",
		label: "Dashboard",
	},
	{
		slug: "/all-spaces",
		label: "Spaces",
	},
	{
		slug: "/all-bookings",
		label: "Bookings",
	},
	{
		slug: "/all-users",
		label: "Users",
	},
];

export const adminMobileLinks = [
	{
		slug: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
	},
	{
		slug: "/all-spaces",
		label: "Spaces",
		icon: House,
	},
	{
		slug: "/all-bookings",
		label: "Bookings",
		icon: Folder,
	},
	{
		slug: "/all-spaces/new",
		label: "Create a new space",
		icon: HousePlus,
	},
	{
		slug: "/all-users",
		label: "Customers",
		icon: Users,
	},
	// {
	// 	slug: "/account-settings",
	// 	label: "Account settings",
	// 	icon: Settings,
	// },
	{
		slug: "/profile",
		label: "Your profile",
		icon: CircleUser,
	},
];

export const newSpaceOverview = [
	{
		icon: "/assets/icons/office.svg",
		name: "Office",
		title: "Tell us about your place",
		description:
			"Share some basic info, like where it is and how many guests can work there.",
	},
	{
		icon: "/assets/icons/picture.svg",
		name: "picture",
		title: "Make it stand out",
		description:
			"Add 5 or more photos plus a title and description—we’ll help you out.",
	},
	{
		icon: "/assets/icons/publish.svg",
		name: "Check",
		title: "Finish up and publish",
		description:
			"Choose a starting price, verify a few details, then publish your space.",
	},
];

export const spaceCategories = [
	{
		icon: "/assets/icons/office.svg",
		name: "Space Desk",
	},
	{
		icon: "/assets/icons/building.svg",
		name: "Private office",
	},
	{
		icon: "/assets/icons/cafe.svg",
		name: "Café Table",
	},
	{
		icon: "/assets/icons/meeting-room.svg",
		name: "Meeting Room",
	},
	{
		icon: "/assets/icons/podcast.svg",
		name: "Podcast Booth",
	},
	{
		icon: "/assets/icons/training-room.svg",
		name: "Training Room",
	},
];

export const nigerianStates = [
	"Abia",
	"Adamawa",
	"Akwa Ibom",
	"Anambra",
	"Bauchi",
	"Bayelsa",
	"Benue",
	"Borno",
	"Cross River",
	"Delta",
	"Ebonyi",
	"Edo",
	"Ekiti",
	"Enugu",
	"Gombe",
	"Imo",
	"Jigawa",
	"Kaduna",
	"Kano",
	"Katsina",
	"Kebbi",
	"Kogi",
	"Kwara",
	"Lagos",
	"Nasarawa",
	"Niger",
	"Ogun",
	"Ondo",
	"Osun",
	"Oyo",
	"Plateau",
	"Rivers",
	"Sokoto",
	"Taraba",
	"Yobe",
	"Zamfara",
	"FCT (Abuja)",
] as const;

export const nigerianCountries = ["nigeria"] as const;

export const availableAmenities = [
	{
		icon: Icons.Wifi,
		name: "High speed wifi",
		iconName: "Wifi",
	},
	{
		icon: Icons.Snowflake,
		name: "Air conditioning",
		iconName: "Snowflake",
	},
	{
		icon: Icons.BatteryFull,
		name: "Power Backup",
		iconName: "BatteryFull",
	},
	{
		icon: Icons.Projector,
		name: "Projector",
		iconName: "Projector",
	},
	{
		icon: Icons.Presentation,
		name: "Whiteboard",
		iconName: "Presentation",
	},
	{
		icon: Icons.Tv,
		name: "TV / Screen",
		iconName: "Tv",
	},
	{
		icon: Icons.Printer,
		name: "Printer/Scanner",
		iconName: "Printer",
	},
	{
		icon: Icons.Laptop,
		name: "Laptop Station",
		iconName: "Laptop",
	},
	{
		icon: Icons.Phone,
		name: "Phone Booth",
		iconName: "Phone",
	},
	{
		icon: Icons.Coffee,
		name: "Coffee Machine",
		iconName: "Coffee",
	},
	{
		icon: Icons.GlassWater,
		name: "Water Dispenser",
		iconName: "GlassWater",
	},
	{
		icon: Icons.Hamburger,
		name: "Snack Bar",
		iconName: "Hamburger",
	},
	{
		icon: Icons.Refrigerator,
		name: "Mini Fridge",
		iconName: "Refrigerator",
	},
	{
		icon: Icons.Microwave,
		name: "Microwave",
		iconName: "Microwave",
	},
	{
		icon: Icons.Utensils,
		name: "Kitchen Access",
		iconName: "Utensils",
	},
	{
		icon: Icons.Toilet,
		name: "Restrooms",
		iconName: "Toilet",
	},
	{
		icon: Icons.ShowerHead,
		name: "Shower",
		iconName: "ShowerHead",
	},
	{
		icon: Icons.Car,
		name: "Parking Space",
		iconName: "Car",
	},
	{
		icon: Icons.Bike,
		name: "Bike Rack",
		iconName: "Bike",
	},
	{
		icon: Icons.Accessibility,
		name: "Wheelchair Access",
		iconName: "Accessibility",
	},
	{
		icon: Icons.Clock,
		name: "24/7 Access",
		iconName: "Clock",
	},
	{
		icon: Icons.Cctv,
		name: "CCTV",
		iconName: "Cctv",
	},
	{
		icon: Icons.Shield,
		name: "Security Guard",
		iconName: "Shield",
	},
	{
		icon: Icons.KeyRound,
		name: "Secure Entry",
		iconName: "KeyRound",
	},
	{
		icon: Icons.FireExtinguisher,
		name: "Fire Extinguisher",
		iconName: "FireExtinguisher",
	},
	{
		icon: Icons.Dumbbell,
		name: "Gym Access",
		iconName: "Dumbbell",
	},
	{
		icon: Icons.Gamepad2,
		name: "Game Room",
		iconName: "Gamepad2",
	},
	{
		icon: Icons.Sun,
		name: "Rooftop Access",
		iconName: "Sun",
	},
	{
		icon: Icons.TreeDeciduous,
		name: "Outdoor Seating",
		iconName: "TreeDeciduous",
	},
	{
		icon: Icons.Plug,
		name: "Extension Cords",
		iconName: "Plug",
	},
	{
		icon: Icons.Usb,
		name: "USB Charging",
		iconName: "Usb",
	},
	{
		icon: Icons.HdmiPort,
		name: "HDMI Cable",
		iconName: "HdmiPort",
	},
];

export const DEFAULT_PROFILE_PICTURE =
	"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

export const DEFAULT_SPACE_IMAGE = "/assets/images/logo-full.svg";

export const REENITE_CONTACT_PHONE_NUMBER = "09161231304";
export const REENITE_EMAIL_ADDRESS = "hello@reenite.com";
export const REENITE_WEBSITE_URL = "https://reenite.vercel.app";
export const REENITE_FACEBOOK_URL = "https://facebook.com/share/1EvF1EKb5u";
export const REENITE_TWITTER_URL = "https://x.com/reenitenig";
export const REENITE_INSTAGRAM_URL = "https://www.instagram.com/reenitenig";
export const REENITE_LINKEDIN_URL = "https://www.linkedin.com/company/reenite";
export const REENITE_WIFI_PASSWORD = "socket01TELLER#";
export const REENITE_WIFI_NAME = "ReeniteUyo";
export const REENITE_LOGO =
	"https://res.cloudinary.com/dh0rc6p1c/image/upload/v1749562302/reenite/logo-full_c3oa7p.png";

export const DEFAULT_LIMIT = 10;

export const MONGODB =
	"mongodb+srv://thetommedia:BH5glRZRGpXRkXtH@cluster0.i9kyzgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
