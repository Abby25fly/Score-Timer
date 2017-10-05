class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        initTime: 0,
        seconds: 0,
        timerId: false,
        active: 'initTime'
      }
  
      this.playStop = this.playStop.bind(this);
      this.updateTime = this.updateTime.bind(this);
    }
  
    // 
    updateTime() {
      this.setState(function(prevState, props) {
        const currentState = Object.assign(prevState);
        const stillActive = (prevState.seconds + 1) > 0;
        const nextTimer = prevState.active ===  'initTime'
  
        currentState.seconds = stillActive ? currentState.seconds + 1 : currentState[nextTimer];
        currentState.active = stillActive ? currentState.active : nextTimer;
        if (this.timerID) {
          currentState.timerId = this.timerID;
        }
        return currentState;
      });
    }
  
    // 
    playStop() {
        if (this.state.timerId) {
          clearInterval(this.state.timerId);
          return this.setState({
            seconds: this.state.initTime,
            timerId: false,
            active: 'initTime'
          });
        }
  
        this.timerID = setInterval(() => this.updateTime(), 1000)
      }
      // 
    updateLength(timer, e) {
      if (this.state.timerId) {
        return false;
      }
      
      const state = Object.assign({}, this.state);
      state[timer] = e.target.value * 60;
      state.seconds = timer === 'initTime' ? e.target.value * 60 : state.seconds
      this.setState(state);
    }
    render() {
      const buttonString = this.state.timerId ? 'Stop' : 'Start';
      return (
        <div className="stopwatch-time">
          <h2>STOPWATH</h2>
          <Time active={this.state.active} seconds={this.state.seconds} />
          <Button action={this.playStop}>{buttonString}</Button>
          <button>RESET</button>
        </div>
      )
    }
  }
  
  
  const Button = (props) => <button className="btn" onClick={props.action}>{props.children}</button>
  
  class Time extends React.Component {
    twoDigits(num) {
      return num > 9 ? "" + num : "0" + num;
    }
  
    convertToHhMmSs(seconds) {
      const m = this.twoDigits(Math.floor((seconds % 3600) / 60));
      const s = this.twoDigits(Math.floor(seconds % 3600 % 60));
      return `${m}:${s}`;
    };
  
    render() {
      var remainingTime = this.convertToHhMmSs(this.props.seconds);
  
      return (
        <div className="timer">
          <p className="timer__time">{remainingTime}</p>
        </div>
      )
    }
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))