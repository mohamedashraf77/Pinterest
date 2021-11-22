
import Splash from "./components/Splash";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";



import './App.css';
import React, { useState, useEffect  } from "react";
import Header from './components/Header';
import Mainboard from './components/Mainboard';
import unsplash from './api/unsplash';
import AddPin from './components/AddPin';
import { BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";




function App() {
  
const [pins, setNewPins] = useState([]);

const getImage = (term) => {
  return unsplash.get("https://api.unsplash.com/search/photos", {
    params: {
      query: term,
    },
  });
};

const onSearchSubmit = (term) => {
  // console.log(term);
  getImage(term).then((res) => {
    let results = res.data.results;
    let newPins = [...results, ...pins];
    newPins.sort(function (a, b) {
      return 0.5 - Math.random();
    }); //for minimize the number of photo
    setNewPins(newPins); //add the new value in pins
    console.log(newPins)
  });
};
const getNewPins = ()=>{
  let promises = [];
  let pinData = [];
  let pins = ["ocean", "Tokyo", "dogs", "cats"];

  pins.forEach((pinTerm) => {
    promises.push(
      getImage(pinTerm).then((res) => {
        let results = res.data.results;

        pinData = pinData.concat(results);
        pinData.sort(function (a, b) {
          return 0.5 - Math.random();
        });
      })
    );
  });
  Promise.all(promises).then(() => {
    setNewPins(pinData);
  });
}

useEffect(()=>{
  getNewPins();
},[])


  return (
    <Router>
    <div className="app">
      <Switch>
      <Route path='/add'>
      <Header onSumbit={onSearchSubmit} />
      <AddPin />
      </Route>
        <Route path='/home'>
      <Header onSumbit={onSearchSubmit} />
      <Mainboard pins={pins} />
      </Route>
      <Route path='/signin'>
      <Splash />
      </Route>
      <Redirect path='/' to='/signin' />
      {/* <AddPin />  */}
       {/*<Model /> 
      <Modal_pin /> */}
      </Switch>
    </div>
    </Router>
  );
}

export default App;
