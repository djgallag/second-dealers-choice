import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';;;;
import { createCharacter } from './store';

class Create extends Component{
  constructor(){
    super();
    this.state = {
      name: ''
    };
    this.save = this.save.bind(this);
  }
  save(ev){
    ev.preventDefault();
    this.props.createCharacter({ name: this.state.name, history: this.props.history });
  }
  render(){
    const { name } = this.state;
    const { save } = this;
    return (
      <div>
        <form onSubmit={ save }>
          <input value={ name } onChange={ ev => this.setState({ name: ev.target.value })}/>
          <button disabled={ !name }>Create</button>
        </form>
      </div>
    );
  }
}

export default connect(
  ()=> {
    return {
    };
  },
  (dispatch)=> {
    return {
      createCharacter: (character)=> { dispatch(createCharacter(character))},
    };
  }
)(Create);
