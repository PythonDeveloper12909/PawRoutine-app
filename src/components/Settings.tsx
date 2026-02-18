interface SettingsProps {
  user: {
    id: string
    name: string
    email: string
  }
}

export default function Settings({ user }: SettingsProps) {
  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('pets')
      localStorage.removeItem('routines')
      localStorage.removeItem('taskLogs')
      localStorage.removeItem('healthLogs')
      alert('All data cleared successfully. Please refresh the page.')
      window.location.reload()
    }
  }

  const exportData = () => {
    const data = {
      pets: JSON.parse(localStorage.getItem('pets') || '[]'),
      routines: JSON.parse(localStorage.getItem('routines') || '[]'),
      taskLogs: JSON.parse(localStorage.getItem('taskLogs') || '[]'),
      healthLogs: JSON.parse(localStorage.getItem('healthLogs') || '[]'),
      exportedAt: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pawroutine-backup-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Settings</h1>

      {/* User Profile */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">User Profile</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-2xl text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* App Information */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">App Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Version</span>
            <span className="font-medium text-gray-800">1.0.0</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Pets Registered</span>
            <span className="font-medium text-gray-800">
              {JSON.parse(localStorage.getItem('pets') || '[]').length}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">Total Routines</span>
            <span className="font-medium text-gray-800">
              {JSON.parse(localStorage.getItem('routines') || '[]').length}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Tasks Completed</span>
            <span className="font-medium text-gray-800">
              {JSON.parse(localStorage.getItem('taskLogs') || '[]').filter((l: any) => l.completed).length}
            </span>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h2>
        <div className="space-y-3">
          <button
            onClick={exportData}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition flex items-center justify-center gap-2"
          >
            <span>📥</span>
            Export Data
          </button>

          <button
            onClick={clearAllData}
            className="w-full px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition flex items-center justify-center gap-2"
          >
            <span>🗑️</span>
            Clear All Data
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Features</h2>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <span className="text-xl">✅</span>
            <div>
              <p className="font-medium text-green-800">Multi-Pet Support</p>
              <p className="text-green-700 text-xs">Manage multiple pets in one account</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <span className="text-xl">✅</span>
            <div>
              <p className="font-medium text-green-800">Smart Routines</p>
              <p className="text-green-700 text-xs">Daily & weekly task scheduling</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <span className="text-xl">✅</span>
            <div>
              <p className="font-medium text-green-800">Health Tracking</p>
              <p className="text-green-700 text-xs">Monitor mood, appetite, and energy levels</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <span className="text-xl">✅</span>
            <div>
              <p className="font-medium text-green-800">Analytics & Badges</p>
              <p className="text-green-700 text-xs">Track progress and earn achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-md p-6 text-center">
        <div className="text-5xl mb-3">🐾</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">PawRoutine</h3>
        <p className="text-gray-600 text-sm mb-4">
          Your complete pet care management solution
        </p>
        <p className="text-xs text-gray-500">
          Built with ❤️ for pet parents everywhere
        </p>
      </div>
    </div>
  )
}
