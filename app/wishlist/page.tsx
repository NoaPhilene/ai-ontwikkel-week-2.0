"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface WishItem {
  id: string
  name: string
  description: string
}

interface SuggestedGift {
  id: string
  name: string
  description: string
  emoji: string
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishItem[]>([])
  const [itemName, setItemName] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [suggestedGifts, setSuggestedGifts] = useState<SuggestedGift[]>([])
  const [loadingGifts, setLoadingGifts] = useState(true)

  useEffect(() => {
    const fetchSuggestedGifts = async () => {
      try {
        // Mock API data - in real app this would come from an actual API
        const mockGifts: SuggestedGift[] = [
          { id: "1", name: "Rode Fiets", description: "Een prachtige rode fiets met bellen", emoji: "🚴" },
          { id: "2", name: "Schaatsen", description: "Winterse schaatsen voor op het ijs", emoji: "⛸️" },
          { id: "3", name: "Slee", description: "Een houtslede voor sneeuwpret", emoji: "🛷" },
          { id: "4", name: "Boeken", description: "Spannende avonturenverhalen", emoji: "📚" },
          { id: "5", name: "Speelgoed Robot", description: "Een coole programmeerbare robot", emoji: "🤖" },
          { id: "6", name: "Skateboard", description: "Trendy skateboard in rode kleur", emoji: "🛹" },
        ]
        setSuggestedGifts(mockGifts)
      } catch (error) {
        console.error("Fout bij laden van suggesties:", error)
      } finally {
        setLoadingGifts(false)
      }
    }

    fetchSuggestedGifts()
  }, [])

  const addItem = () => {
    if (itemName.trim()) {
      const newItem: WishItem = {
        id: Date.now().toString(),
        name: itemName,
        description: itemDescription,
      }
      setItems([...items, newItem])
      setItemName("")
      setItemDescription("")
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const addSuggestedItem = (gift: SuggestedGift) => {
    const newItem: WishItem = {
      id: Date.now().toString(),
      name: gift.name,
      description: gift.description,
    }
    setItems([...items, newItem])
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#b31b1b] to-[#8b1515]">
      <header className="bg-[#195905] text-white py-8 px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-balance">🎁 Mijn Verlanglijstje 🎁</h1>
          <p className="mt-2 text-lg opacity-90">Voeg je cadeaus toe voor de Kerstman</p>
        </div>
      </header>

      <main className="flex-1 py-12 px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Add Item Form */}
          <div className="bg-[#195905] rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Voeg een Cadeau toe 🎀</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Wat wil je hebben?</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="bijv. Rode Fiets"
                  className="w-full px-4 py-2 border-4 border-[#b31b1b] rounded-lg bg-[#2a8000] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#b31b1b]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">Omschrijving (optioneel)</label>
                <textarea
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  placeholder="Vertel de Kerstman meer over wat je wilt..."
                  rows={3}
                  className="w-full px-4 py-2 border-4 border-[#b31b1b] rounded-lg bg-[#2a8000] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#b31b1b]"
                />
              </div>
              <button
                onClick={addItem}
                className="w-full bg-[#b31b1b] text-white py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Toevoegen aan Verlanglijstje
              </button>
            </div>
          </div>

          {/* Suggested Gifts */}
          <div className="bg-[#195905] rounded-lg p-6 mb-8 border border-border">
            <h2 className="text-2xl font-bold text-white mb-4">Suggestie Cadeaus ✨</h2>
            {loadingGifts ? (
              <p className="text-white text-center py-4">Cadeaus laden...</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {suggestedGifts.map((gift) => (
                  <div
                    key={gift.id}
                    className="bg-[#2a8000] rounded-lg p-4 text-center hover:shadow-md transition-shadow border-4 border-[#b31b1b]"
                  >
                    <div className="text-3xl mb-2">{gift.emoji}</div>
                    <h3 className="font-bold text-white mb-1">{gift.name}</h3>
                    <p className="text-sm text-white mb-3">{gift.description}</p>
                    <button
                      onClick={() => addSuggestedItem(gift)}
                      className="w-full bg-[#b31b1b] text-white px-3 py-1 rounded font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                      Toevoegen
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Items */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Mijn Cadeaus</h2>
            {items.length === 0 ? (
              <div className="bg-[#195905] rounded-lg p-8 text-center border border-[#b31b1b]">
                <p className="text-lg text-white mb-4">Je verlanglijstje is leeg! Voeg je eerste item toe. 🎄</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#195905] border border-[#b31b1b] rounded-lg p-6 flex justify-between items-start"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    {item.description && <p className="text-white mt-2">{item.description}</p>}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 bg-[#b31b1b] text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    Verwijderen
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-[#195905] text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              ← Terug naar de Noordpool
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-[#195905] text-white py-8 px-4 text-center relative z-10 border-t border-border">
        <p className="font-semibold">Ho Ho Ho! Fijne Kerstmis van de Kerstman 🎅</p>
      </footer>
    </div>
  )
}
