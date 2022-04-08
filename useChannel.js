import channelsMgr from './src/channelsMgr'

const refhresSubscriptions = { type: 'REFRESH_SUBSCRIPTIONS' }

export const useChannel = (options) => {
    useEffect(() => {
        const key = channelsMgr.register(options)
        store.dispatch(refhresSubscriptions)
        return () => {
            channelsMgr.unregister(key)
            store.dispatch(refhresSubscriptions)
        }
    }, [options])
}