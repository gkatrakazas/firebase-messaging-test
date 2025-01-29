import { useEffect, useState } from 'react';
import { onMessageListener } from '../firebase';

const useNewCredentialListener = () => {
	const [notification, setNotification] = useState( null);

	useEffect(() => {
		const listenForNotification = (payload) => {
			console.log('Notification received:', payload);

			const newNotification = {
				title: payload?.notification?.title,
				body: payload?.notification?.body,
			};
			// Update the state
			setNotification(newNotification);

		};

		onMessageListener(listenForNotification);

		// Optional cleanup function for consistency and future-proofing
		return () => {
			// Firebase's `onMessage` does not require unsubscription
			// Add cleanup logic here if needed in the future
		};

	}, []);

	const clearNotification = () => {
		setNotification(null);
	};

	return { notification, clearNotification };
};

export default useNewCredentialListener;
