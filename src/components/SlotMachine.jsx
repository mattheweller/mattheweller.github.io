import React from 'react';
import { Spinner } from './Spinner'
  
function RepeatButton(props) {
  return (
    <button 
      aria-label='Play again' 
      id='repeatButton' 
      onClick={props.onClick}>
        Play again!
    </button>
  );
}

export class SlotMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
    }
    
    this.finishHandler = this.finishHandler.bind(this)
    this.handleClick = this.handleClick.bind(this);
    
  }  

  handleClick() { 
    this.setState({ winner: null });
    this.emptyArray();
    this._child1.forceUpdateHandler();
    this._child2.forceUpdateHandler();
    this._child3.forceUpdateHandler();
  }

  static matches = [];

  finishHandler(value) {
    SlotMachine.matches.push(value);  

    if (SlotMachine.matches.length === 3) {
      // const { winner } = this.state;
      const first = SlotMachine.matches[0];
      let results = SlotMachine.matches.every(match => match === first)
      this.setState({ winner: results });
    }
  }

  emptyArray() {
    SlotMachine.matches = [];
  }

  render() {
    const { winner } = this.state;
    const repeatButton = <RepeatButton onClick={this.handleClick} />

    return (
      <div >
        <div >
          <h1>
            <span style={{ color: 'black'}}>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : 'Tough luck...'}</span>
            {repeatButton}
          </h1>
        </div>
        <div className={`spinner-container`} style={{ display: 'inline-block'}}>
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child1 = child; }} timer="1000" />
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child2 = child; }} timer="1400" />
          <Spinner onFinish={this.finishHandler} ref={(child) => { this._child3 = child; }} timer="2200" />
          {/* <div className="gradient-fade"></div> */}
        </div>
      </div>
    );
  }
}  
  
