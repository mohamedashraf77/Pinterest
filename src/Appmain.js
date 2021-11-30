import Splash from "./components/Splash";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import './App.css';
import React, { useState, useEffect  } from "react";
import Header from './components/Header';
import Mainboard from './components/Mainboard';
import unsplash from './api/unsplash';
import AddPin from './components/AddPin';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from "react-router-dom";
import SignupPopup from './components/signupComponants/SignupPopup'
import CategriesSelection from './components/signupComponants/CategriesSelection'
import Profile from "./components/ProfilePage";
import Popup from "./components/Popup";
import Details from "./components/Details"
import Setting from './components/Settings/Setting'
import BoardView from "./components/BoardView";
import Pin from "./components/Pin";
import { Avatar } from '@mui/material/Avatar';
import EditPin from './components/EditPin';
import axios from "axios";
import { withRouter } from "react-router-dom";



function App() {
  const [pins, setNewPins] = useState([]);
  const [allpins, setAllpins] = useState([{
    id: "1",
    name: "als",
    img: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzY3Mjh8MHwxfHNlYXJjaHwxMHx8ZG9nc3xlbnwwfHx8fDE2MzgwMTM3ODI&ixlib=rb-1.2.1&q=80&w=1080",
    discUrl: "https://i.pinimg.com",
    board: [{ id: '2', title: 'cat' }],
    tags: [],
    userId: "",
    description: "decripttion test",
  },
  {
    id: "2",
    name: "als",
    img: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzY3Mjh8MHwxfHNlYXJjaHwxMHx8ZG9nc3xlbnwwfHx8fDE2MzgwMTM3ODI&ixlib=rb-1.2.1&q=80&w=1080",
    discUrl: "https://i.pinimg.com",
    board: [{ id: '1', title: 'alexandria' }],
    tags: [],
    userId: "",
    description: "decripttion test",
  }]
  );
  const [newboard, setNewBoard] = useState(
    [{
      id: "1",
      title: "All Pins",
      pins: [{
        id: "",
        img: "https://image.shutterstock.com/z/stock-photo-business-accelerator-program-providing-a-launch-pad-for-companies-d-illustration-render-539542939.jpg",
        cols: 2,
        rows: 2
      },
      {
        id: "",
        img: "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-shaving-effect-657743737.jpg",
      },
      {
        id: "",
        img: "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-199485986.jpg",
      }],
      pin: 5,
      time: "2w"


    }, {
      id: "2",
      title: "cat",
      pins: [{
        id: "",
        img: "https://image.shutterstock.com/z/stock-photo-business-accelerator-program-providing-a-launch-pad-for-companies-d-illustration-render-539542939.jpg",
        cols: 2,
        rows: 2
      },
      {
        id: "",
        img: "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-shaving-effect-657743737.jpg",
      },
      {
        id: "",
        img: "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-199485986.jpg",
      }],
      pin: 5,
      time: "2w"


    }])
  const [user, setUser] = useState({
    id: '',
    first_name: '',
    last_name: '',
    Avatar: '',
    phone: '',
    email: '',
    password: '',
    passwordValid: '',
    age: '',
    gender: '',
    language: '',
    country: '',
    interested: [],
    Authorization: '',
    pins: [],
    boards: [],
    followers: ['', ''],
    following: ['', '', '']
  })

  const [notfications, setNotfications] = useState([{ user_id: "", date: "", title: "" }])


  //pin Functions
  const createPin = (pinItem) => {
    // console.log(pinItem)
    setAllpins([...allpins, pinItem])
    // console.log(allpins)

  }
  const deletePin = (id) => {

    setAllpins(allpins.filter(pin => pin.id !== id))

  }
  const editPin = (pindetails) => {

    let itemIndex = allpins.findIndex((item) => item.id == pindetails.id)
    console.log(itemIndex)
    allpins[itemIndex] = pindetails
    setAllpins(allpins)
    console.log(allpins)


  }
  const savePin = (item) => {
    console.log(item)


  }


  //boards Functions

  const createBoard = (item) => {
    setNewBoard([...newboard, item])
  }
  const editBoard = () => {

  }
  const deleteBoard = (id) => {
    console.log(id)
    setNewBoard(newboard.filter(pin => pin.id !== id))


  }

  //users Functions

  const userLogin = (userLogin) => {

    fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify(userLogin)
    }).then(res => res.json())
      .then(obj => {
        if (obj.token) {
          alert("login success")
          setUser({ ...userLogin })
          console.log(user)

          return <Redirect to="/home" />



        } else {
          alert(obj.error)
        }

      })


  }
  const userSignup = (newUser) => {
    var formdata = new FormData();
    formdata.append("email", newUser.email);
    formdata.append("password", newUser.password);
    formdata.append("password2", newUser.password);
    formdata.append("age", newUser.age);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      headers:{'content-type':"application/json"},
    };

    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/account/api/v1/signup",
      headers: {}, 
      data: formdata
    }).then((res) =>
      {
        if(res.data.Authorization){
          newUser.Authorization= res.data.Authorization
          setUser({...user,...newUser})
        }
      })
      .catch((err) => console.log(err));
    
  }
  useEffect(()=>{

    console.log(user)
    if(user.Authorization){
      localStorage.setItem("user", JSON.stringify(user))
      window.location.href="/home"
    }
  },[user])
  const userLogout = () => {

  }
  const userFollowing = () => {

  }

  const userFollower = () => {

  }
  const userSearch = () => {

  }
  const userInterest = (imageList) => {
    console.log(imageList)
    user.interested.push(...imageList)
    setUser({ ...user })
    console.log(user.interested)
    getNewPins()
  }
  const gender = (item) => {
    let user = JSON.parse(localStorage.getItem("user"))

    user.gender = item
    // setUser({...user,gender: user.gender })
    var formdata = new FormData();
    formdata.append("gender", user.gender);
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/account/api/v1/gender",
      headers:{'Authorization':user.Authorization}, 
      data: formdata
    }).then((res) =>
      {
        if(res.data.message == "done"){
          console.log("done")
        }
      })
      .catch((err) => console.log(err));
    //setUser({ gender: user.gender })
    localStorage.setItem("user", JSON.stringify(user))
    console.log(user)
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

    let pins = [...user.interested];
    // pins.push(categry)
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
          
          <Route path='/edit/:id' render={(props) =>
            <>
              <Header onSumbit={onSearchSubmit} />
              <EditPin pins={allpins} board={newboard} {...props} userID={user.id} editPin={editPin} />

            </>
          }>
          </Route>
          <Route path='/show/:id' render={(props) =>
            <>
              <Header onSumbit={onSearchSubmit} />
              <Details {...props} />
              <Mainboard pins={pins} onadd={boardviewHandler} />
            </>
          }>
            {/* <Details  /> */}
          </Route>
          <Route path="/boardview/:id" render={(props) =>
            <>
              <Header />
              <BoardView board={newboard} {...props} />
            </>}>
          </Route>
          <Route path="/setting" >
            <Header />
            <Setting />
          </Route>
          <Route path='/add'>
            <Header onSumbit={onSearchSubmit} />
            <AddPin createPin={createPin} boards={newboard} userID={user.id} />
            {allpins.map(pin => (
              <Pin urls={pin.img} discUrl={pin.discUrl} deletePin={deletePin} key={pin.id} pinId={pin.id} onEdit={editPin} savePin={savePin} />
            ))}

          </Route>
          <Route path='/home'>
            <Header onSumbit={onSearchSubmit} />
            <Mainboard pins={pins} onadd={boardviewHandler} />
            {/* <BoardView pins={newboard} /> */}
            <SignupPopup getimage={userInterest} gender={gender}/>
          </Route> 
          {/* <Route exact path="/">
            {user.Authorization ? <Redirect to="/home" /> : <> <Header onSumbit={onSearchSubmit} />
            <Mainboard pins={pins} onadd={boardviewHandler} /></>}

          </Route> */}
          <Route path='/profile'>
            <Profile userData={user} boards={newboard} />
          </Route>
            
          <Route path='/signin' render={props=><Splash user={user} signIn={userLogin} signUp={userSignup}{...props} />}/>
            {/* <Popup /> */}
        
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
