import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState } from 'react';

import { fetchToken, notificationApiIsSupported } from './firebase';
import useNewCredentialListener from './hooks/useNewCredentialListener';
import NewCredentialNotification from './NewCredentialNotification';

function App() {
	const [loading, setLoading] = useState(false);
	const { notification, clearNotification } = useNewCredentialListener();

  useEffect(() => {
		const requestNotificationPermission = async () => {
			if (!notificationApiIsSupported) {
        sessionStorage.setItem('setTokenSentInSession',false);
        sessionStorage.setItem('setIsPermissionGranted',false);
				return;
			}

			try {
				if (Notification.permission !== 'granted') {
          sessionStorage.setItem('setTokenSentInSession',false);
          sessionStorage.setItem('setIsPermissionGranted',false);

					const permissionResult = await Notification.requestPermission();
					if (permissionResult === 'granted') {
            sessionStorage.setItem('setIsPermissionGranted',true);
					}
				} else {
          sessionStorage.setItem('setIsPermissionGranted',true);
				}
			} catch (error) {
				console.error('Error requesting notification permission:', error);
			}
		};

			requestNotificationPermission();
	}, []);

  useEffect(() => {
		const sendFcmTokenToBackend = async () => {
			if (sessionStorage.getItem('setIsPermissionGranted')) {
				if (!sessionStorage.getItem('tokenSentInSession')) {
					setLoading(true);
					try {
						const fcmToken = await fetchToken();
						if (fcmToken !== null) {
              sessionStorage.setItem('setTokenSentInSession',fcmToken);
							console.log('FCM Token send:', fcmToken);
						} else {
							console.log('FCM Token failed to get fcmtoken in private route', fcmToken);
              sessionStorage.setItem('setTokenSentInSession',false);

						}
					} catch (error) {
						console.error('Error sending FCM token to the backend:', error);
					} finally {
						setLoading(false);
					}
				}
			}
		};
			sendFcmTokenToBackend();
	}, [
	]);
  return (
    <>
    <NewCredentialNotification notification={notification} clearNotification={clearNotification} />

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </>
  );
}

export default App;
