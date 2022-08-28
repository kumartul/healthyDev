self.addEventListener('notificationclick', event => {
	if(!event.action) {
		self.clients.openWindow(event.notification.data + 'exercise');
		event.notification.close();

		return;
	}
	
	switch(event.action) {
		case 'exercise-action':
			self.clients.openWindow(event.notification.data + 'exercise');
			break;
		case 'posture-action':
			self.clients.openWindow(event.notification.data + 'exercise');
			break;
		default:
			console.log('Uknown action: ', event.action);
			break;
	}
});
