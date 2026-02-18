import { useState, useEffect } from 'react'
import type { Pet, TaskLog, Badge } from '../types'

export default function Analytics() {
  const [pets, setPets] = useState<Pet[]>([])
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [taskLogs, setTaskLogs] = useState<TaskLog[]>([])
  const [badges, setBadges] = useState<Badge[]>([])

  useEffect(() => {
    loadPets()
    loadTaskLogs()
  }, [])

  useEffect(() => {
    if (selectedPet) {
      calculateBadges()
    }
  }, [selectedPet, taskLogs])

  const loadPets = () => {
    const stored = localStorage.getItem('pets')
    const petList = stored ? JSON.parse(stored) : []
    setPets(petList)
    if (petList.length > 0 && !selectedPet) {
      setSelectedPet(petList[0])
    }
  }

  const loadTaskLogs = () => {
    const stored = localStorage.getItem('taskLogs')
    setTaskLogs(stored ? JSON.parse(stored) : [])
  }

  const getPetLogs = () => {
    if (!selectedPet) return []
    return taskLogs.filter(l => l.petId === selectedPet.id && l.completed)
  }

  const getCompletionRate = () => {
    const logs = getPetLogs()
    const routines = JSON.parse(localStorage.getItem('routines') || '[]')
    const petRoutines = routines.filter((r: any) => r.petId === selectedPet?.id)

    if (petRoutines.length === 0) return 0

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)
      return d.toISOString().split('T')[0]
    })

    let totalExpected = petRoutines.length * 7
    let totalCompleted = logs.filter(l => last7Days.includes(l.date)).length

    return Math.round((totalCompleted / totalExpected) * 100) || 0
  }

  const getCurrentStreak = () => {
    const logs = getPetLogs()
    if (logs.length === 0) return 0

    const dates = [...new Set(logs.map(l => l.date))].sort().reverse()
    let streak = 0
    let currentDate = new Date()

    for (let date of dates) {
      const logDate = new Date(date)
      const diffDays = Math.floor((currentDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays === streak) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  const getWeeklyActivity = () => {
    const logs = getPetLogs()
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)
      return d.toISOString().split('T')[0]
    }).reverse()

    return last7Days.map(date => {
      const count = logs.filter(l => l.date === date).length
      return { date, count }
    })
  }

  const getCategoryStats = () => {
    const logs = getPetLogs()
    const routines = JSON.parse(localStorage.getItem('routines') || '[]')

    const categories = ['feeding', 'walk', 'medicine', 'grooming', 'playtime', 'water', 'custom']
    return categories.map(category => {
      const categoryRoutines = routines.filter((r: any) => r.category === category && r.petId === selectedPet?.id)
      const categoryLogs = logs.filter(l => {
        const routine = routines.find((r: any) => r.id === l.routineId)
        return routine?.category === category
      })

      const percentage = categoryRoutines.length > 0
        ? Math.round((categoryLogs.length / (categoryRoutines.length * 7)) * 100)
        : 0

      return { category, percentage, count: categoryLogs.length }
    }).filter(s => s.count > 0)
  }

  const calculateBadges = () => {
    const streak = getCurrentStreak()
    const completionRate = getCompletionRate()

    const allBadges: Badge[] = [
      {
        id: '7day',
        name: '7-Day Streak',
        description: 'Complete tasks for 7 consecutive days',
        icon: '🔥',
        earned: streak >= 7,
        earnedAt: streak >= 7 ? new Date().toISOString() : undefined
      },
      {
        id: '30day',
        name: '30-Day Streak',
        description: 'Complete tasks for 30 consecutive days',
        icon: '⭐',
        earned: streak >= 30,
        earnedAt: streak >= 30 ? new Date().toISOString() : undefined
      },
      {
        id: 'perfect_week',
        name: 'Perfect Week',
        description: 'Achieve 100% completion rate for a week',
        icon: '💯',
        earned: completionRate === 100,
        earnedAt: completionRate === 100 ? new Date().toISOString() : undefined
      },
      {
        id: 'dedicated',
        name: 'Dedicated Parent',
        description: 'Maintain 80%+ completion rate',
        icon: '🏆',
        earned: completionRate >= 80,
        earnedAt: completionRate >= 80 ? new Date().toISOString() : undefined
      }
    ]

    setBadges(allBadges)
  }

  const categoryIcons: Record<string, string> = {
    feeding: '🍖',
    walk: '🚶',
    medicine: '💊',
    grooming: '✂️',
    playtime: '🎾',
    water: '💧',
    custom: '📝'
  }

  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📈</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Pets Yet</h2>
        <p className="text-gray-600">Add a pet first to view analytics</p>
      </div>
    )
  }

  const weeklyActivity = getWeeklyActivity()
  const categoryStats = getCategoryStats()
  const completionRate = getCompletionRate()
  const streak = getCurrentStreak()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Analytics</h1>

      {/* Pet Selector */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Pet</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {pets.map(pet => (
            <button
              key={pet.id}
              onClick={() => setSelectedPet(pet)}
              className={`flex-shrink-0 p-4 rounded-xl border-2 transition ${
                selectedPet?.id === pet.id
                  ? 'border-pink-400 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300'
              }`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-200 mb-2">
                {pet.profileImage ? (
                  <img
                    src={pet.profileImage}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-2xl">
                    {pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐈' : '🐾'}
                  </div>
                )}
              </div>
              <p className="font-medium text-gray-800 text-sm">{pet.name}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedPet && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl shadow-md p-6 text-white">
              <p className="text-sm opacity-90 mb-1">Completion Rate</p>
              <p className="text-4xl font-bold">{completionRate}%</p>
              <p className="text-xs opacity-80 mt-1">Last 7 days</p>
            </div>

            <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl shadow-md p-6 text-white">
              <p className="text-sm opacity-90 mb-1">Current Streak</p>
              <p className="text-4xl font-bold">{streak}</p>
              <p className="text-xs opacity-80 mt-1">Days in a row</p>
            </div>

            <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl shadow-md p-6 text-white col-span-2 md:col-span-1">
              <p className="text-sm opacity-90 mb-1">Total Tasks</p>
              <p className="text-4xl font-bold">{getPetLogs().length}</p>
              <p className="text-xs opacity-80 mt-1">Completed</p>
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Activity</h2>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyActivity.map(({ date, count }) => {
                const maxCount = Math.max(...weeklyActivity.map(w => w.count), 1)
                const height = (count / maxCount) * 100

                return (
                  <div key={date} className="flex-1 flex flex-col items-center">
                    <div className="relative w-full flex-1 flex items-end">
                      <div
                        className="w-full bg-gradient-to-t from-pink-400 to-purple-500 rounded-t-lg transition-all"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </p>
                    <p className="text-xs font-bold text-gray-800">{count}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Category Performance */}
          {categoryStats.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Category Performance</h2>
              <div className="space-y-4">
                {categoryStats.map(({ category, percentage, count }) => (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{categoryIcons[category]}</span>
                        <span className="font-medium text-gray-800 capitalize">{category}</span>
                      </div>
                      <span className="text-sm text-gray-600">{count} tasks • {percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map(badge => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border-2 text-center transition ${
                    badge.earned
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50 opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">{badge.name}</p>
                  <p className="text-xs text-gray-600">{badge.description}</p>
                  {badge.earned && (
                    <p className="text-xs text-green-600 font-medium mt-2">✓ Earned</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
