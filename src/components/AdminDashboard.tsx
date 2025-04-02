import React, { useState } from 'react';
import { PlusCircle, Calendar, MapPin, Tag, Image, FileText } from 'lucide-react';

interface EventFormData {
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  location: string;
}

interface AdminDashboardProps {
  onEventAdded: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onEventAdded }) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    date: '',
    category: '',
    image: '',
    description: '',
    location: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: '',
          date: '',
          category: '',
          image: '',
          description: '',
          location: ''
        });
        onEventAdded();
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Create and manage campus events</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <PlusCircle className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Create New Event</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <FileText className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Enter event title"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <Tag className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Career">Career</option>
                  <option value="Academic">Academic</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Enter event location"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <Image className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Enter image URL"
                />
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
              <FileText className="w-5 h-5 text-gray-500 mt-2" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  rows={4}
                  placeholder="Enter event description"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Create Event
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminDashboard;