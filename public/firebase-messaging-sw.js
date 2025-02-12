importScripts("https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js");


// the Firebase config object
const firebaseConfig = {
	apiKey: "AIzaSyB55hgltHyScm8sAK3N_xpk1gDUSV1be94",
	authDomain: "wallet-test-a1e2f.firebaseapp.com",
	projectId: "wallet-test-a1e2f",
	storageBucket: "wallet-test-a1e2f.firebasestorage.app",
	messagingSenderId: "226019585149",
	appId: "1:226019585149:web:8beb6db5adb4dae8249514",
	measurementId: "G-3YKRQRT2HH"
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
	console.log('Received background message ', payload);
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		data: { url: '/' },
	};

	self.registration.showNotification(notificationTitle,
		notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
	console.log('Notification click Received.!!!!!!');
	event.notification.close();

	// Use the URL provided in the notification payload (if it exists), otherwise default to '/'
	const urlToRedirectTo = event.notification.data.url || '/';

	event.waitUntil(
		clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
			// Search for the matching client with the same origin (domain)
			const matchingClient = windowClients.find((client) => {
				return new URL(client.url).origin === self.location.origin;
			});

			if (matchingClient) {
				console.log('Navigating the matching client to ' + urlToRedirectTo);
				matchingClient.focus();
				matchingClient.postMessage({ type: 'navigate', url: urlToRedirectTo });
			} else if (clients.openWindow) {
				console.log('No matching client found, opening a new window');
				clients.openWindow(urlToRedirectTo);
			}
		})
	);
});




self.addEventListener('activate', event => {
	event.waitUntil(
		// Ensure that the new service worker takes over immediately
		self.clients.claim()
			.then(() => {
				console.log('Service worker is now the active service worker and is controlling the pages.');
				// Perform any additional cleanup or migration tasks if needed
				// This can include cache management and deleting old resources.
			})
	);
});
