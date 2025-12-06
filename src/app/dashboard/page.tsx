'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  category?: string;
  budget?: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      router.push('/auth/login');
      return;
    }

    setUser({ id: userId, email: localStorage.getItem('email') });
    fetchProjects(token);
  }, [router]);

  const fetchProjects = async (token: string) => {
    try {
      const response = await fetch('/api/projects', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/auth/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">NexusConnect</h1>
          <div className="flex items-center space-x-4">
            <Link href={`/profile/${user.id}`} className="text-indigo-600 hover:text-indigo-700">
              Profile
            </Link>
            <Link href="/projects/create" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Create Project
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-600">
            Discover and join exciting projects, connect with professionals
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading projects...</div>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Projects
            </h3>

            {projects.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600 mb-4">No projects available yet</p>
                <Link
                  href="/projects/create"
                  className="inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                >
                  Create the first project
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Link key={project.id} href={`/projects/${project.id}`}>
                    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {project.name}
                        </h4>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          project.status === 'open' ? 'bg-green-100 text-green-800' :
                          project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex justify-between items-center">
                        {project.category && (
                          <span className="text-xs text-gray-500">
                            {project.category}
                          </span>
                        )}
                        {project.budget && (
                          <span className="text-sm font-medium text-indigo-600">
                            ${project.budget}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
