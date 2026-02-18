export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface Pet {
  id: string
  userId: string
  name: string
  species: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  weight: number
  gender: 'male' | 'female'
  medicalNotes: string
  profileImage: string
  createdAt: string
}

export interface Routine {
  id: string
  petId: string
  title: string
  category: 'feeding' | 'walk' | 'medicine' | 'grooming' | 'playtime' | 'water' | 'custom'
  time: string
  frequency: 'daily' | 'weekly' | 'custom'
  daysOfWeek?: number[]
  notes?: string
  createdAt: string
}

export interface TaskLog {
  id: string
  routineId: string
  petId: string
  date: string
  completed: boolean
  completedAt?: string
}

export interface HealthLog {
  id: string
  petId: string
  mood: 'happy' | 'normal' | 'tired' | 'anxious' | 'sick'
  appetite: 'normal' | 'low' | 'high'
  weight?: number
  energyLevel: 'high' | 'normal' | 'low'
  notes?: string
  date: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
  earnedAt?: string
}
