import { useState, useEffect } from 'react'
import type { Pet } from '../types'

export default function PetManagement() {
  const [pets, setPets] = useState<Pet[]>([])
  const [showAddPet, setShowAddPet] = useState(false)
  const [editingPet, setEditingPet] = useState<Pet | null>(null)

  useEffect(() => {
    loadPets()
  }, [])

  const loadPets = () => {
    const stored = localStorage.getItem('pets')
    setPets(stored ? JSON.parse(stored) : [])
  }

  const deletePet = (id: string) => {
    if (confirm('Are you sure you want to delete this pet?')) {
      const updated = pets.filter(p => p.id !== id)
      setPets(updated)
      localStorage.setItem('pets', JSON.stringify(updated))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Pets</h1>
        <button
          onClick={() => setShowAddPet(true)}
          className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium hover:from-pink-500 hover:to-purple-600 transition shadow-lg text-sm md:text-base"
        >
          + Add Pet
        </button>
      </div>

      {pets.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 text-center">
          <div className="text-6xl md:text-8xl mb-4">🐾</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">No Pets Yet</h2>
          <p className="text-gray-600 mb-6">Add your first furry friend to start tracking their care</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {pets.map(pet => (
            <div key={pet.id} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
              <div className="flex items-start justify-between mb-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-pink-200">
                  {pet.profileImage ? (
                    <img
                      src={pet.profileImage}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-4xl">
                      {pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐈' : '🐾'}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingPet(pet)}
                    className="text-blue-500 hover:text-blue-600 p-2"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deletePet(pet.id)}
                    className="text-red-500 hover:text-red-600 p-2"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Species:</span>
                  <span className="font-medium text-gray-800 capitalize">{pet.species}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Breed:</span>
                  <span className="font-medium text-gray-800">{pet.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium text-gray-800">{pet.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium text-gray-800">{pet.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-medium text-gray-800 capitalize">{pet.gender}</span>
                </div>
              </div>

              {pet.medicalNotes && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs font-medium text-yellow-800 mb-1">Medical Notes:</p>
                  <p className="text-xs text-yellow-700">{pet.medicalNotes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {(showAddPet || editingPet) && (
        <PetFormModal
          pet={editingPet}
          onClose={() => {
            setShowAddPet(false)
            setEditingPet(null)
          }}
          onSave={() => {
            loadPets()
            setShowAddPet(false)
            setEditingPet(null)
          }}
        />
      )}
    </div>
  )
}

function PetFormModal({ pet, onClose, onSave }: { pet: Pet | null, onClose: () => void, onSave: () => void }) {
  const [name, setName] = useState(pet?.name || '')
  const [species, setSpecies] = useState<'dog' | 'cat' | 'other'>(pet?.species || 'dog')
  const [breed, setBreed] = useState(pet?.breed || '')
  const [age, setAge] = useState(pet?.age?.toString() || '')
  const [weight, setWeight] = useState(pet?.weight?.toString() || '')
  const [gender, setGender] = useState<'male' | 'female'>(pet?.gender || 'male')
  const [medicalNotes, setMedicalNotes] = useState(pet?.medicalNotes || '')
  const [profileImage, setProfileImage] = useState(pet?.profileImage || '')
  const [imagePreview, setImagePreview] = useState(pet?.profileImage || '')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setProfileImage(result)
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage('')
    setImagePreview('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const pets = JSON.parse(localStorage.getItem('pets') || '[]')

    if (pet) {
      const updated = pets.map((p: Pet) =>
        p.id === pet.id
          ? { ...p, name, species, breed, age: parseInt(age), weight: parseFloat(weight), gender, medicalNotes, profileImage }
          : p
      )
      localStorage.setItem('pets', JSON.stringify(updated))
    } else {
      const newPet: Pet = {
        id: Date.now().toString(),
        userId: user.id,
        name,
        species,
        breed,
        age: parseInt(age),
        weight: parseFloat(weight),
        gender,
        medicalNotes,
        profileImage,
        createdAt: new Date().toISOString()
      }
      pets.push(newPet)
      localStorage.setItem('pets', JSON.stringify(pets))
    }

    onSave()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md my-8">
        <h3 className="text-xl font-bold mb-4">{pet ? 'Edit Pet' : 'Add New Pet'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Profile Picture</label>
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-pink-200">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Pet preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-4xl">
                    {species === 'dog' ? '🐕' : species === 'cat' ? '🐈' : '🐾'}
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="pet-image-upload"
                  />
                  <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition cursor-pointer">
                    📸 Upload Photo
                  </span>
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="block px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
                  >
                    🗑️ Remove Photo
                  </button>
                )}
                <p className="text-xs text-gray-500">Max size: 5MB. JPG, PNG, GIF</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 focus:ring focus:ring-pink-200 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Species *</label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value as 'dog' | 'cat' | 'other')}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 outline-none"
            >
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Breed *</label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 focus:ring focus:ring-pink-200 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Age (years) *</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 focus:ring focus:ring-pink-200 outline-none"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Weight (kg) *</label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 focus:ring focus:ring-pink-200 outline-none"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender *</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Medical Notes</label>
            <textarea
              value={medicalNotes}
              onChange={(e) => setMedicalNotes(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-pink-400 focus:ring focus:ring-pink-200 outline-none"
              rows={3}
              placeholder="Allergies, medications, special care..."
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
              {pet ? 'Update' : 'Add'} Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
