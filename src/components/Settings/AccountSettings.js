import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import {Box,Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";
import { Container } from "@mui/material";


// const useStyles = makeStyles(theme => ({
//     textField:{
//         border :"1px solid red"
//     }
// }))
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 30
}));

const styles = theme => ({
    textFielStyle: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderRadius: 30
        },

        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
        "& label.Mui-focused": {
            color: "red"
        }
    },
    bottmStyle: {
        backgroundColor: "red",
        "&:hover": {
            backgroundColor: "darkred"
        }

    },
    containerStyle: {
        "& .MuiContainer-root": {
            backgroundColor: "gray"
        }
    }
});


const theme = createTheme();

class PublicProfile extends React.Component {
    constructor(){
        super();
        this.state={
            email: "",
            password: "",
            passwordValid:false,
            age:0,
            gender:"",
            language:"",
            country:"",
            interested:[]
        }
    }
    // setemail=(e)=>{
    //     this.setState({email:e.target.value})
    // }
    // setpass=(e)=>{
    //     let password = e.target.value
    //     this.setState({password:password,passwordValid:password.length >=8})
    // }
    // setage=(e)=>{
    //     this.setState({age:e.target.value})
    // }
render(){
    const { classes } = this.props;
    return <div>

        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                bgcolor: 'white',
            }}
        >
            <Container>
            <Typography component="h1" variant="h2" sx={{ fontSize: 35, color: 'black', fontWeight:"bold" }}>
                Account settings
            </Typography>
            <Typography component="h1" variant="subtitle2" sx={{ fontSize: 12, color: 'black' }}>
            Set your login preferences, help us personalize your experience and make big account changes here
            </Typography>
            </Container>
            <Container>
            <Typography component="h3" variant="h3" sx={{ mt:5,fontSize: 20, color: 'black', fontWeight:600 }}>
                Basic information
            </Typography>
            </Container>
            <TextField
                    error
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    className={classes.textFielStyle}
                    helperText="Required."
                    // onChange={this.setemail}
                    // value={this.state.email}
                />
                <TextField
                    // error
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="old-Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                    className={classes.textFielStyle}
                    // helperText="Required."
                    // onChange={this.setemail}
                    // value={this.state.email}
                />
            <Grid container spacing> 
            <Grid item xs={10}>
            <TextField
                    // error
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="new-Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    autoFocus
                    className={classes.textFielStyle}
                    // helperText="Required."
                    // onChange={this.setemail}
                    // value={this.state.email}
                />
            </Grid>
            <Grid item xs={2}>
            <Button
                    type="submit"
                    fullWidth
                    variant="Change"
                    sx={{ mt:2,borderRadius: 30, bgcolor: "white", ":hover": { bgcolor: "darkgray" } ,width:100,height:50}}
                    onClick={(e)=>{console.log("change photo"); e.preventDefault();}}
                    // type="submit" 
                >
                    Change
                </Button>
            </Grid>
            </Grid>
               
            </Box>


        </div>
}




}
export default withStyles(styles)(PublicProfile);