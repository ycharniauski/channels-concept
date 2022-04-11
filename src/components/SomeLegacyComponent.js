import useChannel from "../hooks/useChannel"

const CandlesChannel = ({ pair }) => {
    useChannel(() => ({ chan: 'candles', symbol: pair }), [pair])
}

export class SomeLegacyComponent extends React.PureCompnent {
    constructor(props) {}

    componentDidMount() { }

    componentWillUnmount() {}

    render() {
        const { pair } = this.props
        return (
            <>
                <CandlesChannel pair={pair} />
                <div>...</div>
            </>
        )

    }
}