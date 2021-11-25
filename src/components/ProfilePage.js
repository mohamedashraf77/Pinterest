import React from "react";
import profile from './images/profile.jpg'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Header from "./Header";
import { Box, Container, Typography, Grid, Button, Divider, List, ListItem, } from "@mui/material";
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { bgcolor } from "@mui/system";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "Anton Samir",
            profileimg: profile,
            followers: 30,
            following: 23,
            board: [{
                name: "Acceleration",
                images: [
                    "https://image.shutterstock.com/z/stock-photo-business-accelerator-program-providing-a-launch-pad-for-companies-d-illustration-render-539542939.jpg",
                    "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-shaving-effect-657743737.jpg",
                    "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-199485986.jpg",
                    "https://image.shutterstock.com/z/stock-photo-hand-turning-a-button-with-a-rocket-icon-to-the-maximum-acceleration-concept-of-career-585388175.jpg",
                    "https://image.shutterstock.com/z/stock-photo-spacecraft-takes-off-into-space-rocket-flies-to-mars-red-planet-mars-in-space-1047890749.jpg",
                    "https://image.shutterstock.com/z/stock-photo-cloudy-launch-of-rocket-into-starry-outer-space-the-elements-of-this-image-furnished-by-nasa-1384231883.jpg"
                ],
                color: "red"

            },
            {
                name: "Advertising",
                images: [
                    "https://image.shutterstock.com/z/stock-photo-london-uk-july-people-and-new-famous-advertisements-in-piccadilly-circus-in-london-a-301225568.jpg",
                    "https://image.shutterstock.com/z/stock-photo-advertise-advertising-advertisement-branding-concept-281221427.jpg",
                    "https://image.shutterstock.com/z/stock-photo-scratched-advertising-89726605.jpg",
                    "https://image.shutterstock.com/z/stock-photo-hong-kong-october-mongkok-at-night-on-october-in-hong-kong-china-mongkok-in-229855126.jpg",
                    "https://image.shutterstock.com/z/stock-photo-outdoor-advertising-bus-shelter-323731910.jpg"
                ],
                color: "yellow"
            },
            {
                name: "AgroTech",
                images: [
                    "https://image.shutterstock.com/z/stock-photo-happy-farmer-using-digital-tablet-computer-in-cultivated-coffee-field-plantation-modern-technology-616760432.jpg",
                    "https://image.shutterstock.com/z/stock-photo-agricultural-field-in-a-clear-sunny-day-high-technologies-and-innovations-in-agro-industry-study-1188330049.jpg",
                    "https://image.shutterstock.com/z/stock-photo-agro-engineering-selective-focus-of-a-small-plant-being-used-for-agro-engineering-research-772453432.jpg"
                ],
                color: "gray"
            },
            {
                name: "Ask me anything",
                images: [
                    "https://image.shutterstock.com/z/stock-photo-question-mark-heap-on-table-concept-for-confusion-question-or-solution-264466154.jpg",
                    "https://image.shutterstock.com/z/stock-photo-he-got-some-questions-group-of-young-people-sitting-on-conference-together-while-one-man-raising-439207960.jpg",
                    "https://image.shutterstock.com/z/stock-photo-isolated-portrait-of-stylish-young-mixed-race-woman-with-dark-shaggy-hair-touching-her-chin-and-640007002.jpg",
                    "https://image.shutterstock.com/z/stock-photo-african-american-business-people-raising-there-hand-up-at-a-conference-to-answer-a-question-662965375.jpg"
                ],
                color: "black"
            },

            ]

        }
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
                        {this.state.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontSize: 15, color: 'black', fontWeight: "bold" }}>
                        {this.state.followers} followers · {this.state.following} following
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: 30, bgcolor: "gray", ":hover": { bgcolor: "darkgray" }, width: 200 }}
                        onClick={(e) => { window.location.href = "/home"; e.preventDefault(); }}
                    // type="submit" 
                    >
                        Edit Profile
                    </Button>

                </Box>
            </Container>
            <Divider variant="middle" sx={{ margin: 3 }} />

            <Container>

                <Grid container>
                    {this.state.board.map((cat, i) => (
                        <Grid item xs={3} >

                            <a href="#">
                                <Box sx={{ borderRadius: 5, bgcolor: "lightgray", padding: 1,margin:1 }}>

                                    <ImageList variant="masonry" cols={3} gap={8} sx={{ borderRadius: 4 }}>
                                        {cat.images.filter((image, idx) => idx < 3).map(image => (

                                            <ImageListItem  >
                                                <img
                                                    src={image}

                                                    loading="lazy"

                                                />
                                            </ImageListItem>

                                        ))}
                                    </ImageList>
                                </Box>
                                <Typography component="h1" variant="h5" sx={{ fontSize: 10, color: "black", fontWeight: "bold" }}>
                                    {cat.name}
                                </Typography>
                            </a>

                        </Grid>


                    ))}


                </Grid>



            </Container>








        </div>
    }
}

export default Profile