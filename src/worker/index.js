self.addEventListener('push', event => {
    event.waitUntil(
        self.registration.showNotification('Theatersoft', event.data.json())
    )
})

self.addEventListener('notificationclick', event => {
    event.waitUntil(
        self.clients.matchAll().then(clientList => {
            if (clientList.length > 0) return clientList[0].focus()
            return self.clients.openWindow('/')
        })
    )
})