import GetWinner from './GetWinner'
import GetCurrentChar from './GetCurrentChar'
import OnClick from './OnClick'
import React, { useState } from 'react';
import utils from '../utils'

const numberOfBoxes = utils.range(1, 9)

const Game = () => {
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
            storeChar[number - 1] = GetCurrentChar(count)
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

export default Game