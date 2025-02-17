export interface SiteConfig {
  name: string
  established: number
  university: string
  mission: string
  impact: {
    description: string
    fundingPerSemester: string
    prostheticLegsProvided: number
    livesChanged: number
  }
  colors: {
    navy: string
    teal: string
    maroon: string
    grayLight: string
    grayDark: string
  }
}

export interface Event {
  id: string
  title: string
  date: string
  endDate?: string
  description: string
  location: {
    name: string
    address: string
    city: string
    state: string
    zip: string
  }
  features?: string[]
  tickets?: {
    earlyBird?: {
      endDate: string
      options: {
        name: string
        price: number
        description?: string
      }[]
      note?: string
    }
    general?: {
      startDate: string
      endDate: string
      options: {
        name: string
        price: number
        description?: string
      }[]
      note?: string
    }
  }
  donationInfo?: {
    threshold: number
    benefit: string
    example: string
    deadline: string
    taxExemptEmail: string
    note?: string
  }
  gallery?: {
    url: string
    alt: string
  }[]
  outcome?: {
    amountRaised?: number
    [key: string]: string | number | undefined
  }
}

export interface Angel {
  id: string
  name: string
  story: string
  details?: {
    [key: string]: string
  }
  imageUrl?: string
  type?: string
  date?: string
  secondDate?: string
  gallery?: {
    url: string
    alt: string
    caption?: string
  }[]
}

export interface Committee {
  id: string
  name: string
  description: string
  responsibilities: string[]
  imageUrl: string
  achievements?: string[]
}

export interface Officer {
  name: string
  position: string
  major: string
  email: string
  image?: string
}

export interface SocialMedia {
  facebook: string
  instagram: string
  twitter: string
}

export interface StoreItem {
  url: string
  alt: string
}

export interface Store {
  info: string
  shippingNote: string
  link: string
  gallery: StoreItem[]
}

export interface Contribution {
  description: string
  formLink: string
}

export interface CMSData {
  siteInfo: SiteConfig
  navigation: { name: string; path: string }[]
  pages: {
    home: {
      heroImage: string
      impactImages: string[]
    }
    ourAngels: {
      angels: Angel[]
    }
    events: {
      upcoming: Event[]
      past: Event[]
    }
    members: {
      recruitment: {
        semester: string
        events: {
          name: string
          date: string
          time?: string
          location?: string
        }[]
      }
      applicationInfo: string
      faq: {
        question: string
        answer: string
      }[]
    }
    committees: Committee[]
    officers: Officer[]
    contribute: {
      generalDonation: Contribution
      eventSponsorship: Contribution
    }
    store: Store
  }
  socialMedia: SocialMedia
}

