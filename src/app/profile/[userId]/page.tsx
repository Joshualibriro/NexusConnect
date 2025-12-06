'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  title?: string;
  bio?: string;
  profilePicture?: string;
  location?: string;
  skills?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    bio: '',
    location: '',
    skills: '',
  });

  const currentUserId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const isOwnProfile = currentUserId === userId;

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data);
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        title: data.title || '',
        bio: data.bio || '',
        location: data.location || '',
        skills: data.skills || '',
      });
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploadingImage(true);

    try {
      const formDataFile = new FormData();
      formDataFile.append('file', file);
      formDataFile.append('type', 'profile');

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataFile,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setProfile((prev) => prev ? { ...prev, profilePicture: data.url } : null);
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setProfile((prev) => prev ? { ...prev, ...formData } : null);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!profile) {
    return <div className="flex items-center justify-center min-h-screen">Profile not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button onClick={() => router.push('/dashboard')} className="text-indigo-600">
            ← Back
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Profile Picture */}
          <div className="flex items-center mb-8">
            <div className="relative w-32 h-32">
              {profile.profilePicture ? (
                <Image
                  src={profile.profilePicture}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-indigo-200 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-800">
                  {profile.firstName[0]}{profile.lastName[0]}
                </div>
              )}
            </div>
            {isOwnProfile && (
              <div className="ml-6">
                <label className="inline-block bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700">
                  {uploadingImage ? 'Uploading...' : 'Change Picture'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImage}
                  />
                </label>
              </div>
            )}
          </div>

          {!isEditing ? (
            <div>
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h1>
                {profile.title && (
                  <p className="text-xl text-gray-600">{profile.title}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{profile.email}</p>
                </div>
                {profile.location && (
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">{profile.location}</p>
                  </div>
                )}
              </div>

              {profile.bio && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Bio</p>
                  <p className="text-gray-900">{profile.bio}</p>
                </div>
              )}

              {profile.skills && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.split(',').map((skill, idx) => (
                      <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {isOwnProfile && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
