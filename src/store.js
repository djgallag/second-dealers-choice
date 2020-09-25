import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const SET_CHARACTERS = 'SET_CHARACTERS';
const UPDATE_CHARACTER = 'UPDATE_CHARACTER';
const CREATE_CHARACTER = 'CREATE_CHARACTER';
const DESTROY_CHARACTER = 'DESTROY_CHARACTER';

const charactersReducer = (state = [], action)=> {
  if(action.type === SET_CHARACTERS){
    state = action.characters
  }
  if(action.type === UPDATE_CHARACTER){
    state = state.map(character => character.id === action.character.id ? action.character : character);
  }
  if(action.type === DESTROY_CHARACTER){
    state = state.filter(character => character.id !== action.id*1);
  }
  if(action.type === CREATE_CHARACTER){
    state = [action.character, ...state];
  }
  return state;
};

const setCharacters = (characters)=> {
  return {
    type: SET_CHARACTERS,
    characters
  };
};

const fetchCharacters = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/characters');
    dispatch(setCharacters(response.data));
  };
};

const destroyCharacter = ({ id, history })=> {
  return async(dispatch)=> {
    await axios.delete(`/api/characters/${id}`);
    dispatch(_destroyCharacter(id));
    history.push('/characters');
  };
};

const _destroyCharacter = (id)=> {
  return {
    type: DESTROY_CHARACTER,
    id
  };
};

const _updateCharacter = (character)=> {
  return {
    type: UPDATE_CHARACTER,
    character
  };
};


const updateCharacter = ({ name, id, history })=> {
  return async(dispatch)=> {
    const response = await axios.put(`/api/characters/${id}`, { name });
    dispatch(_updateCharacter(response.data));
    history.push('/characters');
  };
};

const _createCharacter = (character)=> {
  return {
    type: CREATE_CHARACTER,
    character
  };
};


const createCharacter = ({ name, history })=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/characters', { name });
    dispatch(_createCharacter(response.data));
    history.push('/characters');
  };
};

const reducer = combineReducers({
  characters: charactersReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { fetchCharacters, updateCharacter, destroyCharacter, createCharacter };
