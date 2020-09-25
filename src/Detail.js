import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';;;;
import { updateCharacter, destroyCharacter } from './store';

class Detail extends Component{
  constructor(){
    super();
    this.state = {
      name: ''
    };
    this.save = this.save.bind(this);
  }
  save(ev){
    ev.preventDefault();
    this.props.updateCharacter({ name: this.state.name, id: this.props.match.params.id, history: this.props.history });
  }
  componentDidMount(){
    const character = this.props.characters.find(e => e.id === this.props.match.params.id*1);
    if(character){
      this.setState({ name: character.name });
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.characters.length && prevProps.characters.length === 0){
      const character = this.props.characters.find(e => e.id === this.props.match.params.id*1);
      if(character){
        this.setState({ name: character.name });
      }
    }
  }
  render(){
    const { name } = this.state;
    const { save } = this;
    return (
      <div>
        <form onSubmit={ save }>
          <input value={ name } onChange={ ev => this.setState({ name: ev.target.value })}/>
          <button>Update</button>
        </form>
        <button onClick={ ()=> this.props.destroy({id: this.props.match.params.id, history: this.props.history }) }>Destroy</button>
      </div>
    );
  }
}




export default connect(
  ({ characters })=> {
    return {
      characters
    };
  },
  (dispatch)=> {
    return {
      updateCharacter: (character)=> { dispatch(updateCharacter(character))},
      destroy: (obj)=> {
        dispatch(destroyCharacter(obj));
      }
    };
  }
)(Detail);
