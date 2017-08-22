import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NewPlayList extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      dirty: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({input: e.target.value, dirty: true});

  }

  onSubmit(e) {
    e.preventDefault();
    this.props.mainSubmit(this.state.input);
    this.setState({input: ''});
  }

  render() {
    const checkInput = (this.state.input.length > 16 || this.state.input.length === 0);

    const lengthWarning = (this.state.input.length > 16) ?
    <div className="alert alert-warning">Please enter a name shorter than 16 characters </div> :
    <div></div>;

    const nameWarning = (this.state.dirty && this.state.input === '') ?
    <div className="alert alert-warning">Please enter a name</div> :
    <div></div>;

    return (
      <div className="well">
      <form className="form-horizontal" onSubmit={this.onSubmit}>
        <fieldset>
          <legend>New Playlist</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              {nameWarning} {lengthWarning}
              <input className="form-control" onChange={this.onChange} type="text" value={this.state.input} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button type="submit" className="btn btn-success" disabled={checkInput}>Create Playlist</button>
            </div>
          </div>
        </fieldset>
      </form>
      </div>
      );
    }
}
