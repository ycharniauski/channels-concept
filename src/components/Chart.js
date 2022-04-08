import { createChannelKey } from "../channelsMgr"


const Chart = (props) => {
    const { pair } = props

    useChannel(() => ({ chan: 'candles', symbol: pair }), [pair])
    useChannel(() => ({ chan: 'orders', symbol: pair }), [pair])
    useChannel(() => ({ chan: 'liquidation', symbol: pair }), [pair])

    return (<div>
        ..... 
    </div>)
}

export default Chart