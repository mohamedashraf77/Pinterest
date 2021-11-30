import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import styled from 'styled-components'
import { withStyles } from "@mui/styles";
import TextField from '@mui/material/TextField';
import Blank from './images/blank.jpg'




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



class Popup extends React.Component {
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

    addBoard = () => {
        let board = {
            id: "5",
            title: this.state.text,
            pins: [{
                id: "",
                img: "https://image.shutterstock.com/z/stock-photo-business-accelerator-program-providing-a-launch-pad-for-companies-d-illustration-render-539542939.jpg",
                cols: 2,
                rows: 2
            },
            {
                id: "",
                img: "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-shaving-effect-657743737.jpg",
            },
            {
                id: "",
                img: "https://image.shutterstock.com/z/stock-photo-race-horses-with-jockeys-on-the-home-straight-199485986.jpg",
            }],
            pin: 5,
            time: "2w"
        }
        // alert(this.state.text)
        this.props.addBoardfromPopup(board)
        this.handleClose()
    }
    setText = (e) => {
        this.setState({ text: e.target.value })

    }


    render() {
        const { classes } = this.props;
        return <div>

            <IconWrapper >
                <IconButton>
                    <AddIcon onClick={this.handleOpen} sx={{ float: "right", cursor: "pointer", fontSize: 40 }} />
                </IconButton>
            </IconWrapper>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={this.state.open}>
                    <Box sx={style}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="text"
                            label="Board Name"
                            type="text"
                            id="text"
                            autoComplete="Board Name"
                            className={classes.textFielStyle}
                            onChange={this.setText}

                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, borderRadius: 30, bgcolor: "red", ":hover": { bgcolor: "darkred" } }}
                            onClick={this.addBoard}
                        >
                            Add Board
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>


    }
}

const IconWrapper = styled.div`
float:right;
`
export default withStyles(styles)(Popup);