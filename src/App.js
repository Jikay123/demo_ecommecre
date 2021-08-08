import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './Components/Cart';
import HistoryShoping from './Components/HistoryShoping';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import DetailProduct from './Components/Shop/DetailProduct';
import SmartPhone from './Components/Shop/SmartPhone';
import { auth } from './Firebase';
import ScrollTop from './ScrollTop';
function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    })
  }, [user])

  return (
    <div className="App">
      <Router>
        <ScrollTop />
        <Switch>
          <Route path="/" exact  >
            <Home />
          </Route>
          <Route path="/login" exact  >
            <Login />
          </Route>
          <Route path="/smartphone" exact  >
            <SmartPhone />
          </Route>
          <Route path="/smartphone/:idproduct" exact  >
            <DetailProduct />
          </Route>
          <Route path="/cart" exact >
            <Cart user={user} />
          </Route>
          <Route path="/historis" exact>
            <HistoryShoping user={user} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
