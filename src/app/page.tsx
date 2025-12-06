import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white bg-opacity-95 backdrop-blur shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">NexusConnect</h1>
          <div className="flex space-x-4">
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900">
              Log In
            </Link>
            <Link href="/auth/register" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
          Connect, Collaborate, Create
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          NexusConnect is a professional networking and collaboration platform designed for remote teams and freelancers to discover collaborators, form projects, and build meaningful professional relationships.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/auth/register" className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 text-lg font-medium">
            Get Started
          </Link>
          <Link href="/auth/login" className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 text-lg font-medium">
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Professional Networking
            </h3>
            <p className="text-gray-600">
              Connect with professionals, build your network, and discover new opportunities in your industry.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Project Management
            </h3>
            <p className="text-gray-600">
              Create projects, form teams, and collaborate with members. Share documents and track progress.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Portfolio & Profile
            </h3>
            <p className="text-gray-600">
              Showcase your skills and experience with a professional profile and portfolio section.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Document Sharing
            </h3>
            <p className="text-gray-600">
              Easily upload and share documents with your project team for better collaboration.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Secure Authentication
            </h3>
            <p className="text-gray-600">
              Your account is protected with industry-standard password hashing and JWT tokens.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Real-time Updates
            </h3>
            <p className="text-gray-600">
              Stay informed with instant notifications and updates on projects and connections.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Sign Up', desc: 'Create your account in minutes' },
              { step: 2, title: 'Build Profile', desc: 'Add your skills and experience' },
              { step: 3, title: 'Create Projects', desc: 'Start a new project or join existing ones' },
              { step: 4, title: 'Collaborate', desc: 'Work with your team and achieve goals' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-center mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of professionals already using NexusConnect
          </p>
          <Link href="/auth/register" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 text-lg font-bold">
            Create Your Account Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 NexusConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
