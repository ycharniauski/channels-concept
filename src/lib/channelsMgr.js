export const CHANNEL_STATUSES = {
    NONE: '',
    SUBSCRIBING: 'SUBSCRIBING',
    SUBSCRIBED: 'SUBSCRIBED',
    UNSUBSCRIBING: 'UNSIBSRIBING',
}

export const createChannelKey = (options) => JSON.stringify(_sort(options))

export const ChannelsMgr = () => {
    const channels = {}

    return {
        getChannels: () => channels,
        getChannelById: (id) => _find(channels, ({ chanId }) => chanId === id),
        register: (key) => {
            const chan = channels[key] || {
                key,
                chanId: 0,
                status: CHANNEL_STATUSES.NONE,
                registered: 0,
            }
            channels[key] = chan
            chan.registered ++
        },
        unregister: (key) => {
            const chan = channels[key]
            chan.registered --;
        },
        removeUnusedChannels: () => {
            channels = _omitBy(channels, ({ registered, status }) => (
                !(registered === 0 && status === CHANNEL_STATUSES.NONE)
            ))
        }
    }
}

export const channelsMgr = ChannelsMgr()