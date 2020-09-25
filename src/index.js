import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Link, Route} from 'react-router-dom';
import Characters from './Characters';
import Detail from './Detail';
import Create from './Create';
import { Provider, connect } from 'react-redux';
import store, { fetchCharacters } from './store';


class _App extends React.Component{
  constructor(){
    super();
  }
  componentDidMount(){
    this.props.load();
  }
  render(){
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to='/'>Dark Souls</Link>
            </li>
            <li>
              <Link to='/characters'>Character List ({ this.props.count })</Link>
            </li>
            <li>
              { this.props.count < 10 && <Link to='/create'>Create a Character</Link> }
            </li>
          </ul>
          <Route path='/create' component={ Create } />
          <Route path='/characters/:id' component={ Detail } />
          <Route path='/characters' exact component={ Characters } />
        </div>
      </Router>
    );
  }
}

const App = connect(({ characters })=> {
  return {
    count: characters.length
  };
},(dispatch)=> {
  return {
    load: ()=> dispatch(fetchCharacters())
  };
})(_App);

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
