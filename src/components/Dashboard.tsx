import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { Pet, Routine, TaskLog } from '../types'

export default function Dashboard() {
  const [pets, setPets] = useState<Pet[]>([])
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [routines, setRoutines] = useState<Routine[]>([])
  const [taskLogs, setTaskLogs] = useState<TaskLog[]>([])
  const [showAddRoutine, setShowAddRoutine] = useState(false)

  useEffect(() => {
    loadPets()
    loadTaskLogs()
  }, [])

  useEffect(() => {
    if (selectedPet) {
      loadRoutines(selectedPet.id)
    }
  }, [selectedPet])

  const loadPets = () => {
    const stored = localStorage.getItem('pets')
    const petList = stored ? JSON.parse(stored) : []
    setPets(petList)
    if (petList.length > 0 && !selectedPet) {
      setSelectedPet(petList[0])
    }
  }

  const loadRoutines = (petId: string) => {
    const stored = localStorage.getItem('routines')
    const all = stored ? JSON.parse(stored) : []
    setRoutines(all.filter((r: Routine) => r.petId === petId))
  }

  const loadTaskLogs = () => {
    const stored = localStorage.getItem('taskLogs')
    setTaskLogs(stored ? JSON.parse(stored) : [])
  }

  const getTodayTasks = () => {
    if (!selectedPet) return []
    const today = new Date().toISOString().split('T')[0]
    const dayOfWeek = new Date().getDay()

    return routines.filter(routine => {
      if (routine.frequency === 'daily') return true
      if (routine.frequency === 'weekly' && routine.daysOfWeek?.includes(dayOfWeek)) return true
      return false
    }).map(routine => {
      const log = taskLogs.find(
        l => l.routineId === routine.id && l.date === today
      )
      return { routine, completed: log?.completed || false, logId: log?.id }
    })
  }

  const toggleTask = (routineId: string, logId?: string) => {
    const today = new Date().toISOString().split('T')[0]
    let logs = [...taskLogs]

    if (logId) {
      logs = logs.map(l =>
        l.id === logId ? { ...l, completed: !l.completed, completedAt: !l.completed ? new Date().toISOString() : undefined } : l
      )
    } else {
      const newLog: TaskLog = {
        id: Date.now().toString(),
        routineId,
        petId: selectedPet!.id,
        date: today,
        completed: true,
        completedAt: new Date().toISOString()
      }
      logs.push(newLog)
    }

    setTaskLogs(logs)
    localStorage.setItem('taskLogs', JSON.stringify(logs))
  }

  const todayTasks = getTodayTasks()
  const completedCount = todayTasks.filter(t => t.completed).length
  const completionPercentage = todayTasks.length > 0 ? Math.round((completedCount / todayTasks.length) * 100) : 0

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
        <div className="text-6xl mb-4">🐾</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Pets Yet</h2>
        <p className="text-gray-600 mb-6">Add your first pet to get started</p>
        <Link
          to="/pets"
          className="inline-block bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-pink-500 hover:to-purple-600 transition shadow-lg"
        >
          Add Pet
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
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
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-200 mb-2">
                {pet.profileImage ? (
                  <img
                    src={pet.profileImage}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-3xl">
                    {pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐈' : '🐾'}
                  </div>
                )}
              </div>
              <p className="font-medium text-gray-800 text-sm">{pet.name}</p>
              <p className="text-xs text-gray-500">{pet.breed}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Progress */}
      {selectedPet && (
        <>
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl shadow-md p-6 text-white">
            <h2 className="text-xl font-bold mb-2">Today's Progress</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{completionPercentage}%</p>
                <p className="text-pink-100">{completedCount} of {todayTasks.length} tasks completed</p>
              </div>
              <div className="text-6xl">{completionPercentage === 100 ? '🎉' : '⏳'}</div>
            </div>
          </div>

          {/* Today's Tasks */}
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Today's Tasks</h2>
              <button
                onClick={() => setShowAddRoutine(!showAddRoutine)}
                className="text-pink-500 hover:text-pink-600 font-medium text-sm"
              >
                + Add Routine
              </button>
            </div>

            {todayTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No tasks scheduled for today</p>
            ) : (
              <div className="space-y-3">
                {todayTasks.map(({ routine, completed, logId }) => (
                  <div
                    key={routine.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition ${
                      completed ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <button
                      onClick={() => toggleTask(routine.id, logId)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                        completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-pink-400'
                      }`}
                    >
                      {completed && <span className="text-white text-sm">✓</span>}
                    </button>
                    <span className="text-2xl">{categoryIcons[routine.category]}</span>
                    <div className="flex-1">
                      <p className={`font-medium ${completed ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                        {routine.title}
                      </p>
                      <p className="text-sm text-gray-500">{routine.time} • {routine.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {showAddRoutine && (
            <AddRoutineModal
              petId={selectedPet.id}
              onClose={() => setShowAddRoutine(false)}
              onSave={() => {
                loadRoutines(selectedPet.id)
                setShowAddRoutine(false)
              }}
            />
          )}
        </>
      )}
    </div>
  )
}

function AddRoutineModal({ petId, onClose, onSave }: { petId: string, onClose: () => void, onSave: () => void }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Routine['category']>('feeding')
  const [time, setTime] = useState('08:00')
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const routines = JSON.parse(localStorage.getItem('routines') || '[]')
    const newRoutine: Routine = {
      id: Date.now().toString(),
      petId,
      title,
      category,
      time,
      frequency,
      createdAt: new Date().toISOString()
    }
    routines.push(newRoutine)
    localStorage.setItem('routines', JSON.stringify(routines))
    onSave()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Add New Routine</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 focus:ring focus:ring-pink-200 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Routine['category'])}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 outline-none"
            >
              <option value="feeding">Feeding</option>
              <option value="walk">Walk</option>
              <option value="medicine">Medicine</option>
              <option value="grooming">Grooming</option>
              <option value="playtime">Playtime</option>
              <option value="water">Water</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 outline-none"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-xl hover:from-pink-500 hover:to-purple-600 transition"
            >
              Add Routine
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
