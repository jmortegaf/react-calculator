import '../assets/Button.css';

function Button(props){
    return <button className={"btn "+props.className}  onClick={props.handler}>{props.value}</button> ;
}

export default Button;