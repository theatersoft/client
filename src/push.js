import rpc from './rpc'

const log = (...args) => (console.log(...args), args[0])

const Uint8ArrayOfUrlBase64 = b64 => new Uint8Array(atob(b64.replace(/_/g, '/').replace(/-/g, '+')).split('').map(c => c.charCodeAt(0)))

export const register = config =>
    navigator.serviceWorker.register('theatersoft-worker.js')
        .then(registration =>
            log(registration).pushManager.getSubscription()
                .then(subscription =>
                    log(subscription) || registration.pushManager.subscribe(log({
                        userVisibleOnly: true,
                        applicationServerKey: Uint8ArrayOfUrlBase64(config.publicKey)
                    }))
                )
        )
        .then(subscription =>
            rpc('Session.Register', [subscription.toJSON()])
                .catch(e => console.log(e))
        )

