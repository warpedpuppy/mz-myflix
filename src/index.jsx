import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view.jsx';
// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';


// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render () {
    return <MainView/>;
  }
}

// class MyFlixApplication extends React.Component {

//   constructor() {
//     super();
//   }
//   render () {
//     return <MainView/>;
//   }

//  componentDidMount(){

//  }
// }

// Finds the app root
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

