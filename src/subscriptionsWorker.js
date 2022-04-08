
import { createChannelKey, channelsMgr } from "./channelsMgr"
import { CHANNEL_STATUSES } from "./channelsMgr"

function* refreshSubscriptionsWorker() {
    const channels = channelsMgr.getChannels()
    _forEach(channels, (chan) => {
        const { registered, status } = chan
        if (registered > 0 && status === CHANNEL_STATUSES.NONE) {
            const { options } = chan
            chan.status = CHANNEL_STATUSES.SUBSCRIBING
            yield put(subscribeAction(options))
        } if (registered === 0 && status === CHANNEL_STATUSES.SUBSCRIBED) {
            const { chanId } = chan
            chan.status = CHANNEL_STATUSES.UNSUBSCRIBING
            yield put(unsubscribeAction(chanId))
        }
    })
    channelsMgr.clearUnusedChannels()
}

function* eventSubscribeWorker({ options }) {
    const channels = channelsMgr.getChannels()
    const chan = channels[createChannelKey(options)]
    chan.status = CHANNEL_STATUSES.SUBSCRIBED
    yield refreshSubscriptionsWorker()
}

function eventUnsubscribeWorker({ chanId }) {
    const chan = channelsMgr.getChanById(chanId)
    chan.status = CHANNEL_STATUSES.NONE
    yield refreshSubscriptionsWorker()
}

export function* init() {
    yield takeEvery('WS_EVENT_SUBSCRIBE', eventSubscribeWorker)
    yield takeEvery('WS_EVENT_UNSUBSCRIBE', eventUnsubscribeWorker)
    yield takeEvery('EVENT_SUBSCRIBING', refreshSubscriptionsWorker)
}