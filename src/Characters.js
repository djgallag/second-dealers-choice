import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const Characters = ({ characters, match }) => {
  return (
        <ul>
          {
            characters.map( character => {
              return (
                <li key={ character.id } className={ match.params.id*1 === character.id ? 'selected': ''}>
                  <Link to={`/characters/${ character.id }`}>
                  { character.name }
                  </Link>
                </li>
              );
            })
          }
        </ul>
  )
};

export default connect(
  ({ characters })=> {
    return {
      characters
    };
  }
)(Characters);
