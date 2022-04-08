
import { channelsMgr } from "./channelsMgr"
import { CHANNEL_STATUSES } from "./channelsMgr"

function* refreshSubscriptionsWorker() {
    const channels = channelsMgr.getChannels()

    _forEach(channels, (chan) => {
        const { registered, status } = chan
        if (registered > 0 && status === CHANNEL_STATUSES.NONE) {
            chan.status = CHANNEL_STATUSES.SUBSCRIBING
            yield put({ type: 'WS_REQUEST_SUBSCRIBE', payload: chan.key })
        } if (registered === 0 && status === CHANNEL_STATUSES.SUBSCRIBED) {
            chan.status = CHANNEL_STATUSES.UNSUBSCRIBING
            yield put({ type: 'WS_REQUEST_UNSUBSCRIBE', payload: chan.chanId })
        }
    })

    channelsMgr.removeUnusedChannels()
}

function* eventSubscribeWorker({ key }) {
    const channels = channelsMgr.getChannels()
    const chan = channels[key]
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