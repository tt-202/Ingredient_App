'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn, signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

type AuthMode = 'login' | 'signup';

interface AuthFormProps {
    mode: AuthMode;
}

export default function AuthForm({ mode }: AuthFormProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [verificationSent, setVerificationSent] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);

    // Make sure we always have a valid callback URL
    const callbackUrl = typeof process.env.NEXT_PUBLIC_BETTER_AUTH_URL === 'string'
        ? process.env.NEXT_PUBLIC_BETTER_AUTH_URL
        : 'http://localhost:3000';

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setError(null);
        setValidationError(null);

        console.log('Starting email authentication process...');
        console.log('Mode:', mode);
        console.log('Email:', email);
        console.log('CallbackURL being used:', callbackUrl);

        try {
            if (mode === 'login') {
                const { error: signInError } = await signIn.email({
                    email,
                    password,
                    callbackURL: callbackUrl
                });

                if (signInError) {
                    throw new Error(signInError.message);
                }

                router.push('/');
            } else {
                // Check if passwords match for signup
                if (password !== confirmPassword) {
                    setValidationError('Passwords do not match');
                    setStatus('idle');
                    return;
                }

                console.log('Attempting to sign up with:', { email, name });

                try {
                    // For signup, only send the required fields (email, password, name)
                    // Don't pass any callback URL to avoid type conversion issues
                    const { data, error: signUpError } = await signUp.email({
                        email,
                        password,
                        name
                    });

                    console.log('Sign up response:', { data, error: signUpError ? signUpError.message : null });

                    if (signUpError) {
                        // Handle duplicate email error explicitly
                        const errorMessage = signUpError.message || '';
                        console.error('Sign up error:', errorMessage);

                        if (errorMessage.includes('email already exists') ||
                            errorMessage.includes('email is already taken') ||
                            errorMessage.includes('already registered')) {
                            setValidationError('This email is already registered. Please use a different email or try signing in.');
                            setStatus('idle');
                            return;
                        }
                        throw new Error(signUpError.message);
                    }

                    console.log('Sign up successful, verification email should be sent');
                    setVerificationSent(true);
                } catch (signUpErr) {
                    console.error('Error during signup:', signUpErr);
                    throw signUpErr;
                }
            }

            setStatus('success');
        } catch (err) {
            console.error('Authentication error:', err);
            setStatus('error');
            if (err instanceof Error) {
                // Check for common email verification issues
                if (err.message.includes('verify your email')) {
                    setError('Please check your email and verify your account before signing in.');
                } else if (err.message.includes('already exists') || err.message.includes('already registered')) {
                    setValidationError('This email is already registered. Please use a different email or try signing in.');
                    setStatus('idle');
                } else {
                    setError(err.message);
                }
            } else {
                setError('Authentication failed');
            }
        }
    };

    if (verificationSent) {
        return (
            <div className="max-w-md mx-auto p-6 space-y-6">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Verification Email Sent!</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        We've sent a verification link to <strong>{email}</strong>
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                        <p className="text-sm text-green-800">
                            Please check your inbox (and spam folder) and click the link to verify your account.
                        </p>
                    </div>
                    <div className="text-left bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-2">Didn't receive the email?</p>
                        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                            <li>Check your spam or junk folder</li>
                            <li>Verify you entered the correct email address</li>
                            <li>Allow up to 5 minutes for the email to arrive</li>
                            <li>Try signing up again if the email doesn't arrive</li>
                        </ul>
                    </div>
                    <div className="mt-4">
                        <Link href="/login" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                            Return to login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 space-y-6">
            <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === 'signup' && (
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900"
                        />
                    </div>
                )}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900"
                    />
                </div>

                {mode === 'signup' && (
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={8}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-900"
                        />
                    </div>
                )}

                {mode === 'login' && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                )}

                {validationError && (
                    <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">{validationError}</p>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {status === 'loading'
                        ? 'Processing...'
                        : mode === 'login'
                            ? 'Sign in'
                            : 'Sign up'
                    }
                </button>

                <div className="text-sm text-center">
                    {mode === 'login' ? (
                        <p className="text-sm text-gray-900">
                            Don't have an account?{' '}
                            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign up
                            </Link>
                        </p>
                    ) : (
                        <p className="text-sm text-gray-900">
                            Already have an account?{' '}
                            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in
                            </Link>
                        </p>
                    )}
                </div>
            </form>

            {status === 'error' && error && (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{error}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 