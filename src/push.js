import {bus, proxy} from '@theatersoft/bus'
import {setNotifications} from './actions'

const log = (...args) => (console.log(...args), args[0])

const
    Session = proxy('Session'),
    Uint8ArrayOfUrlBase64 = b64 => new Uint8Array(atob(b64.replace(/_/g, '/').replace(/-/g, '+')).split('').map(c => c.charCodeAt(0)))

export const
    register = config => navigator.serviceWorker.register('theatersoft-worker.js')

export const
    notificationsAction = ({enabled} = {}) => async (dispatch, getState) => {
        const registration = await navigator.serviceWorker.getRegistration()
        let subscription = await registration.pushManager.getSubscription()
        if (enabled === true && !subscription) {
            const subscription = await registration.pushManager.subscribe({userVisibleOnly: true, applicationServerKey: Uint8ArrayOfUrlBase64(getState().config.webpush.publicKey)})
            await Session.registerSubscription(document.cookie.slice(4), subscription.toJSON())
        } else if (enabled === false && subscription) {
            await subscription.unsubscribe()
            await Session.unregisterSubscription(document.cookie.slice(4))
            subscription = null
        }
        dispatch(setNotifications({enabled: !!subscription}))
    }
