"use client"

const HeroVideo = () => {
  return (
    <video
      controls
      muted
      autoPlay
      poster="/hero-poster.jpeg"
      className="w-full mt-8 rounded-lg border bg-black"
    >
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>
  )
}

export default HeroVideo
