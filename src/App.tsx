import React, { useEffect, useState } from 'react';
import { Calendar, Users, MessageSquare } from 'lucide-react';
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from '@clerk/clerk-react';
import EventCard from './components/EventCard';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';

// Define the Event type
interface Event {
  _id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  location: string;
  registeredUsers: string[];
  createdAt?: string;
  updatedAt?: string;
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      // Check user's public metadata for admin role
      const userMetadata = user.publicMetadata;
      setIsAdmin(userMetadata?.role === 'admin');
      fetchEvents();
    }
  }, [user, isLoaded]);

  // Add useEffect to fetch registered events after events are loaded
  useEffect(() => {
    if (user && events.length > 0) {
      fetchUserRegisteredEvents();
    }
  }, [events, user]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchUserRegisteredEvents = async () => {
    if (!user) return;
    try {
      // Filter events that the user has registered for
      const userEvents = events.filter(event => 
        event.registeredUsers.includes(user.id)
      );
      setRegisteredEvents(userEvents);
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
  };

  const handleRegister = async (eventId: string) => {
    if (!user) return;
    try {
      console.log(`Registering for event: ${eventId}`);
      const response = await fetch(`http://localhost:5000/api/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });
      
      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <SignedIn>
        {isAdmin ? (
          <AdminDashboard onEventAdded={fetchEvents} />
        ) : (
          <main className="container mx-auto px-4 py-8">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Campus Connector</h1>
              <p className="text-lg text-gray-600">Discover and connect with exciting events happening around your campus.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <Calendar className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Browse Events</h3>
                <p className="text-gray-600">Explore upcoming events and register for those that interest you.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <Users className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Connect with Peers</h3>
                <p className="text-gray-600">Network with fellow students and event organizers.</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <MessageSquare className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Share Feedback</h3>
                <p className="text-gray-600">Help improve future events with your valuable feedback.</p>
              </div>
            </div>

            {registeredEvents.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Registered Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {registeredEvents.map(event => (
                    <EventCard 
                      key={event._id} 
                      event={event}
                      onRegister={() => {}}
                      isRegistered={true}
                    />
                  ))}
                </div>
              </section>
            )}

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                  <EventCard 
                    key={event._id} 
                    event={event}
                    onRegister={() => handleRegister(event._id)}
                    isRegistered={event.registeredUsers?.includes(user?.id)}
                  />
                ))}
              </div>
            </section>
          </main>
        )}
      </SignedIn>
      
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Campus Connector</h3>
              <p className="text-gray-400">Connecting students through meaningful events and experiences.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Events</li>
                <li>Contact</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <p className="text-gray-400">Follow us on social media for updates and announcements.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;