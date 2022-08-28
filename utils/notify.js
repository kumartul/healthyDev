export const notify = url => {
	Notification.requestPermission(result => {
		if(result === 'granted') {
			navigator.serviceWorker.ready.then(registration => {
				registration.showNotification("Exercise Time", {
					body: "Look away from the screen",
					icon: "/assets/images/icon.png",
					data: url,
					vibrate: [200, 100, 200, 100, 200, 100, 200],
					tag: "Exercise Reminder",
					requireInteraction: true,
					actions: [
						{
							action: "exercise-action",
							title: "Do Exercise"
						}
					]
				})
			})
		}
	});

	const audio = new Audio('/assets/audio/notification.wav');
	audio.play();
}

export const notifySitStraight = url => {
	Notification.requestPermission(result => {
		if (result === "granted") {
			navigator.serviceWorker.ready.then(registration => {
				registration.showNotification("Sit Straight", {
					body: "Bad posture sit straight",
					icon: "/assets/images/icon.png",
					data: url,
					vibrate: [200, 100, 200, 100, 200, 100, 200],
					tag: "Sit straight",
				});
			});
		}
	});
}

export const notifyEar = url => {
	Notification.requestPermission(result => {
		if (result === "granted") {
			navigator.serviceWorker.ready.then(registration => {
				registration.showNotification("Earphone remove time", {
					body: "Stop using earphones now!",
					icon: "/assets/images/icon.png",
					data: url,
					vibrate: [200, 100, 200, 100, 200, 100, 200],
					tag: "Exercise Reminder",
					requireInteraction: true,
					actions: [
						{
							action: "exercise-action",
							title: "Do exercise",
						},
					],
				});
			});
		}
	});

	const audio = new Audio('/assets/audio/notification.wav');
	audio.play();
}

