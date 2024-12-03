import React, {useEffect, useState} from 'react';
import './App.css';
import Button from './components/Button.js';
import Output from './components/Output.js';

const keymap=['(',')','%','CE',
              '7','8','9','/',
              '4','5','6','*',
              '1','2','3','-',
              '0','.','=','+'
]

const keyMappings={
  '(':{'type':'control-btn', 'value': '('},
  ')':{'type':'control-btn', 'value': ')'},
  '%':{'type':'control-btn', 'value': '%'},
  'Delete':{'type':'control-btn', 'value': 'CE'},

  '7':{'type':'numeric-btn', 'value': '7'},
  '8':{'type':'numeric-btn', 'value': '8'},
  '9':{'type':'numeric-btn', 'value': '9'},
  '/':{'type':'control-btn', 'value': '/'},

  '4':{'type':'numeric-btn', 'value': '4'},
  '5':{'type':'numeric-btn', 'value': '5'},
  '6':{'type':'numeric-btn', 'value': '6'},
  '*':{'type':'control-btn', 'value': '*'},

  '1':{'type':'numeric-btn', 'value': '1'},
  '2':{'type':'numeric-btn', 'value': '2'},
  '3':{'type':'numeric-btn', 'value': '3'},
  '-':{'type':'control-btn', 'value': '-'},

  '0':{'type':'numeric-btn', 'value': '0'},
  '.':{'type':'numeric-btn', 'value': '.'},
  '+':{'type':'control-btn', 'value': '+'},
  'Enter':{'type':'control-btn', 'value': '='},
  'Backspace':{'type':'control-btn', 'value': '<-'},
};

function App() {
  const [currentValue,setCurrentValue]=useState("");
  const [currentResult,setCurrentResult]=useState("")

  function btn_handler(inputValue){
    if(inputValue==='CE'){
      setCurrentValue((prev)=>{
      if(prev==='')setCurrentResult("");
      return "";
      });
    }
    else if(inputValue==='='){
      setCurrentValue((prev)=>{
        let tmp=prev.replaceAll('%','*0.01');
        try{
          setCurrentResult(`Ans=${eval(tmp)}`);
        }catch{
          setCurrentResult("Error")
          setCurrentValue("");
        }
        return prev;
      });
    }
    else if(inputValue==='<-'){
      setCurrentValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));}
    else if(inputValue==='%'){
      setCurrentValue((prev) => (prev === '0' ? inputValue : prev + inputValue));}
      else{
      setCurrentValue((prev) => (prev === '0' ? inputValue : prev + inputValue));
    }
  }



  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (key in keyMappings) {
          const mappedValue = keyMappings[key]['value'];
          btn_handler(mappedValue);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);

      return () => {
          window.removeEventListener('keydown', handleKeyPress);
      };
  }, []);


  let buttons=keymap.map(btn=>{
    if(btn in keyMappings)
      return <Button className={keyMappings[btn]['type']} value={btn} key={btn} handler={()=>btn_handler(btn)}/>
    else{
      let className='control-btn';
      return <Button className={className} value={btn} key={btn} handler={()=>btn_handler(btn)}/>
    }
  });

  return (
    <div className="App">
      <Output 
        currentValue={currentValue}
        currentResult={currentResult}
      />
      <div className="input-btns">
        {buttons}
      </div>
    </div>
  );
}

export default App;
