// src/pages/LandingPage.tsx
import { landingData } from "../data/landing";
import { useLang } from "../context/LangContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

import { Hero } from "../sections/Hero";
import { Why } from "../sections/Why";
import { Values } from "../sections/Values";
import { Features } from "../sections/Features";
import { FAQ } from "../sections/FAQ";
import { CTA } from "../sections/CTA";

export default function LandingPage() {
    const { lang } = useLang();
    const d = lang === 'RO' ? landingData.ro : landingData.en;

    return (
        <div
            id="top"
            className="min-h-screen bg-white dark:bg-[#0d0d14] text-[#0d0d14] dark:text-white transition-colors duration-300"
        >
            <Navbar links={d.nav} />

            <main>
                <Hero {...d.hero} />
                <Why id="why" title={d.why.title} bullets={d.why.bullets} />
                <Values id="values" title={d.values.title} items={d.values.items} />
                <Features id="features" title={d.features.title} items={d.features.items} />
                <FAQ id="faq" title={d.faq.title} items={d.faq.items} />
                <CTA id="cta" {...d.cta} />
            </main>

            <Footer brand={d.footer.brand} note={d.footer.note} />
        </div>
    );
}
