import React from "react";
import SignIn from "./Signin";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import bground from './images/bground.png'
import SignUp from "./Signup";
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 30
}));

export default class Splash extends React.Component{
    render(){
        return <div>
            
            <Router>
                
        <Container component="main" maxWidth="ms" sx={{ backgroundImage: `url(${bground})`}}>
            <Container maxWidth="ms" sx={{bgcolor:"rgba(0, 0, 0, 0.32)",}}>
            <CssBaseline />
            <Box sx={{ flexGrow: 1 ,padding: 3}} >
                <Grid container spacing={2}>
                    
                    <Grid item xs={8}>

                        <Typography component="h1" variant="h5" sx={{ fontSize: 70 ,color:"white",fontWeight:"bold"}}>
                        Sign up to get 
                            </Typography>
                            <Typography component="h1" variant="h5" sx={{ fontSize: 70 ,color:"white"}}>
                         your ideas
                            </Typography>

                    </Grid>
                    <Grid item xs={4}>

                        <Item>
                            <Switch>
                                <Route path = "/signin" ><SignIn user={this.props.user} signIn={this.props.signIn}/></Route>
                                <Route path = "/signup" ><SignUp user={this.props.user} signUp={this.props.signUp}/></Route>
                                
                                
                            </Switch>
                        </Item>
                    </Grid>

                </Grid>
            </Box>


            </Container>
        </Container>
        </Router>
        </div>

    }
}