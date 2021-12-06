import React from 'react'
import './Details.css'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import IconButton from "@mui/material/IconButton";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Button from '@mui/material/Button';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FaceIcon from "@mui/icons-material/Face";
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom'


    

const Details = props =>{
    let id = props.location.pathname.slice(7)
    // console.log(props)
    return (
        <div className="details">
            <div className="top_details">
                <IconButton>
                    <Link to="/home"><KeyboardBackspaceSharpIcon /></Link>
                </IconButton>
            </div>
            <div className="middle_details">
                <div className="middle_details_left">
                    <img src={id} alt="" />
                </div>
                <div className="middle_details_right">
                    <div className="icons">
                        <div className="left-icons">
                            <IconButton>
                                <MoreHorizRoundedIcon />
                            </IconButton>
                            <IconButton>
                                <FileUploadOutlinedIcon />
                            </IconButton>
                        </div>
                        <div className="right-icons">
                            <span>Profile</span>
                            <IconButton>
                                <KeyboardArrowDownIcon />
                            </IconButton>
                            <Button variant="contained" color="error" size="small" className="save-button">Save</Button>
                        </div>
                    </div>
                    <div className="info">
                        <p>Uploaded by Christian Biegler <a className="info_link" href="#"> Christian Biegler</a></p>
                        <div className='comments'>
                            <p>Comments </p><IconButton> <KeyboardArrowDownIcon /></IconButton>
                        </div>
                        <div className="comment-drop">
                        <small className="small-text">send your feedback please</small>
                        {/* <FaceIcon /> */}
                        <IconButton><FaceIcon /></IconButton>
                        <input type="text" placeholder="add a comman" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom_details">
                <p>More like this</p>
            </div>
        </div>
    )
}

export default Details
