import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { ProfileProvider } from './context/ProfileContext'
import AuthTokenSync from './components/AuthTokenSync'
import './index.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.warn('Missing VITE_CLERK_PUBLISHABLE_KEY. Public pages will work, but admin authentication is disabled.')
}

const appTree = (
  <ProfileProvider>
    <App />
  </ProfileProvider>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        signInFallbackRedirectUrl="/admin"
        signUpFallbackRedirectUrl="/admin"
        afterSignOutUrl="/"
      >
        <AuthTokenSync />
        {appTree}
      </ClerkProvider>
    ) : (
      appTree
    )}
  </StrictMode>,
)
