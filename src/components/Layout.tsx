import { Outlet, Link, useLocation } from 'react-router-dom'

interface LayoutProps {
  onLogout: () => void
}

export default function Layout({ onLogout }: LayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: '🏠', label: 'Home' },
    { path: '/pets', icon: '🐾', label: 'Pets' },
    { path: '/logs', icon: '📊', label: 'Logs' },
    { path: '/analytics', icon: '📈', label: 'Analytics' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-xl">🐾</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">PawRoutine</h1>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-600 hover:text-red-500 transition px-4 py-2 rounded-lg hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition ${
                location.pathname === item.path
                  ? 'text-pink-500'
                  : 'text-gray-600 hover:text-pink-400'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Sidebar Navigation - Desktop */}
      <nav className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Adjust main content for desktop sidebar */}
      <style>{`
        @media (min-width: 768px) {
          main {
            margin-left: 16rem;
          }
        }
      `}</style>
    </div>
  )
}
