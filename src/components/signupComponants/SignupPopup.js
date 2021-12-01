import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import SignupAfterLogin from './SignupAfterLogin';
import axios from "axios";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    borderRadius: 12,
    boxShadow: 24,
    p: 4,
};

export default class SignupPopup extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
        
    }
    handleClose = () => {
        this.setState({ open: false });

    }
    componentDidMount=()=> {
        const http_url = "http://localhost:8000/"
        let user = JSON.parse(localStorage.getItem("user"))
        console.log(user)
        axios({
            method: 'GET',
            url: (http_url+"account/api/v1/home"),
            headers: {'Authorization':user.Authorization},
          }).then((res) =>
            {
              if(res.data.message == "none"){
                this.handleOpen()
              }
            })
            .catch((err) => console.log(err));
            
        
        

    }
    render() {
        return <div>

            {/* <Button onClick={this.handleOpen}>Open modal</Button> */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={this.state.open}
                // onClose={this.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={this.state.open}>
                    <Box sx={style}>
                        <SignupAfterLogin getimage={this.props.getimage} gender={this.props.gender} handleClose={this.handleClose}/>
                    </Box>
                </Fade>
            </Modal>
        </div>


    }
}

