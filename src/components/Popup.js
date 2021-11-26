import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import styled from 'styled-components'


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

export default class Popup extends React.Component {
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

    //   const [open, setOpen] = React.useState(false);
    //   const handleOpen = () => setOpen(true);
    //   const handleClose = () => setOpen(false);
    render() {
        return <div>

<IconWrapper >
                <IconButton>
                     <AddIcon onClick={this.handleOpen} sx={{float:"right",cursor:"pointer" ,fontSize: 40}}/>
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
                    </Box>
                </Fade>
            </Modal>
        </div>


    }
}

const IconWrapper = styled.div`
float:right;
`