import {bus, proxy} from '@theatersoft/bus'
import {setNotifications} from './actions'

const log = (...args) => (console.log(...args), args[0])

const
    Session = proxy('Session'),
    Uint8ArrayOfUrlBase64 = b64 => new Uint8Array(atob(b64.replace(/_/g, '/').replace(/-/g, '+')).split('').map(c => c.charCodeAt(0)))

export const register = config => navigator.serviceWorker.register('theatersoft-worker.js')
    .then(registration => log(registration).pushManager.getSubscription()
        .then(subscription => log(subscription) || registration.pushManager.subscribe(log({
                userVisibleOnly: true,
                applicationServerKey: Uint8ArrayOfUrlBase64(config.publicKey)
            }))
        )
    )
    .then(subscription => Session.registerSubscription(log(document.cookie.slice(4)), subscription.toJSON()))

export const
    notificationsAction = state => async (dispatch, getState) => {
        const registration = await navigator.serviceWorker.getRegistration()
        let subscription = await registration.pushManager.getSubscription()
        if (state === true && !subscription) {
            const subscription = await registration.pushManager.subscribe({userVisibleOnly: true, applicationServerKey: Uint8ArrayOfUrlBase64(getState().config.publicKey)})
            await Session.registerSubscription(document.cookie.slice(4), subscription.toJSON())
        } else if (!state && subscription) {
            await subscription.unsubscribe()
            await Session.unregisterSubscription(document.cookie.slice(4))
            subscription = null
        }
        dispatch(setNotifications(!!subscription))
    }
