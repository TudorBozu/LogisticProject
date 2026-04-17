export type NavItem = { label: string; href: string };

const en = {
    nav: [
        { label: "Why", href: "#why" },
        { label: "Values", href: "#values" },
        { label: "Features", href: "#features" },
        { label: "FAQ", href: "#faq" },
    ] as NavItem[],

    hero: {
        kicker: "Efficient, reliable & real-time",
        title: "Streamline your logistics with a seamless project management platform.",
        subtitle:
            "A robust platform for managing logistics operations, tracking shipments, and optimizing workflows in real-time.",
        primaryCta: { label: "Get started", href: "/sign-up" },
        secondaryCta: { label: "Learn more", href: "#values" },
        stats: [                                                  // ← add this
            { stat: "98.6%", label: "Fleet uptime guaranteed" },
            { stat: "2,400+", label: "Vehicles tracked globally" },
            { stat: "34%", label: "Average fuel cost reduction" },
        ]
    },

    why: {
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
    },

    values: {
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
    },

    features: {
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
    },

    faq: {
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
    },

    cta: {
        title: "Ready to optimize your logistics?",
        subtitle:
            "Get started with our platform and streamline your supply chain management, from warehousing to delivery.",
        primary: { label: "Get Started", href: "/sign-up" },
        secondary: { label: "Learn More", href: "#features" },
    },

        footer: {
            brand: "RoutaX",
            note: "Your logistics management platform.",
            columns: {
                product: { title: "Product", links: ["Why RoutaX", "Features", "Values", "FAQ"] },
                company: { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
                legal: { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"] },
                connect: { title: "Connect", links: ["GitHub", "LinkedIn", "Twitter / X", "Contact Us"] },
            },
            requestInfo: {
                title: "Request info",
                description: "Interested in RoutaX for your fleet? Leave your email and we will reach out.",
                placeholder: "your@company.com",
            },
            copyright: "RoutaX Technologies SRL · All rights reserved",
        },
};

const ro = {
    nav: [
        { label: "De ce noi", href: "#why" },
        { label: "Valori", href: "#values" },
        { label: "Funcționalități", href: "#features" },
        { label: "FAQ", href: "#faq" },
    ] as NavItem[],

    hero: {
        kicker: "Eficient, fiabil și în timp real",
        title: "Optimizează-ți logistica cu o platformă integrată de management.",
        subtitle:
            "O platformă robustă pentru gestionarea operațiunilor logistice, urmărirea transporturilor și optimizarea fluxurilor în timp real.",
        primaryCta: { label: "Începe acum", href: "/sign-up" },
        secondaryCta: { label: "Află mai mult", href: "#values" },
        stats: [
            { stat: "98.6%", label: "Timp de funcționare garantat" },
            { stat: "2,400+", label: "Vehicule urmărite global" },
            { stat: "34%", label: "Reducere medie a costurilor cu combustibilul" },
        ]
    },

    why: {
        title: "De ce să alegi platforma noastră logistică",
        bullets: [
            {
                title: "Vizibilitate completă",
                text: "Urmărește fiecare transport, actualizare și acțiune de la început până la final.",
            },
            {
                title: "Actualizări în timp real",
                text: "Primește actualizări instant despre logistică și operațiuni pentru decizii rapide.",
            },
            {
                title: "Scalabil și fiabil",
                text: "Platforma noastră crește odată cu nevoile tale logistice, oferind scalabilitate și siguranță.",
            },
        ],
    },

    values: {
        title: "Valorile noastre",
        items: [
            {
                title: "Eficiență în locul complexității",
                text: "Platforma noastră simplifică managementul logistic oferind în același timp instrumente puternice.",
            },
            {
                title: "Reactivitate în timp real",
                text: "Răspunde la schimbările din lanțul de aprovizionare pe măsură ce apar, cu date actualizate la minut.",
            },
            {
                title: "Design centrat pe client",
                text: "Funcționalități personalizate care răspund nevoilor unice ale industriilor de logistică și transport.",
            },
        ],
    },

    features: {
        title: "Funcționalități principale",
        items: [
            {
                title: "Urmărire în timp real",
                text: "Urmărește transporturile în timp real, cu actualizări și alerte automate.",
            },
            {
                title: "Optimizarea rutelor",
                text: "Optimizează rutele și programele de livrare pentru eficiență și economii de costuri.",
            },
            {
                title: "Comunicații integrate",
                text: "Mesagerie centralizată pentru coordonarea între echipe, șoferi și clienți.",
            },
            {
                title: "Analize și rapoarte",
                text: "Obține informații detaliate despre performanța logistică și indicatorii cheie.",
            },
        ],
    },

    faq: {
        title: "Întrebări frecvente",
        items: [
            {
                q: "Cum urmăresc transporturile?",
                a: "Introduceți numărul de urmărire și platforma noastră va afișa actualizări în timp real privind locația și starea.",
            },
            {
                q: "Pot integra cu sistemele existente?",
                a: "Da, platforma noastră oferă integrare ușoară cu principalele sisteme de management al depozitelor și transporturilor.",
            },
            {
                q: "Este disponibil suportul pentru clienți?",
                a: "Da, oferim suport pentru clienți 24/7 pentru a ajuta cu orice problemă logistică sau tehnică.",
            },
        ],
    },

    cta: {
        title: "Gata să-ți optimizezi logistica?",
        subtitle:
            "Începe cu platforma noastră și eficientizează managementul lanțului de aprovizionare, de la depozitare la livrare.",
        primary: { label: "Începe acum", href: "/sign-up" },
        secondary: { label: "Află mai mult", href: "#features" },
    },

    footer: {
        brand: "RoutaX",
        note: "Platforma ta de management logistic (React + TS + Tailwind).",
        columns: {
            product: { title: "Produs", links: ["De ce RoutaX", "Funcționalități", "Valori", "FAQ"] },
            company: { title: "Companie", links: ["Despre", "Cariere", "Blog", "Presă"] },
            legal: { title: "Legal", links: ["Politica de confidențialitate", "Termeni și condiții", "Politica cookies", "GDPR"] },
            connect: { title: "Contact", links: ["GitHub", "LinkedIn", "Twitter / X", "Contactați-ne"] },
        },
        requestInfo: {
            title: "Solicită informații",
            description: "Interesat de RoutaX pentru flota ta? Lasă emailul tău și te vom contacta.",
            placeholder: "email@companie.ro",
        },
        copyright: "RoutaX Technologies SRL · Toate drepturile rezervate",
    },
};

export const landingData = { en, ro };

export const nav = en.nav;
export const hero = en.hero;
export const why = en.why;
export const values = en.values;
export const features = en.features;
export const faq = en.faq;
export const cta = en.cta;
export const footer = en.footer;
