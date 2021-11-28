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
                Public profile
            </Typography>
            <Typography component="h1" variant="subtitle2" sx={{ fontSize: 12, color: 'black' }}>
            People visiting your profile will see the following info
            </Typography>
            </Container>
            <Container>
            <Typography variant="body1" sx={{ fontSize: 18, color: 'gray' }}>
                Photo
            </Typography>
            <Stack direction="row"  >
                <Avatar alt="Anton samir" src="/static/images/avatar/1.jpg" sx={{ width: 120, height: 120 }}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="Change"
                    sx={{ ml:4,mt:4, borderRadius: 30, bgcolor: "gray", ":hover": { bgcolor: "darkgray" } ,width:100,height:50}}
                    onClick={(e)=>{console.log("change photo"); e.preventDefault();}}
                    // type="submit" 
                >
                    Change
                </Button>
            </Stack>
            </Container>
            <Box component="form"  noValidate sx={{ mt: 1 }} >
                <Grid container spacing>
            <Grid item xs={6}>
            <TextField
                    // error
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    type="text"
                    // autoComplete="email"
                    autoFocus
                    className={classes.textFielStyle}
                    helperText="Your profile needs a name."
                    // onChange={this.setemail}
                    // value={this.state.email}
                />
            </Grid> 

            <Grid item xs={6}>
            <TextField
                    // error
                    margin="normal"
                    // required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    type="text"
                    // autoComplete="email"
                    // autoFocus
                    className={classes.textFielStyle}
                    // helperText="Incorrect entry."
                    // onChange={this.setemail}
                    // value={this.state.email}
                />
            </Grid>
            </Grid>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="descripe"
                    label="Descripe your self"
                    type="text"
                    id="descripe"
                    // autoComplete="current-password"
                    className={classes.textFielStyle}
                    // onChange={this.setpass}
                    // value={this.state.password}

                />
                <TextField
                    margin="normal"
                    // required
                    fullWidth
                    name="website"
                    label="website"
                    placeholder="Add a link to drive traffic to your site"
                    type="text"
                    id="website"
                    // autoComplete="current-password"
                    className={classes.textFielStyle}
                    // onChange={this.setage}
                    // value={this.state.age}
                />
                <TextField
                    margin="normal"
                    // required
                    fullWidth
                    name="username"
                    label="username"
                    placeholder="Choose wisely so others can find you"
                    type="text"
                    id="website"
                    autoComplete="Your profile needs a username"
                    className={classes.textFielStyle}
                    // onChange={this.setage}
                    // value={this.state.age}
                />
                    
            </Box>
        </Box>


        </div>
}




}
export default withStyles(styles)(PublicProfile);