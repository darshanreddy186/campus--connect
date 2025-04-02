import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx';
import './index.css';

const PUBLISHABLE_KEY ="pk_test_ZGVmaW5pdGUtYmVldGxlLTEuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  console.error("Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file");
  createRoot(document.getElementById('root')!).render(
    <div style={{ padding: '20px', maxWidth: '600px', margin: '40px auto' }}>
      <h1 style={{ color: '#E11D48', marginBottom: '16px' }}>Missing Clerk Configuration</h1>
      <p style={{ marginBottom: '16px' }}>
        To use Campus Connector, you need to add your Clerk publishable key to the <code>.env</code> file.
      </p>
      <ol style={{ marginLeft: '20px' }}>
        <li>Sign up at <a href="https://clerk.com" style={{ color: '#2563EB' }}>https://clerk.com</a></li>
        <li>Create a new application</li>
        <li>Copy your publishable key</li>
        <li>Add it to <code>.env</code> as <code>VITE_CLERK_PUBLISHABLE_KEY</code></li>
      </ol>
    </div>
  );
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ClerkProvider 
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          layout: {
            socialButtonsVariant: "iconButton",
            socialButtonsPlacement: "bottom"
          },
          elements: {
            formButtonPrimary: 
              "bg-blue-600 hover:bg-blue-700 text-white",
            socialButtonsIconButton: 
              "border border-gray-300 hover:border-gray-400"
          }
        }}
        navigate={(to) => window.location.href = to}
      >
        <App />
      </ClerkProvider>
    </StrictMode>
  );
}