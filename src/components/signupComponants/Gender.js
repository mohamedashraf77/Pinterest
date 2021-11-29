import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


export default class Gender extends React.Component {
    constructor(){
        super();
        this.state={
            gander:''
        }
    }

    genderadd=(e)=>{
        
        this.props.genderFromPopup(e.target.value)

    }
    render() {
        return <div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                How do you identify?
            </Typography>
            <FormControl component="fieldset">
                {/* <FormLabel component="legend">Gender</FormLabel> */}
                <RadioGroup
                    aria-label="gender"
                    // defaultValue="female"
                    name="radio-buttons-group"
                    onChange={this.genderadd}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
            </FormControl>
        </div>
    }
}