import Link from "next/link"
import HeroSection from "./components/landing-page/hero"
import Leaderboard from "@/app/components/leaderboard"
import Footer from "./components/landing-page/footer"
export default function Component() {
  return (
    <>
      <HeroSection />
      <Leaderboard />
      <Footer />
    </>
  )
}

