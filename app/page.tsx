"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CountdownTimer from "@/components/countdown-timer"
import WelcomeSection from "@/components/welcome-section"
import WishlistButton from "@/components/wishlist-button"

export default function Home() {
  const [snowflakes, setSnowflakes] = useState<string[]>([])

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, () => Math.random().toString())
    setSnowflakes(flakes)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {snowflakes.map((flake, i) => (
          <div
            key={flake}
            className="snowflake absolute text-white text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              zIndex: 0,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      <Header />

      <main className="flex-1 relative z-10">
        <WelcomeSection />
        <CountdownTimer />
        <WishlistButton />
      </main>

      <Footer />
    </div>
  )
}
