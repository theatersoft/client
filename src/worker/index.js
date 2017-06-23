self.addEventListener('push', event => {
    const message = event.data ? event.data.text() : 'no message'

    event.waitUntil(
        self.registration.showNotification('Theatersoft', {
            body: message
        })
    )
})
