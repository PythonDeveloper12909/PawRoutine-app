/**
 * Demo data initialization for PawRoutine
 * This script creates sample data for testing and demonstration purposes
 */

export const initializeDemoData = () => {
  // Only initialize if no pets exist
  const existingPets = localStorage.getItem('pets')
  if (existingPets && JSON.parse(existingPets).length > 0) {
    return
  }

  // Get current user
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user.id) return

  // Demo pets
  const demoPets = [
    {
      id: 'demo-pet-1',
      userId: user.id,
      name: 'Max',
      species: 'dog',
      breed: 'Golden Retriever',
      age: 3,
      weight: 30,
      gender: 'male',
      medicalNotes: 'Annual checkup due next month',
      profileImage: '',
      createdAt: new Date().toISOString()
    },
    {
      id: 'demo-pet-2',
      userId: user.id,
      name: 'Luna',
      species: 'cat',
      breed: 'Persian',
      age: 2,
      weight: 4.5,
      gender: 'female',
      medicalNotes: 'Sensitive to dairy products',
      profileImage: '',
      createdAt: new Date().toISOString()
    }
  ]

  // Demo routines for Max
  const demoRoutines = [
    {
      id: 'routine-1',
      petId: 'demo-pet-1',
      title: 'Morning Feeding',
      category: 'feeding',
      time: '08:00',
      frequency: 'daily',
      notes: '2 cups of dry food',
      createdAt: new Date().toISOString()
    },
    {
      id: 'routine-2',
      petId: 'demo-pet-1',
      title: 'Morning Walk',
      category: 'walk',
      time: '09:00',
      frequency: 'daily',
      notes: '30 minutes in the park',
      createdAt: new Date().toISOString()
    },
    {
      id: 'routine-3',
      petId: 'demo-pet-1',
      title: 'Evening Feeding',
      category: 'feeding',
      time: '18:00',
      frequency: 'daily',
      notes: '2 cups of dry food',
      createdAt: new Date().toISOString()
    },
    {
      id: 'routine-4',
      petId: 'demo-pet-2',
      title: 'Morning Feeding',
      category: 'feeding',
      time: '08:30',
      frequency: 'daily',
      notes: '1/2 cup wet food',
      createdAt: new Date().toISOString()
    },
    {
      id: 'routine-5',
      petId: 'demo-pet-2',
      title: 'Grooming',
      category: 'grooming',
      time: '10:00',
      frequency: 'weekly',
      daysOfWeek: [0, 3],
      notes: 'Brush fur',
      createdAt: new Date().toISOString()
    }
  ]

  // Demo task logs (last 3 days)
  const demoTaskLogs = []
  for (let i = 0; i < 3; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    demoRoutines.filter(r => r.frequency === 'daily').forEach(routine => {
      demoTaskLogs.push({
        id: `log-${routine.id}-${i}`,
        routineId: routine.id,
        petId: routine.petId,
        date: dateStr,
        completed: true,
        completedAt: new Date(date.getTime() + Math.random() * 86400000).toISOString()
      })
    })
  }

  // Demo health logs
  const demoHealthLogs = [
    {
      id: 'health-1',
      petId: 'demo-pet-1',
      mood: 'happy',
      appetite: 'normal',
      weight: 30,
      energyLevel: 'high',
      notes: 'Very playful today',
      date: new Date().toISOString()
    },
    {
      id: 'health-2',
      petId: 'demo-pet-2',
      mood: 'normal',
      appetite: 'normal',
      energyLevel: 'normal',
      notes: 'Slept most of the day',
      date: new Date().toISOString()
    }
  ]

  // Save to localStorage
  localStorage.setItem('pets', JSON.stringify(demoPets))
  localStorage.setItem('routines', JSON.stringify(demoRoutines))
  localStorage.setItem('taskLogs', JSON.stringify(demoTaskLogs))
  localStorage.setItem('healthLogs', JSON.stringify(demoHealthLogs))

  console.log('✅ Demo data initialized successfully!')
}

// Auto-initialize on first login
export const checkAndInitializeDemoData = () => {
  const hasDemoDataRun = localStorage.getItem('demoDataInitialized')
  if (!hasDemoDataRun) {
    initializeDemoData()
    localStorage.setItem('demoDataInitialized', 'true')
  }
}
