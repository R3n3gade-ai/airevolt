"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [showNextButton, setShowNextButton] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  const [leadData, setLeadData] = useState({ firstName: "", lastName: "", email: "", phone: "" })

  const handleLeadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLeadData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const affiliateRef = urlParams.get("ref")
    if (affiliateRef) {
      localStorage.setItem("affiliateRef", affiliateRef)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const playVideo = async () => {
      try {
        await video.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }
    playVideo()
    const handleTimeUpdate = () => {
      const timeRemaining = video.duration - video.currentTime
      if (timeRemaining <= 30 && !showNextButton) setShowNextButton(true)
    }
    video.addEventListener("timeupdate", handleTimeUpdate)
    return () => video.removeEventListener("timeupdate", handleTimeUpdate)
  }, [showNextButton])

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

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("Success! Redirecting...")
    localStorage.setItem("leadData", JSON.stringify(leadData))
    setTimeout(() => router.push("/final-step"), 1200)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-4 sm:px-6 md:px-8 py-8 md:py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl w-full mx-auto">
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'%3E%3Crect width='1200' height='675' fill='%23000'/%3E%3C/svg%3E"
              src="https://gkbipciso4g0l0uv.public.blob.vercel-storage.com/main.mp4.mp4"
            />
            <button onClick={togglePlayPause} className="absolute top-2 left-2 md:top-4 md:left-4 bg-black/50 text-white p-2 md:p-3 rounded-full z-10">
              {isPlaying ? <Pause className="w-4 h-4 md:w-6 md:h-6" /> : <Play className="w-4 h-4 md:w-6 md:h-6" />}
            </button>
            <button onClick={toggleMute} className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/50 text-white p-2 md:p-3 rounded-full z-10">
              {isMuted ? <VolumeX className="w-4 h-4 md:w-6 md:h-6" /> : <Volume2 className="w-4 h-4 md:w-6 md:h-6" />}
            </button>
            {showNextButton && (
              <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 z-10 px-4">
                <button onClick={() => router.push("/final-step")} className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg animate-pulse">
                  NEXT STEP →
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4">
            <div className="bg-blue-600 text-white text-xs md:text-sm font-medium px-3 md:px-4 py-2 rounded-full">73 people are watching right now</div>
          </div>

          <div className="mt-6 md:mt-8">
            {!showForm ? (
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 text-center max-w-3xl mx-auto">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-2">
                  This Could Be Your Turning Point! Click "Check Availability" Now Before This Opportunity Disappears
                </h2>
                <button onClick={() => setShowForm(true)} className="bg-[#5B5FED] text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg w-full sm:w-auto">
                  CHECK AVAILABILITY
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 lg:p-12 max-w-4xl mx-auto">
                <form onSubmit={handleLeadSubmit}>
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                    <div className="space-y-3 md:space-y-4">
                      <input name="firstName" value={leadData.firstName} onChange={handleLeadInputChange} placeholder="FIRST NAME" className="w-full px-6 py-4 border-2 border-gray-300 rounded-full" required />
                      <input name="lastName" value={leadData.lastName} onChange={handleLeadInputChange} placeholder="LAST NAME" className="w-full px-6 py-4 border-2 border-gray-300 rounded-full" required />
                      <input name="email" type="email" value={leadData.email} onChange={handleLeadInputChange} placeholder="EMAIL" className="w-full px-6 py-4 border-2 border-gray-300 rounded-full" required />
                      <input name="phone" type="tel" value={leadData.phone} onChange={handleLeadInputChange} placeholder="201-555-0123" className="w-full px-6 py-4 border-2 border-gray-300 rounded-full" required />
                      {submitMessage && <div className="p-3 rounded-lg text-sm text-center bg-green-100 text-green-800">{submitMessage}</div>}
                      <button type="submit" disabled={isSubmitting} className="w-full bg-[#5B5FED] text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg">
                        {isSubmitting ? "SUBMITTING..." : "GAIN ACCESS"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
