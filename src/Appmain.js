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
import { WindowSharp } from "@mui/icons-material";



function App() {
  const http_url = "http://localhost:8000/"
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
    let user = JSON.parse(localStorage.getItem("user")) 
    setAllpins([...allpins, pinItem])
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", user.Authorization);
    console.log(pinItem)
    var formdata = new FormData();
    formdata.append("title", pinItem.name);
    formdata.append("url", pinItem.file, pinItem.file.name);
    formdata.append("board_name", pinItem.board);
    formdata.append("description", pinItem.description);
    formdata.append("destination_link", pinItem.discUrl);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch((http_url+"pinterest_app/api/v1/crud/create/pin"), requestOptions)
      .then(response => response.text())
      .then(result => window.location.href="/home")
      .catch(error => console.log('error', error));

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

  const getBoards = ()=>{

    let user = JSON.parse(localStorage.getItem("user"))
    var myHeaders = new Headers();
    myHeaders.append("Authorization", user.Authorization);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch((http_url+"pinterest_app/api/v1/crud/create/pin"), requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }
  useEffect(()=>{
   
    
  },[])

  //boards Functions

  const createBoard = (item) => {
    let user = JSON.parse(localStorage.getItem("user"))
    var formdata = new FormData();
    formdata.append("title", item.title);
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/pinterest_app/api/v1/crud/create/board",
      headers:{'Authorization':user.Authorization},
      data: formdata
    }).then((res) =>
      {
        console.log(res.data)
        if(res.data){
          setNewBoard([...newboard, item])
        }
      })
      .catch((err) => console.log(err));
  }

  const editBoard = () => {

  }
  

  //users Functions

  const userLogin = (userLogin) => {
    localStorage.clear();
    console.log(userLogin)

    var formdata = new FormData();
    formdata.append("username", userLogin.email);
    formdata.append("password", userLogin.password);

    axios({
      method: 'post',
      url: (http_url+"account/api/v1/login"), 
      data: formdata
    }).then((res) =>
      {
        if(res.data.token){
          let token = "Token "+res.data.token
          setUser({...user,Authorization: token})
        }
      })
      .catch((err) => console.log(err));

  }
  useEffect(()=>{
    if(user.Authorization){
      console.log(user)
      localStorage.setItem("user", JSON.stringify(user))
      return <Redirect to="/home" />
    }
  },[user])
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
    let user = JSON.parse(localStorage.getItem("user"))
    axios({
      method: 'post',
      url: (http_url+"account/api/v1/logout"),
      headers:{'Authorization':user.Authorization},
    }).then((res) =>
      {
        if(res.data.message){
          localStorage.clear();
          window.location.href="/signin"
        }
      })
      .catch((err) => console.log(err));
  }
  const userFollowing = () => {

  }

  const userFollower = () => {

  }
  const userSearch = () => {

  }
  const userInterest = (imageList) => {
    console.log(imageList)
    // setUser({ ...user })
    let user = JSON.parse(localStorage.getItem("user"))
    user.interested.push(...imageList)
    console.log(user.interested)

    var formdata = new FormData();
    formdata.append("tags", imageList);

    axios({
      method: 'post',
      url: (http_url+"account/api/v1/tags"),
      headers: {'Authorization':user.Authorization}, 
      data: formdata
    }).then((res) =>
      {
        if(res.data.message){
          console.log(res.data.message)
          getNewPins()
        }
      })
      .catch((err) => console.log(err));

    
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
      let sePin = []
      results.forEach(item =>{
        let temPin = {url :item.urls.regular,
          discUrl:item.urls.regular}
        sePin.push(temPin)
        
      })

      // let newPins = [...results, ...pins];

      // newPins.sort(function (a, b) {

      //   return 0.5 - Math.random();

      // }); //for minimize the number of photo

      // setNewPins(newPins); //add the new value in pins

      console.log(sePin)
      setNewPins([...sePin])

    });

  };

  // const getimagefrompop = (categry)=>{
  //   console.log(typeof(categry),categry)
  //   console.log(pins)

  // }
  const getNewPins = (categry = "") => {
    console.log("kjsandasnodnasdnjenf")
    let user = JSON.parse(localStorage.getItem("user"))
    let promises = [];
    let pinData = [];
    let headers = {'Authorization':''}
    if (user != null){
      headers = {'Authorization':user.Authorization}
    }
    console.log(user)
    axios({
      method: 'GET',
      url: (http_url+"pinterest_app/api/v1/home"),
      headers: headers,
      redirect: 'follow'
    }).then((res) =>
      {
          let pins = res.data.pins
          pins.forEach(element => {
            element.url = http_url.slice(0,(http_url.length-1))+element.url
          });
          console.log(pins)
          setNewPins([...pins])

      })
      .catch((err) => console.log(err));

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
              <Header userLogout={userLogout}/>
              <BoardView board={newboard} {...props} />
            </>}>
          </Route>
          <Route path="/setting" >
            <Header userLogout={userLogout}/>
            <Setting />
          </Route>
          <Route path='/add'>
            <Header onSumbit={onSearchSubmit} userLogout={userLogout} />
            <AddPin createPin={createPin} boards={newboard} userID={user.id} />
            {allpins.map(pin => (
              <Pin urls={pin.img} discUrl={pin.discUrl} deletePin={deletePin} key={pin.id} pinId={pin.id} onEdit={editPin} savePin={savePin} />
            ))}userLogout={userLogout}

          </Route>
          <Route path='/home'>
            <Header onSumbit={onSearchSubmit} userLogout={userLogout}/>
            <Mainboard pins={pins} onadd={boardviewHandler} />
            {/* <BoardView pins={newboard} /> */}
            <SignupPopup getimage={userInterest} gender={gender}/>
          </Route> 
          {/* <Route exact path="/">
            {user.Authorization ? <Redirect to="/home" /> : <> <Header onSumbit={onSearchSubmit} />
            <Mainboard pins={pins} onadd={boardviewHandler} /></>}

          </Route> */}
          <Route path='/profile'>
            <Profile userData={user} boards={newboard} createBoard={createBoard} />
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
