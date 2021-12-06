import React from "react";
import profile from './images/profile.jpg'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Header from "./Header";
import { Box, Container, Typography, Grid, Button, Divider, List, ListItem, Icon } from "@mui/material";
// import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
// import styled from 'styled-components'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { bgcolor } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import Popup from "./Popup";
import DeleteIcon from '@mui/icons-material/Delete';
import Menu, { MenuProps } from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import Board from "./DropMenuBoard";
import equal from 'fast-deep-equal';
import {Link} from 'react-router-dom';
import axios from "axios"

const http_url = "http://localhost:8000/";

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`
    };
}



class Profile extends React.Component {
    
    constructor(props) {
        super(props);
        let user = this.props.userData;
        this.state = {
            first_name:user.first_name,
            last_name:user.last_name,
            profileimg: profile,
            followers: user.followers.length,   
            following: user.following.length,
            boards:[]
        }
    }
    componentDidMount(){
        // console.log(prevProps)
        // if(prevProps.boards !== this.props.boards){
        //     this.setState({          
        //         boards: this.props.boards
        //     });
        

            let user = JSON.parse(localStorage.getItem("user"))
            var myHeaders = new Headers();
            myHeaders.append("Authorization", user.Authorization);
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
        
            fetch((http_url+"pinterest_app/api/v1/crud/board"), requestOptions)
              .then(response => response.text())
              .then(result => {
                  let boards = JSON.parse(result)
                  boards.forEach(eachboard => {
                    eachboard.pin.forEach(element => {
                        element.url = http_url.slice(0,(http_url.length-1))+element.url
                      });
                  });
                  this.setState({...this.state, boards:boards })
                  console.log(this.state)
              })
              .catch(error => console.log('error', error));
        
          }
          componentDidUpdate(prevProps){
            console.log(prevProps)
            if(prevProps.boards !== this.props.boards){
                this.componentDidMount()
            
            }
    
        }
         
        deleteBoard = (id) => {
            console.log(id)
            // setNewBoard(newboard.filter(pin => pin.id !== id))
        
            let user = JSON.parse(localStorage.getItem("user"))
            axios({
              method: 'DELETE',
              url: http_url+"pinterest_app/api/v1/crud/delete/board/"+id,
              headers:{'Authorization':user.Authorization},
            }).then((res) =>
              {
                console.log(res.data)
                this.componentDidMount()
                
            // this.setState(this.state.boards.filter(board => board.id !== id))
              })
              .catch((err) => console.log(err));

        
          }



    render() {
        return <div>
            <Header />
            <Container component="main" maxWidth="ms" >

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 5,
                        bgcolor: 'white',
                    }}
                >
                    <Stack direction="row" spacing={2}>
                        <Avatar alt={this.state.name} src={this.state.profileimg} sx={{ width: 120, height: 120 }} />

                    </Stack>


                    <Typography component="h1" variant="h5" sx={{ fontSize: 35, color: 'black', fontWeight: "bold" }}>
                        {this.state.first_name} {this.state.last_name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: 15, color: 'black', fontWeight: "bold" }}>
                        {this.state.followers} followers · {this.state.following} following
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: 30, bgcolor: "gray", ":hover": { bgcolor: "darkgray" }, width: 200 }}
                        onClick={(e) => { window.location.href = "/setting"; e.preventDefault(); }}
                    // type="submit" 
                    >
                        Edit Profile
                    </Button>

                </Box>
            </Container>
            <Divider variant="middle" sx={{ margin: 3 }} />
            <Container>
                <Popup addBoardfromPopup={this.props.createBoard} />
            </Container>


            <Container>

                <Grid container>
                    {console.log(this.state.boards)}
                    {this.state.boards.map((cat, i) => (
                        <Grid item xs={3} >

                            <Link to={`/boardview/${cat.id}`}>
                                <Box sx={{ borderRadius: 5, padding: 1, }}>

                                    {/* <ImageList variant="masonry" cols={3} gap={8} sx={{ borderRadius: 4 }}>
                                        {cat.images.filter((image, idx) => idx < 5).map(image => (

                                            <ImageListItem  >
                                                <img
                                                    src={image}
                                                    loading="lazy"
                                                />
                                            </ImageListItem>

                                        ))}
                                    </ImageList> */}
                                     <ImageList
                                        sx={{ width: 1, height: 1 }}
                                        variant="quilted"
                                        cols={2}
                                        rowHeight={121}
                                        sx={{ borderRadius: 4 }}
                                    >
                                        {cat.pin.filter((image, idx) => idx < 4).map(image => (
                                            <ImageListItem
                                                // key={cat.image.img}
                                                // cols={1}
                                                // rows={1}
                                            >
                                                <img
                                                    {...srcset(image.url, 121, 1, 1)}
                                                    alt={cat.title}
                                                    loading="lazy"
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </Box>
                            </Link>
                            <Grid container >
                                <Grid item sx={6}>

                                    <Typography component="h2" variant="h6" sx={{ color: "black", fontWeight: "bold", marginLeft: 5, top: 0 }}>
                                        {cat.title}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: "black", marginLeft: 5, top: 0 }}>
                                         {cat.pin.length} Pins
                                    </Typography>
                                </Grid>
                                <Grid >
                                    
                                    
                                    
                                    {/* <IconWrapper sx={{ float: "right" }}> */}
                                    <Container sx={{float:"right"}}>
                                        <IconButton>
                                            {/* <DeleteIcon sx={{ float: "right", cursor: "pointer", fontSize: 20 }} /> */}
                                            <DeleteIcon onClick={()=>this.deleteBoard(cat.id)}/>
                                        </IconButton>
                                    {/* </IconWrapper>   */}
                                    </Container>
                                   


                                </Grid>

                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    }
}

export default Profile

