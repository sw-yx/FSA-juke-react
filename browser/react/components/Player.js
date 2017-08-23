import React from 'react';

const Player = (props) => {

  return (
    <footer>
      <div>
        <div className="pull-left">
          <button className="btn btn-default" onClick={props.prev}>
            <span className="glyphicon glyphicon-step-backward"></span>
          </button>
          <button className="btn btn-default" onClick={props.toggle}>
              {!props.isPlaying ? <span className="glyphicon glyphicon-play"></span>
              : <span className="glyphicon glyphicon-pause"></span>}
          </button>
          <button className="btn btn-default" onClick={props.next}>
            <span className="glyphicon glyphicon-step-forward"></span>
          </button>
          <button className={"btn btn-default "  + (props.randomMode ? "active" : "") } onClick={()=>props.toggleRandom()}>
              <span className={"glyphicon glyphicon-random"}></span>
          </button>
        </div>
        <div className="bar">
          <div className="progress" onClick={e => props.scrubProgress(e)}>
            <div className="progress-bar" style={{width: `${props.progress * 100}%`}}></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Player;
