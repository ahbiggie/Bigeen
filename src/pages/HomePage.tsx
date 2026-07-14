import { Hero } from "../components/landing/Hero"
import { Problem } from "../components/landing/Problem"
import { WhoItsFor } from "../components/landing/WhoItsFor"
import { HowItWorks } from "../components/landing/HowItWorks"
import { Approach } from "../components/landing/Approach"
import { Services } from "../components/landing/Services"
import { Trust } from "../components/landing/Trust"
import { SelfAssessment } from "../components/landing/SelfAssessment"
import { FoundingClient } from "../components/landing/FoundingClient"
import { CtaBand } from "../components/landing/CtaBand"
import { Faq } from "../components/landing/Faq"

// ============================================
// HOMEPAGE — high-conversion landing page
// One goal: book a free diagnostic call.
// Order follows the argument, with "who it's for"
// raised just after the problem (CEO review) so
// wrong-fit visitors self-select before services:
// pain → fit → answer → proof-of-method → offers →
// people/guarantee → self-check → scarcity → ask → FAQ
// ============================================

export const HomePage: React.FC = () => (
  <>
    <Hero />
    <Problem />
    <WhoItsFor />
    <HowItWorks />
    <Approach />
    <Services />
    <Trust />
    <SelfAssessment />
    <FoundingClient />
    <CtaBand />
    <Faq />
  </>
)
