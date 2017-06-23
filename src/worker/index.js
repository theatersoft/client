self.addEventListener('push', event => {
    const message = event.data ? event.data.json() : {body: 'no message'}

    event.waitUntil(
        self.registration.showNotification('Theatersoft', {
            body: message.body
        })
    )
})
