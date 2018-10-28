import {executor, debug} from '@theatersoft/bus'

const e = executor()

export const auth = e.promise

export function refresh () {
    const
        {cookie} = document,
        match = cookie && cookie.split('; ').find(s=>s.startsWith('sid=')),
        sid = match && match.slice(4)
    debug('auth.refresh', sid)
    e.resolve(sid)
}

refresh()
