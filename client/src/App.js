import React, { Component } from 'react';
import './styles/App.css';
import Slider from "./components/slider.component"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

//import font awesome arrows and add to library 
library.add(
  faAngleLeft,
  faAngleRight
);

class App extends Component {

  render() {
    return (
      <div className="container">
        < Slider />
      </div>
    );
  }
}

export default App;