import '../assets/Output.css';

function Output(props){
    return (
        <div className="output-area">
            <textarea className="current-result-textarea" rows={1} value={props.currentResult} readOnly></textarea>
            <textarea className="current-value-textarea" rows={1} value={props.currentValue} readOnly></textarea>
        </div>
    );
}

export default Output;