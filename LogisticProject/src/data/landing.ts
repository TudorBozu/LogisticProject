export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
    { label: "Why", href: "#why" },
    { label: "Values", href: "#values" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
];

export const hero = {
    kicker: "Efficient, reliable & real-time",
    title: "Streamline your logistics with a seamless project management platform.",
    subtitle:
        "A robust platform for managing logistics operations, tracking shipments, and optimizing workflows in real-time. Built with React + TypeScript + Tailwind, ready to deploy with minimal customization.",
    primaryCta: { label: "Get started", href: "#cta" },
    secondaryCta: { label: "See values", href: "#values" },
};

export const why = {
    title: "Why choose our Logistic Platform",
    bullets: [
        {
            title: "End-to-end visibility",
            text: "Track every shipment, update, and action from start to finish.",
        },
        {
            title: "Real-time updates",
            text: "Receive instant updates on logistics and operations to ensure timely decisions.",
        },
        {
            title: "Scalable & reliable",
            text: "Our platform grows with your logistics needs, offering scalability and dependability.",
        },
    ],
};

export const values = {
    title: "Core Values",
    items: [
        {
            title: "Efficiency over complexity",
            text: "Our platform simplifies logistics management while providing powerful tools.",
        },
        {
            title: "Real-time responsiveness",
            text: "Respond to changes in the supply chain as they happen, with up-to-the-minute data.",
        },
        {
            title: "Customer-centric design",
            text: "Tailored features that meet the unique needs of logistics and transportation industries.",
        },
    ],
};

export const features = {
    title: "Key Features",
    items: [
        {
            title: "Real-time tracking",
            text: "Track shipments in real-time, with automated updates and alerts.",
        },
        {
            title: "Route optimization",
            text: "Optimize routes and delivery schedules for efficiency and cost savings.",
        },
        {
            title: "Integrated communications",
            text: "Centralized messaging for coordination between teams, drivers, and clients.",
        },
        {
            title: "Analytics & reporting",
            text: "Get detailed insights into logistics performance and key metrics.",
        },
    ],
};

export const faq = {
    title: "Frequently Asked Questions",
    items: [
        {
            q: "How do I track shipments?",
            a: "Simply enter the tracking number, and our platform will show real-time updates on location and status.",
        },
        {
            q: "Can I integrate with existing systems?",
            a: "Yes, our platform offers easy integration with major warehouse and transportation management systems.",
        },
        {
            q: "Is customer support available?",
            a: "Yes, we provide 24/7 customer support to assist with any logistics or technical issues.",
        },
    ],
};

export const cta = {
    title: "Ready to optimize your logistics?",
    subtitle:
        "Get started with our platform and streamline your supply chain management, from warehousing to delivery.",
    primary: { label: "Get Started", href: "#cta" },
    secondary: { label: "Learn More", href: "#features" },
};

export const footer = {
    brand: "LogisticProject",
    note: "Your logistics management platform (React + TS + Tailwind).",
};
