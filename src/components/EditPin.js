import React, { useState } from 'react'
import './AddPin.css'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import Container from '@mui/material/Container';
import Board from './DropMenuBoard';

const EditPin = (props) => {
    console.log(props.pins)
    let item = props.pins.filter(pin => pin.id == props.match.params.id)[0]
    console.log(item.board)
    const [pinDetails, setPinDetails] = useState({
        // board: item.board[0].title,
        img:item.img,
        id: item.id,
        name: item.name,
        discUrl: item.discUrl,
        board: item.board[0].title,
        tags: [],
        description: item.description,
        userId:props.userId,
    })
    console.log(pinDetails)
    const [showLabel, setShowLabel] = useState(false);
    const [showModalPin, setShowModalPin] = useState(true);

    

    const update = () => {

        props.editPin(pinDetails)
        

    }
    
    // console.log(item[0].id)
    // console.log(item[0].img)
    // console.log(props.match.params.id)

    return (
        <div className="container">
            <div className="add_pin_modal">
                <div className="add_pin_container">
                    <div className="side" id="left_side">
                        <div className="setction1">
                            <div className="pint_mock_icon_container">
                                <MoreHorizRoundedIcon className="pint_mock_icon" />
                            </div>
                        </div>
                        <div className="setction2">
                            <label htmlFor="upload_img" id="upload_img_label" style={{
                                display: showLabel ? 'block' : 'none'
                            }}>
                                <div className="upload_img_container">
                                    <div className="dotted_border">
                                        <div className="pint_mock_icon_container">
                                            <ArrowCircleUpTwoToneIcon className="pint_mock_icon" />
                                        </div>
                                        <div>Click to upload</div>
                                        <div>
                                            Recommendation: Use high-quality .jpg less than 20MB
                                        </div>
                                    </div>
                                </div>
                                <input type="file" name="upload_img" id="upload_img" value="" />
                            </label>
                            <div className="modals_pin" style={{
                                display: showModalPin ? 'block' : 'none'
                            }}>
                                <div className="pin_image">
                                    <img src={pinDetails.img} alt="pin_image" />
                                </div>
                            </div>
                        </div>
                        <div className="setction3">
                            <div className="save_from_site">Save from site</div>
                        </div>
                    </div>
                    <div className="side" id="right_side">
                        <div className="setction1">
                            <div className="select_size">
                                <select defaultValue={pinDetails.board} onChange={(e)=>{setPinDetails({...pinDetails,board:e.target.value})}} name="pin_size" id="pin_size">
                                    <option value="">Select</option>
                                    {props.board.map((board, index) => (
                                        <option key={index} value={board.title}>{board.title}</option>
                                    ))}
                                    {/* <option value="medium">medium</option>
                                <option value="large">large</option> */}
                                </select>
                                {/* <div onClick={() => console.log(props.boards[0].title)} className="save_pin">cons</div> */}
                                <div onClick={update} className="save_pin">Update</div>
                            </div>
                        </div>
                        <div className="setction2">
                            <input placeholder="Add your title" type="text" className="new_pin_input" id="pin_title"
                                onChange={(e)=>{setPinDetails({...pinDetails,name:e.target.value})}}
                                value={pinDetails.name} />
                            <input
                                placeholder="Tell everyone what your Pin is about"
                                type="text"
                                className="new_pin_input"
                                id="pin_description"
                                onChange={(e)=>{setPinDetails({...pinDetails,description:e.target.value})}}
                                value={pinDetails.description}
                            />
                            <input
                                placeholder="Add a destination link"
                                type="text"
                                className="new_pin_input"
                                id="pin_destination"
                                onChange={(e)=>{setPinDetails({...pinDetails,discUrl:e.target.value})}}
                                value={pinDetails.discUrl}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditPin
