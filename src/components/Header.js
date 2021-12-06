import React, { useState } from 'react'
import styled from 'styled-components'
import PinterestIcon from '@mui/icons-material/Pinterest';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FaceIcon from "@mui/icons-material/Face";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextsmsIcon from "@mui/icons-material/Textsms";
import DropMenu from './DropMenu'
import {Link} from 'react-router-dom'


function Header(props) {
    const [input, setInput] = useState("");
    //state={}
    //setState(state)

    const onSearchSubmit = (e) => {
        e.preventDefault();
        props.onSumbit(input);
        console.log("this is the input ", input);
    }
    return (
        <Wrapper>
            <LogoWrapper>
                <IconButton>
                    <PinterestIcon />
                </IconButton>
            </LogoWrapper>
            <HomePageButton>
                <a href="/home">Home</a>
            </HomePageButton>
            {/* <FollowingButton>
                <a href="/">Following</a>
            </FollowingButton> */}
            <SearchWrapper>
                <SearchBarWrapper>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <form>
                        <input type="text" onChange={(e) => setInput(e.target.value)} />
                        <button type="submit" onClick={onSearchSubmit}></button>
                    </form>
                </SearchBarWrapper>
            </SearchWrapper>
            <IconWrapper>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                {/* <IconButton>
                    <TextsmsIcon />
                </IconButton> */}
                <IconButton>
                   <Link to="/profile"> <FaceIcon /></Link>
                </IconButton>
                <IconButton>
                    <DropMenu userLogout={props.userLogout}/>
                    {/* <KeyboardArrowDownIcon /> */}
                </IconButton>
            </IconWrapper>
        </Wrapper>
    );
}

export default Header

const Wrapper = styled.div`
    display:flex;
    align-items:center;
    height:12px 4px 4px 16px;
    background-color:white;
    color:blck;
`
const LogoWrapper = styled.div`
  .MuiSvgIcon-root {
    color: #e60023;
    font-size: 32px;
    cursor: pointer;
  }
`
const HomeButtons = styled.div`
  display: flex;
  height: 48px;
  margin-right:5px;
  min-width: 123px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  cursor: pointer;
`;
const HomePageButton = styled(HomeButtons)`
//   background-color:rgb(17,17,17);
//   a{
//       text-decoration:none;
//       color:white;
//       font-weight:700;
//   }
background-color: white;
a {
  text-decoration: none;
  color: black;
  font-weight: 700;
}
:hover {
  background-color: #e1e1e1;
}
`
const FollowingButton = styled(HomeButtons)`
  background-color: white;
  a {
    text-decoration: none;
    color: black;
    font-weight: 700;
  }
:hover {
    background-color: #e1e1e1;
}
`


const SearchWrapper = styled.div`
    flex:1;
`
const SearchBarWrapper = styled.div`
  background-color: #efefef;
  display: flex;
  height:48px
  width: 100%;
  border-radius: 50px;
  border: none;
  padding-left:10px ;
  
  form {
    display:flex;
    flex:1;
  }
  form > input{
      background-color:transparent;
      width:100%;
      margin-left:5px;
      font-size:16px;
      border:none;
  }

  form > button {
      display:none;
  }

  input:focus{
      outline:none;
  }

`
const IconWrapper = styled.div``

