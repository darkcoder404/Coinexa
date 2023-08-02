import React from "react";
import Header from "./Header";
import ICO from "./ICO";
import Balance from "./Balance";
import Transfer from "./Transfer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App(props) {

  return (
    <div id="screen">
    {/* <Router>
           <div className="App">
            <ul className="App-header">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
           <Routes>
                 <Route  path='/home?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai' element={< Balance />}></Route>
                 <Route  path='/about' element={< Balance />}></Route>
                 <Route  path='/contact' element={< ICO />}></Route>
          </Routes>
          </div>
       </Router> */}
      <Header />
      <ICO userPrincipal={props.loggedInPrincipal}/>
      <Balance />
      <Transfer />
    </div>
  );
}

export default App;
