const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value
}

export const ENV = {
  SITE_URL: getEnvVariable("NEXT_PUBLIC_SITE_URL"),
}

export const SITE_CONFIG = {
  name: "Aggies for Limbs",
  established: 2016,
  university: "Texas A&M University",
  mission:
    "Our mission, in Aggies for Limbs, is to raise money for the local non-profit called Ashton's Angels, which provides prosthetics for those who cannot afford them. Their purpose is to get people back up on their feet so they can continue providing for themselves and their families!",
  impact: {
    fundingPerSemester: "5,000+",
    prostheticLegsProvided: 9,
    livesChanged: 10,
  },
  colors: {
    navy: "#03204D",
    teal: "#00B2CA",
    maroon: "#500000",
    grayLight: "#F5F7FA",
    grayDark: "#2D3748",
  },
}

export const APP_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  API_ENDPOINTS: {
    EVENTS: "/api/events",
    DONATIONS: "/api/donations",
    CONTACT: "/api/contact",
  },
  DEFAULT_IMAGE_DIMENSIONS: {
    width: 1200,
    height: 630,
  },
  FEATURES: {
    ENABLE_DARK_MODE: false,
    ENABLE_ANALYTICS: process.env.NODE_ENV === "production",
  },
}

export function getImageDimensions(type: "thumbnail" | "hero" | "card") {
  switch (type) {
    case "thumbnail":
      return { width: 150, height: 150 }
    case "hero":
      return { width: 1920, height: 1080 }
    case "card":
      return { width: 400, height: 300 }
    default:
      return APP_CONFIG.DEFAULT_IMAGE_DIMENSIONS
  }
}

