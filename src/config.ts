export const FIREBASE = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};
export const FIREBASE_ENABLED: boolean = process.env.REACT_APP_FIREBASE_ENABLED ? JSON.parse(process.env.REACT_APP_FIREBASE_ENABLED) === true : false;
export const FIREBASE_VAPIDKEY = process.env.REACT_APP_FIREBASE_VAPIDKEY;
