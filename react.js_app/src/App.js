import './App.css';
import AppContainer from './containers/AppContainer';
import {BrowserRouter} from 'react-router-dom';
import AnimatedCursor from "react-animated-cursor"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedCursor  />
        <AppContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
