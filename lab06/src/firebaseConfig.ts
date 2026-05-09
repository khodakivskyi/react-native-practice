import { initializeApp, getApps } from 'firebase/app';
import {
    getAuth,
    getReactNativePersistence,
    initializeAuth,
    type Auth
} from '@firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey:
        process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? 'YOUR_API_KEY',
    authDomain:
        process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ??
        'YOUR_PROJECT.firebaseapp.com',
    projectId:
        process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? 'YOUR_PROJECT_ID',
    storageBucket:
        process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ??
        'YOUR_PROJECT.appspot.com',
    messagingSenderId:
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? 'SENDER_ID',
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? 'APP_ID'
};

const placeholders =
    firebaseConfig.apiKey === 'YOUR_API_KEY' ||
    !firebaseConfig.apiKey?.trim();

if (placeholders) {
    throw new Error(
        'Не налаштовано Firebase API key. Створи файл .env з копії .env.example і заповни ' +
            'поля з Firebase Console → налаштування проєкту → Your apps, або впиши реальні ' +
            'значення в src/firebaseConfig.ts замість YOUR_*. Перезапусти npx expo start після змін.'
    );
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

function createAuth(): Auth {
    try {
        return initializeAuth(app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        });
    } catch {
        return getAuth(app);
    }
}

export const auth = createAuth();
export const db = getFirestore(app);