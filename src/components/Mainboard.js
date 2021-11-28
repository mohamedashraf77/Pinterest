import React from 'react'
import styled from "styled-components";
import Pin from './Pin';
import './Mainboard.css'
import AddPin from './AddPin'
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {Link} from 'react-router-dom'
import AddRoundedIcon from '@mui/icons-material/AddRounded';


function Mainboard({pins , onadd}) {
    //let { pins } = props
    console.log(pins);
    const addhandler=(item)=>{
        let x={...item}
        onadd(x)
        
    }

    return (
        <Wrapper>
            <Container className='mainboard__container'>
                {pins.map((pin, index) => {
                    let { urls } = pin;
                    return <Pin key={index} urls={urls} discUrl={urls.regular} savePin={addhandler}/>
                })}

            </Container>
            <Link to='/add'>
            <BottomNavigation
                sx={{
                    position: "fixed",
                    bottom: 10,
                    right:10,
                    width: 60,
                    borderRadius: 50,
                    margin: 2,
                    bgcolor: "gray"

                }}showLabels>
                <BottomNavigationAction    icon={<AddRoundedIcon />} />
            </BottomNavigation>
            </Link>
        </Wrapper>
    )
}

export default Mainboard


const Wrapper = styled.div`
  background-color: white;
  display: flex;
  height: 100%;
  width:100%;
  justify-content: center;
  margin-top:15px
`;
const Container = styled.div`
column-gap:10px;
margin:0 auto;
height:100%;
background-color:white;
`