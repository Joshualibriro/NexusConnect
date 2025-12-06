'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  category?: string;
  budget?: number;
  deadline?: string;
  ownerId: number;
}

interface Member {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  role: string;
  profilePicture?: string;
}

interface Document {
  id: number;
  fileName: string;
  fileSize: number;
  fileType: string;
  description?: string;
  createdAt: string;
}

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'documents'>('overview');
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

      const [projectRes, membersRes, docsRes] = await Promise.all([
        fetch(`/api/projects/${projectId}`, { headers }),
        fetch(`/api/projects/${projectId}/members`, { headers }),
        fetch(`/api/projects/${projectId}/documents`, { headers }),
      ]);

      if (!projectRes.ok) throw new Error('Project not found');

      const projectData = await projectRes.json();
      setProject(projectData);

      if (membersRes.ok) {
        setMembers(await membersRes.json());
      }

      if (docsRes.ok) {
        setDocuments(await docsRes.json());
      }
    } catch (err) {
      setError('Failed to load project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', '');

      const response = await fetch(`/api/projects/${projectId}/documents`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      await fetchProjectData();
    } catch (err) {
      setError('Failed to upload document');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!project) {
    return <div className="flex items-center justify-center min-h-screen">Project not found</div>;
  }

  const isOwner = userId && parseInt(userId) === project.ownerId;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button onClick={() => router.push('/dashboard')} className="text-indigo-600">
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Project Header */}
        <div className="bg-white rounded-lg shadow p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{project.name}</h1>
              {project.category && (
                <span className="inline-block mt-2 text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded">
                  {project.category}
                </span>
              )}
            </div>
            <span
              className={`text-sm px-3 py-1 rounded-full font-medium ${
                project.status === 'open'
                  ? 'bg-green-100 text-green-800'
                  : project.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {project.status.toUpperCase()}
            </span>
          </div>

          <p className="text-gray-600 mb-6">{project.description}</p>

          <div className="grid grid-cols-3 gap-4">
            {project.budget && (
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="text-lg font-semibold text-gray-900">${project.budget}</p>
              </div>
            )}
            {project.deadline && (
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500">Members</p>
              <p className="text-lg font-semibold text-gray-900">{members.length}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <div className="flex">
              {(['overview', 'members', 'documents'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize border-b-2 transition ${
                    activeTab === tab
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
                <p className="text-gray-600 mb-6">{project.description}</p>

                {isOwner && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-blue-800">
                      You are the project owner. You can add members and manage documents.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Team Members ({members.length})</h2>
                  {isOwner && (
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                      Add Member
                    </button>
                  )}
                </div>

                {members.length === 0 ? (
                  <p className="text-gray-600">No members yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {members.map((member) => (
                      <Link key={member.id} href={`/profile/${member.userId}`}>
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-indigo-200 rounded-full flex items-center justify-center text-lg font-bold text-indigo-800">
                              {member.firstName[0]}{member.lastName[0]}
                            </div>
                            <div className="ml-4">
                              <p className="font-semibold text-gray-900">
                                {member.firstName} {member.lastName}
                              </p>
                              <p className="text-sm text-gray-500 capitalize">{member.role}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Shared Documents</h2>
                  {token && (
                    <label className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer">
                      {uploading ? 'Uploading...' : 'Upload Document'}
                      <input
                        type="file"
                        onChange={handleDocumentUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {documents.length === 0 ? (
                  <p className="text-gray-600">No documents yet</p>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-900">{doc.fileName}</p>
                            {doc.description && (
                              <p className="text-sm text-gray-600">{doc.description}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              {(doc.fileSize / 1024 / 1024).toFixed(2)} MB •{' '}
                              {new Date(doc.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <a
                            href={`/documents/${doc.fileName}`}
                            download
                            className="text-indigo-600 hover:text-indigo-700"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
