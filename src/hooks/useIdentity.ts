'use client';
import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

const ANONYMOUS_ID_KEY = 'recipe_anonymous_id';

const generateCryptoId = () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const useIdentity = () => {
    const session = authClient.useSession();
    const [identity, setIdentity] = useState<string | null>(null);
    const [identityType, setIdentityType] = useState<'email' | 'anonymous' | null>(null);

    useEffect(() => {
        if (session.data?.user?.email) {
            setIdentity(session.data.user.email);
            setIdentityType('email');
        } else if (!session.isPending) {
            let anonymousId: string | null = null;
            try {
                if (typeof window !== 'undefined' && window.localStorage) {
                    anonymousId = localStorage.getItem(ANONYMOUS_ID_KEY);
                } else {
                    console.warn('useIdentity: localStorage not available.');
                }
            } catch (error) {
                console.error('useIdentity: Failed to access localStorage:', error);
            }
            if (!anonymousId) {
                anonymousId = generateCryptoId();
            }
            if (anonymousId) {
                try {
                    localStorage.setItem(ANONYMOUS_ID_KEY, anonymousId);
                } catch (error) {
                    console.error('useIdentity: Failed to set localStorage:', error);
                }
                setIdentity(anonymousId);
                setIdentityType('anonymous');
            }
        }
    }, [session?.data?.user, session.isPending]);

    return { identity, identityType, user: session.data?.user };
};