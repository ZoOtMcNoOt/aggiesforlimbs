"use client"
import { useState, useEffect } from "react"

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Hold for 4 seconds before starting a 500ms fade-out
    const timer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        setVisible(false)
      }, 500)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Centered logo (now a bit lower toward the center) */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aggiesforlimbs_wixsite_com_home_img_5_logo.jpg-er902cVGPqH95z0dplzWEgdtS3Jj9q.jpeg"
          alt="Aggies for Limbs Logo"
          className="w-32 h-32 rounded-lg"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=128&width=128"
          }}
        />
      </div>
      {/* Detailed animated stick man with connected limbs and raised foot */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="150" height="150">
        <style>{`
          /* Make stroke ends and joins round */
          .walker, .walker * {
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          /* Smooth keyframes for right leg (foot lifting more pronounced) */
          @keyframes run-leg {
            0%   { transform: rotate(0deg) translateY(0); }
            25%  { transform: rotate(10deg) translateY(-2px); }
            50%  { transform: rotate(20deg) translateY(-8px); }
            75%  { transform: rotate(10deg) translateY(-2px); }
            100% { transform: rotate(0deg) translateY(0); }
          }
          /* Smooth arm swing */
          @keyframes swing-arm {
            0%   { transform: rotate(0deg); }
            25%  { transform: rotate(-10deg); }
            50%  { transform: rotate(-20deg); }
            75%  { transform: rotate(-10deg); }
            100% { transform: rotate(0deg); }
          }
          /* Walker moves across the screen */
          @keyframes moveAcross {
            0%   { transform: translateX(-150px); }
            20%  { transform: translateX(-50px); }
            40%  { transform: translateX(0px); }
            60%  { transform: translateX(50px); }
            80%  { transform: translateX(150px); }
            100% { transform: translateX(150vw); }
          }
          /* Prosthetic leg: left leg remains static in teal */
          .leftLeg {
            stroke: teal;
          }
          /* Right leg: animate with pivot at knee */
          .rightLeg {
            animation: run-leg 1.5s ease-in-out infinite;
            transform-origin: 55px 70px;
          }
          /* Arms swinging, with pivot at shoulder */
          .leftArm {
            animation: swing-arm 1.5s ease-in-out infinite;
            transform-origin: 50px 30px;
          }
          .rightArm {
            animation: swing-arm 1.5s ease-in-out infinite;
            transform-origin: 50px 30px;
          }
          /* Entire stick man animation: moving across screen */
          .walker {
            animation: moveAcross 6s linear forwards;
          }
          /* Thigh rotation */
          @keyframes swing-thigh {
            0%   { transform: rotate(0deg); }
            25%  { transform: rotate(15deg); }
            50%  { transform: rotate(30deg); }
            75%  { transform: rotate(15deg); }
            100% { transform: rotate(0deg); }
          }
          /* Calf rotation (bending at knee) */
          @keyframes bend-knee {
            0%   { transform: rotate(0deg); }
            25%  { transform: rotate(-10deg); }
            50%  { transform: rotate(-20deg); }
            75%  { transform: rotate(-10deg); }
            100% { transform: rotate(0deg); }
          }
        `}</style>
        {/* Tilt the whole figure by -10deg around a central pivot so it appears to be moving in a defined direction */}
        <g class="walker" transform="rotate(-10,50,50)" stroke="black" strokeWidth="2" fill="none">
          {/* Head, attached to body */}
          <circle cx="50" cy="20" r="5" />
          {/* Body, from neck (50,25) to waist (50,55) */}
          <line x1="50" y1="25" x2="50" y2="55" />
          {/* Left arm: Shoulder (50,30) -> Elbow (40,40) -> Hand (35,50) */}
          <polyline points="50,30 40,40 35,50" class="leftArm" />
          {/* Right arm: Shoulder (50,30) -> Elbow (60,40) -> Hand (65,50) */}
          <polyline points="50,30 60,40 65,50" class="rightArm" />
          {/* Left leg (prosthetic): from hip (50,55) -> Knee (45,70) -> Foot (40,85) */}
          <polyline points="50,55 45,70 40,85" class="leftLeg" />
          {/* Right leg: from hip (50,55) -> Knee (55,70) -> Foot (60,85), animated to lift the foot */}
          <g class="rightLeg">
            <g class="rightThigh">
              <line x1="50" y1="55" x2="55" y2="70" />
              <g class="rightCalf">
                <line x1="55" y1="70" x2="60" y2="85" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default LoadingScreen