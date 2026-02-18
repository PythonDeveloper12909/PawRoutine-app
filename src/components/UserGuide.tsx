/**
 * PawRoutine User Guide
 * Quick start guide and feature overview for new users
 */

export default function UserGuide() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 px-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🐾</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to PawRoutine!</h1>
        <p className="text-gray-600">Your complete pet care management solution</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🚀</span> Getting Started
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Create an account or log in</li>
            <li>Add your first pet with details like name, breed, age, and weight</li>
            <li>Set up daily routines (feeding, walks, medicine, etc.)</li>
            <li>Track tasks daily and monitor your pet's health</li>
            <li>View analytics and earn achievement badges</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🐕</span> Managing Pets
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Add Pet:</strong> Go to Pets tab → Click "+ Add Pet" → Fill in details</li>
            <li><strong>Edit Pet:</strong> Click the ✏️ icon on any pet card</li>
            <li><strong>Medical Notes:</strong> Add important health information like allergies or medications</li>
            <li><strong>Multiple Pets:</strong> You can manage unlimited pets in one account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>📅</span> Setting Up Routines
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Categories:</strong> Choose from Feeding, Walk, Medicine, Grooming, Playtime, Water, or Custom</li>
            <li><strong>Frequency:</strong> Set tasks as Daily or Weekly</li>
            <li><strong>Time:</strong> Schedule specific times for each routine</li>
            <li><strong>Tips:</strong> Start with essential tasks (feeding, walks) then add more as needed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>✅</span> Daily Task Tracking
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Dashboard:</strong> Shows all tasks scheduled for today</li>
            <li><strong>Complete Tasks:</strong> Tap the circle to mark as done</li>
            <li><strong>Progress:</strong> Watch your completion percentage grow throughout the day</li>
            <li><strong>Missed Tasks:</strong> Incomplete tasks help you stay consistent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🏥</span> Health Logging
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Mood:</strong> Track your pet's emotional state (Happy, Normal, Tired, Anxious, Sick)</li>
            <li><strong>Appetite:</strong> Monitor eating habits (Low, Normal, High)</li>
            <li><strong>Energy:</strong> Record activity levels (Low, Normal, High)</li>
            <li><strong>Weight:</strong> Log weight changes to track growth or health issues</li>
            <li><strong>Notes:</strong> Add observations like unusual behavior or symptoms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>📊</span> Analytics & Insights
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Completion Rate:</strong> See your task completion percentage over the last 7 days</li>
            <li><strong>Streak Counter:</strong> Track consecutive days of completing tasks</li>
            <li><strong>Weekly Activity:</strong> Visual chart showing daily task completion</li>
            <li><strong>Category Performance:</strong> See which routine types you're most consistent with</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>🏆</span> Achievement Badges
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-3xl mb-2">🔥</div>
              <p className="font-semibold text-gray-800">7-Day Streak</p>
              <p className="text-sm text-gray-600">Complete tasks for 7 days</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-3xl mb-2">⭐</div>
              <p className="font-semibold text-gray-800">30-Day Streak</p>
              <p className="text-sm text-gray-600">Complete tasks for 30 days</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-3xl mb-2">💯</div>
              <p className="font-semibold text-gray-800">Perfect Week</p>
              <p className="text-sm text-gray-600">100% completion rate</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="text-3xl mb-2">🏆</div>
              <p className="font-semibold text-gray-800">Dedicated Parent</p>
              <p className="text-sm text-gray-600">80%+ completion rate</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>💡</span> Tips for Success
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Start with 3-5 essential routines, add more gradually</li>
            <li>✓ Set realistic times based on your schedule</li>
            <li>✓ Log health data weekly to spot trends</li>
            <li>✓ Use the notes field to track special observations</li>
            <li>✓ Export your data regularly as backup</li>
            <li>✓ Aim for consistency over perfection</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span>⚙️</span> Data Management
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Export Data:</strong> Settings → Export Data (saves as JSON file)</li>
            <li><strong>Clear Data:</strong> Settings → Clear All Data (use with caution!)</li>
            <li><strong>Privacy:</strong> All data is stored locally on your device</li>
          </ul>
        </section>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Need help? All your data is stored securely on your device.</p>
        <p className="mt-2">Happy pet parenting! 🐾</p>
      </div>
    </div>
  )
}
