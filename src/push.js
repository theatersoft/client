import rpc from './rpc'

const log = (...args) => (console.log(...args), args[0])

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export const register = config => {
    navigator.serviceWorker.register('theatersoft-worker.js')
        .then(registration =>
            log(registration).pushManager.getSubscription()
                .then(subscription =>
                    log(subscription) || registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(config.publicKey)
                    })
                )
        )
        .then(subscription => {
            const rawKey = subscription.getKey ? subscription.getKey('p256dh') : ''
            const key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : ''
            const rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : ''
            const authSecret = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : ''
            const endpoint = subscription.endpoint

            rpc('Session.Register', [{endpoint, key, authSecret}])
        })

}
