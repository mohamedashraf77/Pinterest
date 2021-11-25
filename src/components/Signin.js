import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import { withStyles } from "@mui/styles";


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


// export default function SignUp() {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         // eslint-disable-next-line no-console
//         console.log({
//             email: data.get('email'),
//             password: data.get('password'),
//         });
//     };
class SignIn extends React.Component {
    constructor(){
        super();
        this.state={
            email: "",
            password: ""
        }
    }
    setemail=(e)=>{
        this.setState({email:e.target.value})
    }
    setpass=(e)=>{
        this.setState({password:e.target.value})
    }
    submit=(e)=>{
        e.preventDefault();
        fetch("https://reqres.in/api/login",{
            method: "POST",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(this.state)
        }).then(res=>res.json())
        .then(obj=>{  
            if (obj.token) {
                alert("login success")
                
            } else {
                alert(obj.error)
            }
            
        })
        
    }
render(){
    const { classes } = this.props;
    return <div>

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

                                <Avatar sx={{ m: 1, bgcolor: 'red' }}>
                                    <PinterestIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5" sx={{ fontSize: 35 ,color:'black' }}>
                                    Welcome to Pinterest
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: 18 ,color:'gray' }}>
                                    Find new ideas to try
                                </Typography>
                                <Box component="form"  noValidate sx={{ mt: 1, padding: 5 }} >
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        autoFocus
                                        className={classes.textFielStyle}
                                        onChange={this.setemail}


                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        className={classes.textFielStyle}
                                        onChange={this.setpass}

                                    />
                                   
                                    {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                                    <Grid container>
                                        <Grid item >
                                            <Link href="#" variant="body2" underline="hover" style={{ flex: 1 }} sx={{ color: "black", fontWeight: "bold", ":hover": { color: "black" } }}>
                                                Forgot Your password?
                                            </Link>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, borderRadius: 30, bgcolor: "red", ":hover": { bgcolor: "darkred" } }}
                                        onClick={this.submit}
                                    >
                                        Log In
                                    </Button>
                                    <Typography  variant="body1" sx={{color:'black' ,fontSize:12}}>
                                    By continuing, you agree to Pinterest's
                                </Typography>
                                    <Grid container>
                                        <Grid item xs={4}>
                                        <Typography  variant="subtitle2" sx={{color:'black', fontSize:12 , fontWeight:'bold'}}>
                                        Terms of Service
                                </Typography>
                                        </Grid>
                                        <Grid item>
                                            {/* <Link href="#" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link> */}
                                            <Typography  variant="body1" sx={{color:'black', fontSize:12}}>
                                            and acknowledge you've read our
                                </Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider variant="middle" sx={{margin:3}}/>

                                    <Link to="/signup" variant="body2" underline="hover" style={{ flex: 1 }} sx={{ color: "black", fontWeight: "bold", ":hover": { color: "black" } }}>
                                    Not on Pinterest yet? Sign up
                                            </Link>
                                </Box>
                            </Box>


                            </div>
}



}
export default withStyles(styles)(SignIn);