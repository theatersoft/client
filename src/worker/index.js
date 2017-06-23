self.addEventListener('push', event => {
    const message = event.data.json()

    event.waitUntil(
        self.registration.showNotification('Theatersoft', {
            body: message.body
        })
    )
})
