
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
import Setting from './components/Settings/Setting'
import BoardView from "./components/BoardView";
import Pin from "./components/Pin";



function App() {

  const [pins, setNewPins] = useState([]);
  const [allpins, setAllpins] = useState([{
      id: "1",
      name: "als",
      img: {
        full: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNzY3Mjh8MHwxfHNlYXJjaHwxMHx8ZG9nc3xlbnwwfHx8fDE2MzgwMTM3ODI&ixlib=rb-1.2.1&q=85",
        raw: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixid=MnwyNzY3Mjh8MHwxfHNlYXJjaHwxMHx8ZG9nc3xlbnwwfHx8fDE2MzgwMTM3ODI&ixlib=rb-1.2.1",
        regular: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzY3Mjh8MHwxfHNlYXJjaHwxMHx8ZG9nc3xlbnwwfHx8fDE2MzgwMTM3ODI&ixlib=rb-1.2.1&q=80&w=1080",
        small: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzY3Mjh8MHwxfHNlYXJjaHwxMHx8ZG9nc3xlbnwwfHx8fDE2MzgwMTM3ODI&ixlib=rb-1.2.1&q=80&w=400",
        thumb: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzY3Mjh8MHwxfHNlYXJjaHwxMHx8ZG9nc3xlbnwwfHx8fDE2MzgwMTM3ODI&ixlib=rb-1.2.1&q=80&w=200"
      },
      discUrl: "https://i.pinimg.com",
      board: [{ id: '', title: '' }],
      tags: [],
      userId: "",
    }]
  );
  const [newboard, setNewBoard] = useState(
     [{
      id: "1",
      title: "alexandria",
      Pinsid: ["", "", ""]
    }, {
      id: "2",
      title: "cats",
      Pinsid: ["", "", ""],
    }])
  const [user,setUser] = useState({
      id: "5000",
      first_name: "anton",
      last_name: "aly",
      phone: "01288878418",
      email: "",
      password: "",
      passwordValid: true,
      age: 0,
      gender: "male",
      language: "",
      country: "",
      interested: [],
      token: "",
      pins: [],
      boards: [],
      followers: [],
      following: []
    })
    
    const [notfications,setNotfications]=useState([{ user_id: "", date: "", title: "" }])


  //pin Functions
  const createPin = (pinItem) => {
    console.log(pinItem)
    setAllpins([...allpins,pinItem])
    console.log(allpins)

  }
  const deletePin = () => {

  }
  const editPin = () => {

  }
  const savePin = () => {

  }

  //boards Functions

  const createBoard = () => {

  }
  const editBoard = () => {

  }
  const DeleteBoard = () => {

  }

  //users Functions

  const userLogin = (userLogin) => {

    fetch("https://reqres.in/api/login",{
            method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(userLogin)
        }).then(res=>res.json())
        .then(obj=>{  
            if (obj.token) {
                alert("login success")
                setUser({...userLogin})
                console.log(user)
                
            } else {
                alert(obj.error)
            }
            
        })
       

  }
  const userSignup = (newUser) => {
    console.log(newUser)
    setUser({...user,...newUser})
    console.log(user)
    

  }
  const userLogout = () => {

  }
  const userFollowing = () => {

  }

  const userFollower = () => {

  }
  const userSearch = () => {

  }

  //Notfications Function

  const Notfication = () => {

  }

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
  const boardviewHandler = (item) => {
    setNewBoard([item])
    // console.log(newboard)
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
              <Details {...props} />
              <Mainboard pins={pins} onadd={boardviewHandler} />
            </>
          }>
            {/* <Details  /> */}
          </Route>
          <Route path="/boardview">
            <Header />
            <BoardView pins={newboard} />
          </Route>
          <Route path="/setting" >
            <Header />
            <Setting />
          </Route>
          <Route path='/add'>
            <Header onSumbit={onSearchSubmit} />
            <AddPin createPin={createPin} boards={newboard} userID={user.id} />
            {/* {allpins.map(pin=>(
              <Pin urls={pin.img} discUrl={pin.discUrl}/>
            ))} */}
            
          </Route>
          <Route path='/home'>
            <Header onSumbit={onSearchSubmit} />
            <Mainboard pins={pins} onadd={boardviewHandler} />
            {/* <BoardView pins={newboard} /> */}
            {/* <SignupPopup getimage={getNewPins} /> */}
          </Route>
          <Route path='/signin'>
            <Splash user={user} signIn={userLogin} signUp={userSignup}/>
          </Route>
          <Route path='/profile'>
            <Profile />
            {/* <Popup /> */}
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
