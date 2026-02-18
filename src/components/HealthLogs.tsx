import { useState, useEffect } from 'react'
import type { Pet, HealthLog } from '../types'

export default function HealthLogs() {
  const [pets, setPets] = useState<Pet[]>([])
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [healthLogs, setHealthLogs] = useState<HealthLog[]>([])
  const [showAddLog, setShowAddLog] = useState(false)

  useEffect(() => {
    loadPets()
    loadHealthLogs()
  }, [])

  useEffect(() => {
    if (selectedPet) {
      filterLogs(selectedPet.id)
    }
  }, [selectedPet, healthLogs])

  const loadPets = () => {
    const stored = localStorage.getItem('pets')
    const petList = stored ? JSON.parse(stored) : []
    setPets(petList)
    if (petList.length > 0 && !selectedPet) {
      setSelectedPet(petList[0])
    }
  }

  const loadHealthLogs = () => {
    const stored = localStorage.getItem('healthLogs')
    setHealthLogs(stored ? JSON.parse(stored) : [])
  }

  const [filteredLogs, setFilteredLogs] = useState<HealthLog[]>([])

  const filterLogs = (petId: string) => {
    const logs = healthLogs.filter(l => l.petId === petId)
    logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setFilteredLogs(logs)
  }

  const getWeeklyTrend = () => {
    const lastWeek = filteredLogs.slice(0, 7)
    if (lastWeek.length === 0) return 'No data'

    const happyCount = lastWeek.filter(l => l.mood === 'happy').length
    const normalCount = lastWeek.filter(l => l.mood === 'normal').length

    if (happyCount > normalCount) return '📈 Positive'
    if (normalCount > happyCount) return '➡️ Stable'
    return '📉 Needs attention'
  }

  const moodIcons = {
    happy: '😊',
    normal: '😐',
    tired: '😴',
    anxious: '😰',
    sick: '🤒'
  }

  const appetiteIcons = {
    high: '🍖🍖🍖',
    normal: '🍖🍖',
    low: '🍖'
  }

  const energyIcons = {
    high: '⚡⚡⚡',
    normal: '⚡⚡',
    low: '⚡'
  }

  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Pets Yet</h2>
        <p className="text-gray-600">Add a pet first to start logging health data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Health Logs</h1>
        <button
          onClick={() => setShowAddLog(true)}
          className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-pink-500 hover:to-purple-600 transition shadow-lg"
        >
          + Log Health
        </button>
      </div>

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
          {/* Weekly Trend */}
          <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl shadow-md p-6 text-white">
            <h2 className="text-lg font-semibold mb-2">Weekly Trend</h2>
            <p className="text-2xl font-bold">{getWeeklyTrend()}</p>
            <p className="text-blue-100 text-sm mt-1">Based on last 7 days</p>
          </div>

          {/* Health Logs List */}
          <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Health History</h2>

            {filteredLogs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No health logs yet. Start tracking!</p>
            ) : (
              <div className="space-y-4">
                {filteredLogs.map(log => (
                  <div
                    key={log.id}
                    className="border-2 border-gray-200 rounded-xl p-4 hover:border-pink-300 transition"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {new Date(log.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className="text-3xl">{moodIcons[log.mood]}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600 text-xs mb-1">Mood</p>
                        <p className="font-medium text-gray-800 capitalize">{log.mood}</p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600 text-xs mb-1">Appetite</p>
                        <p className="font-medium text-gray-800">{appetiteIcons[log.appetite]}</p>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600 text-xs mb-1">Energy</p>
                        <p className="font-medium text-gray-800">{energyIcons[log.energyLevel]}</p>
                      </div>

                      {log.weight && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-gray-600 text-xs mb-1">Weight</p>
                          <p className="font-medium text-gray-800">{log.weight} kg</p>
                        </div>
                      )}
                    </div>

                    {log.notes && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs font-medium text-blue-800 mb-1">Notes:</p>
                        <p className="text-sm text-blue-700">{log.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {showAddLog && selectedPet && (
        <HealthLogModal
          petId={selectedPet.id}
          onClose={() => setShowAddLog(false)}
          onSave={() => {
            loadHealthLogs()
            setShowAddLog(false)
          }}
        />
      )}
    </div>
  )
}

function HealthLogModal({ petId, onClose, onSave }: { petId: string, onClose: () => void, onSave: () => void }) {
  const [mood, setMood] = useState<HealthLog['mood']>('normal')
  const [appetite, setAppetite] = useState<HealthLog['appetite']>('normal')
  const [energyLevel, setEnergyLevel] = useState<HealthLog['energyLevel']>('normal')
  const [weight, setWeight] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const logs = JSON.parse(localStorage.getItem('healthLogs') || '[]')
    const newLog: HealthLog = {
      id: Date.now().toString(),
      petId,
      mood,
      appetite,
      weight: weight ? parseFloat(weight) : undefined,
      energyLevel,
      notes,
      date: new Date().toISOString()
    }

    logs.push(newLog)
    localStorage.setItem('healthLogs', JSON.stringify(logs))
    onSave()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md my-8">
        <h3 className="text-xl font-bold mb-4">Log Health Status</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Mood</label>
            <div className="grid grid-cols-5 gap-2">
              {(['happy', 'normal', 'tired', 'anxious', 'sick'] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  className={`p-3 rounded-xl border-2 transition ${
                    mood === m ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <span className="text-2xl">
                    {m === 'happy' ? '😊' : m === 'normal' ? '😐' : m === 'tired' ? '😴' : m === 'anxious' ? '😰' : '🤒'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Appetite</label>
            <div className="grid grid-cols-3 gap-3">
              {(['low', 'normal', 'high'] as const).map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAppetite(a)}
                  className={`p-3 rounded-xl border-2 transition text-center ${
                    appetite === a ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <p className="text-sm font-medium capitalize mb-1">{a}</p>
                  <p className="text-xl">{a === 'low' ? '🍖' : a === 'normal' ? '🍖🍖' : '🍖🍖🍖'}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Energy Level</label>
            <div className="grid grid-cols-3 gap-3">
              {(['low', 'normal', 'high'] as const).map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEnergyLevel(e)}
                  className={`p-3 rounded-xl border-2 transition text-center ${
                    energyLevel === e ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <p className="text-sm font-medium capitalize mb-1">{e}</p>
                  <p className="text-xl">{e === 'low' ? '⚡' : e === 'normal' ? '⚡⚡' : '⚡⚡⚡'}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Weight (kg) - Optional</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 focus:ring focus:ring-pink-200 outline-none"
              placeholder="Current weight"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notes - Optional</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 focus:ring focus:ring-pink-200 outline-none"
              rows={3}
              placeholder="Any observations, symptoms, or special notes..."
            />
          </div>

          <div className="flex gap-3 pt-2">
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
              Save Log
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
