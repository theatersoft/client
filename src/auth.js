import {executor} from '@theatersoft/bus'

const e = executor()

export const auth = e.promise

export function refresh () {
    const
        cookie = document.cookie,
        sid = cookie && cookie.startsWith('sid=') && cookie.slice(4) || true
    console.log('auth.refresh', sid)
    e.resolve(sid)
}

refresh()

