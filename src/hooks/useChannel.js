import { createChannelKey, channelsMgr } from '../lib/channelsMgr'

const refhresSubscriptions = { type: 'REFRESH_SUBSCRIPTIONS' }

const useChannel = (callback, deps) => {
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

export default useChannel