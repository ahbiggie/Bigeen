import { Hero } from "../components/landing/Hero"
import { Problem } from "../components/landing/Problem"
import { HowItWorks } from "../components/landing/HowItWorks"
import { Services } from "../components/landing/Services"
import { WhoItsFor } from "../components/landing/WhoItsFor"
import { Trust } from "../components/landing/Trust"
import { CtaBand } from "../components/landing/CtaBand"
import { Faq } from "../components/landing/Faq"

// ============================================
// HOMEPAGE — high-conversion landing page
// One goal: book a free diagnostic call.
// Section order follows the argument:
// pain → cost → answer → offers → fit → proof → ask → objections
// ============================================

export const HomePage: React.FC = () => (
  <>
    <Hero />
    <Problem />
    <HowItWorks />
    <Services />
    <WhoItsFor />
    <Trust />
    <CtaBand />
    <Faq />
  </>
)
