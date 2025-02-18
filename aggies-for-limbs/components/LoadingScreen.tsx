"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

const LoadingScreen = ({ 
  duration = 1500, 
  fadeOutDuration = 1000,
  logoUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aggiesforlimbs_wixsite_com_home_img_5_logo.jpg-er902cVGPqH95z0dplzWEgdtS3Jj9q.jpeg",
  logoAlt = "Aggies for Limbs Logo",
  logoFallback = "/placeholder.svg?height=128&width=128"
}) => {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true)
      
      const fadeOutTimer = setTimeout(() => {
        setVisible(false)
      }, fadeOutDuration)
      
      return () => clearTimeout(fadeOutTimer)
    }, duration)
    
    return () => clearTimeout(timer)
  }, [duration, fadeOutDuration])

  if (!visible) return null

  return (
    <div
      aria-label="Loading screen"
      role="status"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Centered logo */}
      <div className="mb-12">
        <Image
          src={logoUrl}
          alt={logoAlt}
          width={128}
          height={128}
          className="rounded-lg"
          onError={(e) => {
            e.currentTarget.src = logoFallback
          }}
        />
      </div>
      
      {/* Improved Running Figure Animation */}
      <RunningFigureAnimation />
      
      <span className="sr-only">Loading, please wait...</span>
    </div>
  )
}

// Separate component for the animation
const RunningFigureAnimation = () => {
  return (
    <div className="relative w-64 h-32 overflow-hidden">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 50" 
        width="256" 
        height="128"
        aria-label="Animated running figure with prosthetic leg"
        className="absolute left-1/2 transform -translate-x-1/2"
      >
        <style>
          {`
            @keyframes run {
              0% { transform: translateX(-100px); }
              100% { transform: translateX(100px); }
            }
            
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-2px); }
            }
            
            @keyframes shadowScale {
              0%, 100% { transform: scaleX(1); opacity: 0.2; }
              50% { transform: scaleX(0.8); opacity: 0.1; }
            }
            
            @keyframes leftLegSwing {
              0% { transform: rotate(-25deg); }
              50% { transform: rotate(15deg); }
              100% { transform: rotate(-25deg); }
            }
            
            @keyframes rightLegSwing {
              0% { transform: rotate(25deg); }
              50% { transform: rotate(-15deg); }
              100% { transform: rotate(25deg); }
            }
            
            /* Updated arm swings for right-moving direction */
            @keyframes leftArmSwing {
              0% { transform: rotate(-30deg); }
              50% { transform: rotate(30deg); }
              100% { transform: rotate(-30deg); }
            }
            
            @keyframes rightArmSwing {
              0% { transform: rotate(30deg); }
              50% { transform: rotate(-30deg); }
              100% { transform: rotate(30deg); }
            }
            
            .runner {
              animation: run 4s linear infinite;
            }
            
            .figure {
              animation: bounce 0.5s ease-in-out infinite;
            }
            
            .left-leg {
              transform-origin: 50% 35px;
              animation: leftLegSwing 0.5s ease-in-out infinite;
            }
            
            .right-leg {
              transform-origin: 50% 35px;
              animation: rightLegSwing 0.5s ease-in-out infinite;
            }
            
            .left-arm {
              transform-origin: 50% 22px;
              animation: leftArmSwing 0.5s ease-in-out infinite;
            }
            
            .right-arm {
              transform-origin: 50% 22px;
              animation: rightArmSwing 0.5s ease-in-out infinite;
            }
            
            .shadow {
              animation: shadowScale 0.5s ease-in-out infinite;
              transform-origin: center;
            }
          `}
        </style>
        
        {/* Shadow ellipse - moved inside runner group to follow movement */}
        <g className="runner">
          <ellipse 
            className="shadow" 
            cx="50" 
            cy="45" 
            rx="10" 
            ry="3" 
            fill="rgba(0,0,0,0.2)" 
          />
          
          <g className="figure">
            {/* Head */}
            <circle cx="50" cy="12" r="6" fill="#333" />
            
            {/* Body */}
            <line x1="50" y1="18" x2="50" y2="35" stroke="#333" strokeWidth="3" strokeLinecap="round" />
            
            {/* Arms - using groups to ensure proper connection */}
            <g className="left-arm">
              <line x1="50" y1="22" x2="40" y2="30" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g className="right-arm">
              <line x1="50" y1="22" x2="60" y2="30" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            </g>
            
            {/* Legs - using groups to ensure proper connection */}
            <g className="right-leg">
              <line x1="50" y1="35" x2="58" y2="45" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            </g>
            
            {/* Prosthetic leg (left) - using a group to ensure proper connection */}
            <g className="left-leg">
              <line x1="50" y1="35" x2="45" y2="40" stroke="#333" strokeWidth="2" strokeLinecap="round" />
              <line x1="45" y1="40" x2="42" y2="45" stroke="#20B2AA" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}

export default LoadingScreen