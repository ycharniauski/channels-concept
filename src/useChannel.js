import { createChannelKey, channelsMgr } from './channelsMgr'

const refhresSubscriptions = { type: 'REFRESH_SUBSCRIPTIONS' }

export const useChannel = (callback, deps) => {
    useEffect(() => {
        const options = callback()
        const key = createChannelKey(options)
        
        channelsMgr.register(key)
        store.dispatch(refhresSubscriptions)

        return () => {
            channelsMgr.unregister(key)
            store.dispatch(refhresSubscriptions)
        }
    }, deps)
}