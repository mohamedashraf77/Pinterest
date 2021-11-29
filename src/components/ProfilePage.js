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
        // let boards = this.props.boards
        this.state = {
            first_name:user.first_name,
            last_name:user.last_name,
            profileimg: profile,
            followers: user.followers.length,
            following: user.following.length,
            board: [{
                name: "All Pins",
                images: [{
                    img: "https://image.shutterstock.com/z/stock-photo-business-accelerator-program-providing-a-launch-pad-for-companies-d-illustration-render-539542939.jpg",
                    cols: 2,
                    rows: 2
                },
                {
                    img: "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-shaving-effect-657743737.jpg",
                },
                {
                    img: "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-199485986.jpg",
                }],
                pin: 5,
                time: "2w"

            },

            {
                name: "Breakfast",
                images: [{
                    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
                    cols: 2,
                    rows: 2
                },
                {
                    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
                },
                {
                    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
                }],
                pin: 5,
                time: "2w"

            },
            {
                name: "Acceleration",
                images: [{
                    img: "https://image.shutterstock.com/z/stock-photo-business-accelerator-program-providing-a-launch-pad-for-companies-d-illustration-render-539542939.jpg",
                    cols: 2,
                    rows: 2
                },
                {
                    img: "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-shaving-effect-657743737.jpg",
                },
                {
                    img: "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-199485986.jpg",
                }],
                pin: 3,
                time: "2w"

            },
            {
                name: "Breakfast",
                images: [{
                    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
                    cols: 2,
                    rows: 2
                },
                {
                    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
                },
                {
                    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
                }],
                pin: 2,
                time: "2w"

            },


            ]

        }
    }

    dataToShow = () => {
        return <div>
            hii
        </div>
    }
    addBoard = (item) => {
        this.state.board.push(item)
        this.setState({ items: this.state.board });

    }
    componentDidMount=()=>{
        // console.log(this.props)
        // console.log(this.props.boards)
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
                <Popup addBoardfromPopup={this.addBoard} />


            </Container>


            <Container>

                <Grid container>
                    {this.props.boards.map((cat, i) => (
                        <Grid item xs={3} >

                            <a href="#">
                                <Box sx={{ borderRadius: 5, padding: 1, }}>

                                    {/* <ImageList variant="masonry" cols={3} gap={8} sx={{ borderRadius: 4 }}>
                                        {cat.images.filter((image, idx) => idx < 4).map(image => (

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
                                        cols={3}
                                        rowHeight={121}
                                        sx={{ borderRadius: 4 }}
                                    >
                                        {cat.images.filter((image, idx) => idx < 4).map(image => (
                                            <ImageListItem
                                                // key={cat.image.img}
                                                cols={image.cols || 1}
                                                rows={image.rows || 1}
                                            >
                                                <img
                                                    {...srcset(image.img, 121, image.cols, image.cols)}
                                                    alt={cat.name}
                                                    loading="lazy"
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                                </Box>
                            </a>
                            <Grid container >
                                <Grid item sx={6}>

                                    <Typography component="h2" variant="h6" sx={{ color: "black", fontWeight: "bold", marginLeft: 5, top: 0 }}>
                                        {cat.name}
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ color: "black", marginLeft: 5, top: 0 }}>
                                        {cat.pin} Pins {cat.time}
                                    </Typography>
                                </Grid>
                                <Grid >
                                    
                                    
                                    
                                    {/* <IconWrapper sx={{ float: "right" }}> */}
                                    <Container sx={{float:"right"}}>
                                        <IconButton>
                                            {/* <DeleteIcon sx={{ float: "right", cursor: "pointer", fontSize: 20 }} /> */}
                                            <Board />
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

