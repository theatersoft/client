self.addEventListener('push', event => {
    event.waitUntil(
        self.registration.showNotification('Theatersoft', event.data.json())
    )
})
