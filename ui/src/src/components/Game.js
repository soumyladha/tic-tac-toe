import GetWinner from './GetWinner'
import GetCurrentChar from './GetCurrentChar'
import OnClick from './OnClick'
import React, { Component } from 'react';
import utils from '../utils'



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
            // console.log("blah")
            // let agentNum = this.state.availableBox[utils.random(0, this.state.availableBox.length - 1)]
            // this.UpdateState(agentNum, this.state.availableBox)
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
        console.log(agentNum)

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
                    </div>
                </div>
            </div>
        );
    }




}
export default Game