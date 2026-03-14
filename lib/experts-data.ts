export const EXPERT_CATEGORIES_FILTER = ["All", "Lawyer", "Study Abroad", "Islamic Scholar", "Doctor"] as const

export type ExpertItem = {
  id: string
  name: string
  category: string
  rating: number
  sessions: number
  duration: string
  price: string
  image: string
  bio: string
}

export const DEMO_EXPERTS: ExpertItem[] = [
  {
    id: "1",
    name: "Adv. Rahman",
    category: "Lawyer",
    rating: 4.9,
    sessions: 200,
    duration: "30 min",
    price: "800 BDT",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "Civil & family law, 10+ years experience.",
  },
  {
    id: "2",
    name: "Dr. Fatima Khan",
    category: "Study Abroad",
    rating: 4.8,
    sessions: 150,
    duration: "45 min",
    price: "1,200 BDT",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    bio: "UK, Australia, Canada admissions expert.",
  },
  {
    id: "3",
    name: "Maulana Abdullah",
    category: "Islamic Scholar",
    rating: 4.95,
    sessions: 320,
    duration: "30 min",
    price: "600 BDT",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Fiqh, family & spiritual guidance.",
  },
  {
    id: "4",
    name: "Dr. Sameera Ahmed",
    category: "Doctor",
    rating: 4.7,
    sessions: 180,
    duration: "15 min",
    price: "500 BDT",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    bio: "General physician, online consultation.",
  },
  {
    id: "5",
    name: "Barrister Tariq",
    category: "Lawyer",
    rating: 4.85,
    sessions: 95,
    duration: "45 min",
    price: "1,500 BDT",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Corporate & immigration law.",
  },
  {
    id: "6",
    name: "Sarah Islam",
    category: "Study Abroad",
    rating: 4.75,
    sessions: 120,
    duration: "45 min",
    price: "1,000 BDT",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "USA, Europe university applications.",
  },
]
