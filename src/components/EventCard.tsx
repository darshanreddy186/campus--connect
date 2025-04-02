import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  location: string;
  registeredUsers?: string[];
}

interface EventCardProps {
  event: Event;
  onRegister: () => void;
  isRegistered: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister, isRegistered }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02] border border-gray-100">
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-600">
          {event.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {event.date}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
        </div>
        
        <button 
          onClick={onRegister}
          disabled={isRegistered}
          className={`w-full py-2 rounded-lg transition duration-200 ${
            isRegistered 
              ? 'bg-green-600 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isRegistered ? 'Registered' : 'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;