
import Splash from "./components/Splash";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";



import './App.css';
import React, { useState, useEffect } from "react";
import Header from './components/Header';
import Mainboard from './components/Mainboard';
import unsplash from './api/unsplash';
import AddPin from './components/AddPin';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SignupPopup from './components/signupComponants/SignupPopup'
import CategriesSelection from './components/signupComponants/CategriesSelection'
import Profile from "./components/ProfilePage";
import Popup from "./components/Popup";
import Details from "./components/Details"




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

  // const getimagefrompop = (categry)=>{
  //   console.log(typeof(categry),categry)
  //   console.log(pins)

  // }
  const getNewPins = (categry = "") => {
    let promises = [];
    let pinData = [];
    let pins = ["ocean", "Tokyo", "dogs", "Burger"];
    pins.push(categry)
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
    console.log(pins)

  }

  useEffect(() => {
    getNewPins();
  }, [])


  return (
    <Router>
      <div className="app">
        <Switch>
        <Route path='/show/:id' render={(props) =>
        <>
        <Header onSumbit={onSearchSubmit} />
        <Details {...props}/>
        <Mainboard pins={pins} />
      </>
        }>
        {/* <Details  /> */}
      </Route>
          <Route path='/add'>
            <Header onSumbit={onSearchSubmit} />
            <AddPin />
          </Route>
          <Route path='/home'>
            <Header onSumbit={onSearchSubmit} />
            <Mainboard pins={pins} />
            <SignupPopup getimage={getNewPins} />
          </Route>
          <Route path='/signin'>
            <Splash />
          </Route>
          <Route path='/profile'>
            <Profile />
            <Popup />
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
