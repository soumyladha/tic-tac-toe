import GetWinner from './GetWinner'
import GetCurrentChar from './GetCurrentChar'
import OnClick from './OnClick'
import React, { Component } from 'react';
import utils from '../utils'
import axios from 'axios'


const APITest = () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const response = []
    axios.get(url).then(data => response.push(data.data)).catch(err => console.log(err))
    return response
}


const numberOfBoxes = utils.range(1, 9)
class Game extends Component {
    state = {
        availableBox: utils.range(1, 9),
        stop: [],
        winner: [],
        storeChar: utils.range(1, 9).map(number => ''),
        count: 0
    }


    OnClickhandler = (number, currentStatus) => {
        if (currentStatus === 'used' || currentStatus === 'stop' || currentStatus === 'winner') {
            return;
        } else {
            this.UpdateState(number, this.state.availableBox)
        }
    }

    NumberStatus = (number) => {

        if (this.state.winner.includes(number)) {
            return 'winner'
        }
        if (this.state.availableBox.includes(number)) {
            return 'available';
        }
        if (this.state.stop.includes(number)) {
            return 'stop'
        }
        return 'used'
    };

    UpdateState = (number, availableBox) => {
        const newAvailableBox = availableBox.filter(function (e) {
            return e !== number
        })

        let agentNum = newAvailableBox[utils.random(0, newAvailableBox.length - 1)]
        const newAvailableBox2 = newAvailableBox.filter(function (e) {
            return e !== agentNum
        })

        const newChar = this.state.storeChar
        newChar[number - 1] = 'X'
        newChar[agentNum - 1] = 'O'
        const tempWinner = GetWinner(this.state.storeChar)

        if (tempWinner.length > 0) {
            this.setState(prevState => ({
                availableBox: [],
                count: 0,
                storeChar: newChar,
                stop: newAvailableBox2,
                winner: tempWinner
            }), () => { console.log('new state', this.state); })
        }
        else {
            this.setState(prevState => ({
                availableBox: newAvailableBox2,
                count: prevState.count + 1,
                storeChar: newChar,
                stop: [],
                winner: []
            }), () => { console.log('new state', this.state); })

        }

    }


    render() {
        return (
            <div className="game">
                <div className="body">
                    <div className="right">
                        <div>You play X</div>
                        {numberOfBoxes.map(number => <OnClick key={number} number={number} status={this.NumberStatus(number)} handler={this.OnClickhandler} currentChar={this.state.storeChar[number - 1]} />)}
                        <div>{console.log(APITest())};</div>
                    </div>
                </div>
            </div>
        );
    }




}
export default Game