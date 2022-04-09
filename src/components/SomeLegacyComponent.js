import useChannel from '../useChannel'

const UseStatusChannel = ({ pair }) => {
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
                <UseStatusChannel pair={pair} />
                <div>...</div>
            </>
        )

    }
}