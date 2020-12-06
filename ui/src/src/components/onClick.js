import Colors from './Colors'

const OnClick = props => (<button className="number" onClick={() => props.handler(props.number, props.status)} style={{ backgroundColor: Colors[props.status] }}  >{props.currentChar}</button>)

export default OnClick