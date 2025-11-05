"use client"

import Link from "next/link"

export default function WishlistButton() {
  return (
    <section className="py-12 px-4 text-center relative z-10">
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-foreground mb-6">Klaar om je verlanglijstje te maken of te bekijken?</p>
        <Link
          href="/wishlist"
          className="inline-block px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: "#195905",
            color: "#ffffff",
          }}
        >
          ✨ Ga naar mijn Verlanglijstje ✨
        </Link>
      </div>
    </section>
  )
}
