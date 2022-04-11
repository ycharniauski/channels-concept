import useChannel from "../hooks/useChannel"

const OrderBook = (props) => {
    const { pair } = props

    useChannel(() => ({ channel: 'orderBook', symbol: pair, prec: 'P0', len: "100" }), [pair])

    return (<div>
        ..... 
    </div>)
}

export default OrderBook