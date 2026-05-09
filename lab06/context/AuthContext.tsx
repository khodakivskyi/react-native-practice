import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
    type User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
    reauthenticateWithCredential,
    EmailAuthProvider,
    deleteUser
} from '@firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../src/firebaseConfig';

export type UserProfile = {
    name: string;
    age: string;
    city: string;
};

type AuthContextValue = {
    user: User | null;
    profile: UserProfile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (profile: UserProfile) => Promise<void>;
    deleteAccount: (password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const emptyProfile: UserProfile = {
    name: '',
    age: '',
    city: ''
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const loadProfile = async (uid: string) => {
        const ref = doc(db, 'users', uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            setProfile(snap.data() as UserProfile);
        } else {
            setProfile(emptyProfile);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                await loadProfile(firebaseUser.uid);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email.trim(), password.trim());
    };

    const register = async (email: string, password: string, name: string) => {
        const result = await createUserWithEmailAndPassword(
            auth,
            email.trim(),
            password.trim()
        );

        const uid = result.user.uid;
        const ref = doc(db, 'users', uid);

        const initialProfile: UserProfile = {
            name: name.trim(),
            age: '',
            city: ''
        };

        await setDoc(ref, initialProfile);
        setProfile(initialProfile);
    };

    const logout = async () => {
        await signOut(auth);
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email.trim());
    };

    const updateProfile = async (nextProfile: UserProfile) => {
        if (!auth.currentUser) return;
        const uid = auth.currentUser.uid;

        if (uid !== auth.currentUser.uid) return;

        const ref = doc(db, 'users', uid);
        await setDoc(ref, nextProfile, { merge: true });
        setProfile(nextProfile);
    };

    const deleteAccount = async (password: string) => {
        if (!auth.currentUser || !auth.currentUser.email) return;

        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        );

        await reauthenticateWithCredential(auth.currentUser, credential);

        const uid = auth.currentUser.uid;

        if (uid !== auth.currentUser.uid) return;

        await deleteDoc(doc(db, 'users', uid));
        await deleteUser(auth.currentUser);
    };

    const value = useMemo(
        () => ({
            user,
            profile,
            loading,
            login,
            register,
            logout,
            resetPassword,
            updateProfile,
            deleteAccount
        }),
        [user, profile, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}