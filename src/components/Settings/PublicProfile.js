import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box, Stack } from '@mui/material';
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
const http_url = "http://localhost:8000/";
class PublicProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            avatar: '',

        }
    }
    setefirst = (e) => {
        this.setState({ first_name: e.target.value })
    }
    setlast = (e) => {
        this.setState({ last_name: e.target.value })
    }

    submitForm = () => {
        let user = JSON.parse(localStorage.getItem("user"))
        var myHeaders = new Headers();
        myHeaders.append("Authorization", user.Authorization);

        var formdata = new FormData();
        formdata.append("first_name", this.state.first_name);
        formdata.append("last_name", this.state.last_name);


        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/account/api/v1/update", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }
    componentDidMount = () => {
        let user = JSON.parse(localStorage.getItem("user"))
        var myHeaders = new Headers();
        myHeaders.append("Authorization", user.Authorization);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/account/api/v1/get", requestOptions)
            .then(response => response.text())
            .then(result => {
                let user = JSON.parse(result)
                user.avatar = http_url.slice(0, (http_url.length - 1)) + user.avatar
                this.setState({ ...user })
                console.log(this.state)
            })
            .catch(error => console.log('error', error));
    }

    render() {
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
                    <Typography component="h1" variant="h2" sx={{ fontSize: 35, color: 'black', fontWeight: "bold" }}>
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
                        <Avatar alt={this.state.first_name} src={this.state.avatar} sx={{ width: 120, height: 120 }} />

                        {/* <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span" className={classes.button} sx={{ ml: 4, mt: 4, borderRadius: 30, bgcolor: "darkgray", ":hover": { bgcolor: "gray" }, width: 100, height: 50 }}>
                            Change
                            </Button>
                        </label> */}
                    </Stack>
                </Container>
                <Box component="form" noValidate sx={{ mt: 1 }} >
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
                                value={this.state.first_name}
                                onChange={this.setefirst}
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
                                value={this.state.last_name}
                                // helperText="Incorrect entry."
                                onChange={this.setlast}
                            // value={this.state.email}
                            />
                        </Grid>
                    </Grid>
                    <Button onClick={this.submitForm} className={classes.button} sx={{ borderRadius: 30, color: "white", bgcolor: "red", ":hover": { bgcolor: "darkred" }, width: 1, height: 50 }}>
                        Submit
                    </Button>
                    {/* <TextField
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
                    /> */}

                </Box>
            </Box>


        </div>
    }




}
export default withStyles(styles)(PublicProfile);