// src/App.tsx
import "./App.css";

import { nav, hero, why, values, features, faq, cta, footer } from "./data/landing";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Hero } from "./sections/Hero";
import { Why } from "./sections/Why";
import { Values } from "./sections/Values";
import { Features } from "./sections/Features";
import { FAQ } from "./sections/FAQ";
import { CTA } from "./sections/CTA";

export default function App() {
    return (
        <ThemeProvider>
            <div id="top" className="min-h-screen bg-white dark:bg-[#0d0d14] text-[#0d0d14] dark:text-white transition-colors duration-300">
                <Navbar links={nav} />

                <main>
                    <Hero {...hero} />
                    <Why id="why" title={why.title} bullets={why.bullets} />
                    <Values id="values" title={values.title} items={values.items} />
                    <Features id="features" title={features.title} items={features.items} />
                    <FAQ id="faq" title={faq.title} items={faq.items} />
                    <CTA id="cta" {...cta} />
                </main>

                <Footer brand={footer.brand} note={footer.note} />
            </div>
        </ThemeProvider>
    );
}
