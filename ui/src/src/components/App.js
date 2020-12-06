
import '../../src/styles/App.css';
import React, { useState, useEffect } from 'react';
import utils from '../utils'
import GetWinner from './GetWinner'
import getCurrentChar from './getCurrentChar'
import OnClick from './onClick'

const numberOfBoxes = utils.range(1, 9)

const StarMatch = () => {
  const [availableBox, setAvailableBox] = useState(utils.range(1, 9));
  const [stop, setStop] = useState([])
  const [winner, setWinner] = useState([]);
  const [storeChar, setStoreChar] = useState(utils.range(1, 9).map(number => ''));
  let [count, setCount] = useState(0);
  const numberStatus = (number) => {

    if (winner.includes(number)) {
      return 'winner'
    }
    if (availableBox.includes(number)) {
      return 'available';
    }
    if (stop.includes(number)) {
      return 'stop'
    }
    return 'used'
  };
  const OnClickhandler = (number, currentStatus) => {
    if (currentStatus == 'used' || currentStatus == 'stop' || currentStatus == 'winner') {
      return;
    } else {
      const newAvailableBox = availableBox.filter(function (e) {
        return e !== number
      })
      setAvailableBox(newAvailableBox);
      setCount(count + 1)
      storeChar[number - 1] = getCurrentChar(count)
      setStoreChar(storeChar)
      if (GetWinner(storeChar).length > 0) {
        setWinner(GetWinner(storeChar))
        setStop(availableBox)
        setAvailableBox([])
      }

    }
  }





  return (
    <div className="game">
      <div className="body">
        <div className="right">
          <div>You play X</div>
          {numberOfBoxes.map(number => <OnClick key={number} number={number} status={numberStatus(number)} handler={OnClickhandler} currentChar={storeChar[number - 1]} />)}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (<StarMatch />);
}
