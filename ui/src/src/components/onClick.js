import colors from './colors'

const OnClick = props => (<button className="number" onClick={() => props.handler(props.number, props.status)} style={{ backgroundColor: colors[props.status] }}  >{props.currentChar}</button>)

export default OnClick