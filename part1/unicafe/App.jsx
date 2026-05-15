import { useState } from "react";


const App = () => {

  const [good,updateGood] = useState(0);
  const [neutral,updateNeutral] = useState(0);
  const [bad,updateBad] = useState(0);


  const handleGood = () => updateGood(good+1);
  const handleBad = () => updateBad(bad+1);
  const handleNeutral = () => updateNeutral(neutral+1);

  return(
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGood}/>
      <Button text="neutral" onClick={handleNeutral}/>
      <Button text="bad" onClick={handleBad}/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  );
}


const StatisticLine  = (props) => <tr><td>{props.text} </td><td>{props.value}</td></tr>

const Statistics = ({good,neutral,bad}) => {
    if(good!=0||bad!=0||neutral!=0){
    return(
    <table><tbody>
    <StatisticLine  text="good" value={good}/>
    <StatisticLine  text="neutral" value={neutral}/>
    <StatisticLine  text="bad" value={bad}/>
    <StatisticLine  text="all" value={good+bad+neutral}/>
    <StatisticLine  text="average" value={(((good*1)+(bad*-1))/(good+neutral+bad)).toFixed(1)}/>
    <StatisticLine  text="positive" value={((good*100.0)/(good+bad+neutral)).toFixed(1)+" %"}/>
    </tbody></table>
    );
    }else{
      return(<p>No feedback given</p>);
    }
}

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

export default App;
