"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmasDate = new Date(new Date().getFullYear(), 11, 25).getTime()
      const now = new Date().getTime()
      const distance = christmasDate - now

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)

    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) return null

  return (
    <section className="py-12 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Dagen tot Kerstmis! 🎅</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-secondary rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-secondary-foreground">{timeLeft.days}</div>
            <p className="text-secondary-foreground mt-2 font-semibold">Dagen</p>
          </div>
          <div className="bg-secondary rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-secondary-foreground">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <p className="text-secondary-foreground mt-2 font-semibold">Uren</p>
          </div>
          <div className="bg-secondary rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-secondary-foreground">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <p className="text-secondary-foreground mt-2 font-semibold">Minuten</p>
          </div>
          <div className="bg-secondary rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-secondary-foreground">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <p className="text-secondary-foreground mt-2 font-semibold">Seconden</p>
          </div>
        </div>
      </div>
    </section>
  )
}
