import React from 'react'

export default class Footer extends React.Component{
    render() {
        return <footer>
                    <div className="pull-left">
                    <button className="btn btn-default" onClick={()=>this.props.prevOrNextSong(false)}>
                        <span className="glyphicon glyphicon-step-backward"></span>
                    </button>
                    <button className="btn btn-default" onClick={()=>this.props.togglePlay()}>
                        {this.props.isPaused ? <span className="glyphicon glyphicon-play"></span>
                        : <span className="glyphicon glyphicon-pause"></span>}
                    </button>
                    <button className="btn btn-default" onClick={()=>this.props.prevOrNextSong(true)}>
                        <span className="glyphicon glyphicon-step-forward"></span>
                    </button>
                    </div>
                    <div className="bar">
                    <div className="progress">
                        <div className="progress-bar" style={{width: `${this.props.progress}%`}}></div>
                    </div>
                    </div>
                </footer>
    }
}