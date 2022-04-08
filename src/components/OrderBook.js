const OrderBook = (props) => {
    const { pair } = props

    useChannel({ channel: 'orderBook', symbol: pair, prec: 'P0', len: "100" })

    return (<div>
        ..... 
    </div>)
}

export default OrderBook