const log = (...args) => (console.log(...args), args[0])

export const register = config => {
    navigator.serviceWorker.register('theatersoft-worker.js')
        .then(registration =>
            log(registration).pushManager.getSubscription()
                .then(subscription =>
                    log(subscription) || registration.pushManager.subscribe({userVisibleOnly: true})
                )
        )
        .then(subscription => {
            const rawKey = subscription.getKey ? subscription.getKey('p256dh') : ''
            const key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : ''
            const rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : ''
            const authSecret = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : ''
            const endpoint = subscription.endpoint

            fetch('./register', {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({endpoint, key, authSecret})
            })
        })

}
