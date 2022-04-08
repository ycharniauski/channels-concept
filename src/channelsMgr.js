export const CHANNEL_STATUSES = {
    NONE: '',
    SUBSCRIBING: 'SUBSCRIBING',
    SUBSCRIBED: 'SUBSCRIBED',
    UNSUBSCRIBING: 'UNSIBSRIBING',
    FAILED: 'FAILED'
}

export const createChannelKey = options => JSON.stringify(_sort(options))

export const ChannelsMgr = () => {
    const channels = {}

    return {
        getChannels: () => channels,
        getChannelById: (id) => _find(channels, ({ chanId }) => chanId === id),
        register: (options) => {
            const key = createChannelKey(options)
            const chan = channels[key] || {
                key,
                chanId: 0,
                options: { ...options },
                status: CHANNEL_STATUSES.NONE,
                registered: 0,
            }
            chan.registered ++
            channels[key] = chan
            return key
        },
        unregister: (key) => {
            channels[key].registered --;
        },
        clearUnusedChannels: () => {
            channels = _omitBy(channels, ({ registered, status }) => (
                registered > 0 || status !== CHANNEL_STATUSES.NONE
            ))
        }
    }
}

export const channelsMgr = ChannelsMgr()