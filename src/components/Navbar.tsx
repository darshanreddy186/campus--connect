import React from 'react';
import { Bell } from 'lucide-react';
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">Campus Connector</h1>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Events</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isSignedIn && (
              <>
                <span className="text-gray-600">
                  Welcome, {user?.firstName || 'User'}!
                </span>
                <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>
              </>
            )}
            
            {isSignedIn ? (
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                  <span>Sign In</span>
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;