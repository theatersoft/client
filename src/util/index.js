import store from '../store'

export const
    dateString = time => new Date(time).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'}),
    timeString = time => new Date(time).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'}).toLowerCase(),
    timeSecondsString = time => new Date(time).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric'}).toLowerCase(),
    dateTimeString = time => `${dateString(time)} ${timeSecondsString(time)}`,
    agoString = (time, offset) => {
        const
            minutes = Math.floor((Number(new Date()) + offset - time) / 60000),
            hours = Math.floor(minutes / 60)
        return minutes < 1 ? 'now' : minutes < 60 ? `${minutes} min ago` : `${hours} hr ${minutes % 60} min ago`
    }