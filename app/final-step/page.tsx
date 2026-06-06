"use client"

import { useState, useRef } from "react"
import { Volume2, VolumeX, Play, Pause, X } from "lucide-react"
import KitCheckoutButton from "@/components/KitCheckoutButton"

export default function FinalStepPage() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const kitProductUrl = "https://digital-arkitects.kit.com/products/ai-revolution?step=checkout"

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(!isMuted)
  }

  const togglePlayPause = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              className="w-full h-auto"
              style={{ maxHeight: "600px" }}
              src="https://github.com/R3n3gade-ai/video-urls/releases/download/v1.0/Untitled.design.2.mp4"
            />
            <button onClick={togglePlayPause} className="absolute top-2 left-2 bg-black/50 text-white p-2 rounded-full z-10">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button onClick={toggleMute} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full z-10">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Final Step</h1>
          <p className="text-gray-700 mb-6">
            Checkout is still active, but analytics and lead storage have been removed from this build.
          </p>
          <button onClick={() => setShowCheckout(true)} className="bg-[#5B5FED] hover:bg-[#4A4EDD] text-white font-bold py-4 px-8 rounded-full">
            Buy Now for $47
          </button>
        </div>
      </section>

      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setShowCheckout(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-center mb-2">Complete Your Order</h2>
            <p className="text-center text-gray-600 text-sm md:text-base mb-6">Get instant access for only $47!</p>
            <KitCheckoutButton
              productUrl={kitProductUrl}
              label="Buy My Product"
              className="convertkit-button inline-flex w-full justify-center rounded-full bg-[#5B5FED] px-6 py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#4A4EDD]"
            />
          </div>
        </div>
      )}
    </div>
  )
}
