const Chart = (props) => {
    const { pair } = props

    useChannel({ chan: 'candles', symbol: pair })
    useChannel({ chan: 'orders', symbol: pair })
    useChannel({ chan: 'liqudations', symbol: pair })

    return (<div>
        ..... 
    </div>)
}

export default Chart