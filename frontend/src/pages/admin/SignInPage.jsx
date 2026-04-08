import { SignIn } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import './SignInPage.css';

const SignInPage = () => {
    const isClerkConfigured = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
    const redirectUrl = new URLSearchParams(window.location.search).get('redirect_url') || '/admin';
    const signUpUrl = `/sign-up?redirect_url=${encodeURIComponent(redirectUrl)}`;

    if (!isClerkConfigured) {
        return (
            <div className="clerk-auth-container">
                <div style={{ color: 'white', textAlign: 'center', zIndex: 10, position: 'relative' }}>
                    Clerk is not configured. Add `VITE_CLERK_PUBLISHABLE_KEY` to enable admin sign-in.
                </div>
            </div>
        );
    }

    return (
        <div className="clerk-auth-container">
            {/* Reuse background ambient shapes from App.css */}
            <div className="bg-shape bg-shape-1" aria-hidden="true" />
            <div className="bg-shape bg-shape-2" aria-hidden="true" />
            <div className="bg-shape bg-shape-3" aria-hidden="true" />

            <div style={{ position: 'relative', zIndex: 10 }}>
                <SignIn
                    routing="path"
                    path="/sign-in"
                    signUpUrl={signUpUrl}
                    fallbackRedirectUrl={redirectUrl}
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            card: "clerk-glass-card",
                            headerTitle: "clerk-header-title",
                            headerSubtitle: "clerk-header-subtitle",
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default SignInPage;
