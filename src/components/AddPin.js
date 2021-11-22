import React, { useState } from 'react'
import './AddPin.css'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import Container from '@mui/material/Container';
function upload_img(
    event,
    pinDetails,
    setPinDetails,
    setShowLabel,
    setShowModalPin
) {
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)) {
            const reader = new FileReader();

            reader.onload = function () {
                setPinDetails({
                    ...pinDetails,
                    img_blob: reader.result
                });
                setShowLabel(false);
                setShowModalPin(true);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }
}
function check_size(event) {
    const image = event.target;
    image.classList.add('pin_max_height');
    if (
        image.getBoundingClientRect().width < image.parentElement.getBoundingClientRect().width ||
        image.getBoundingClientRect().height < image.parentElement.getBoundingClientRect().hieght
    ) {
        image.classList.remove("pin_max_height");
        image.classList.add('pin_max_width');

    }
    image.style.opacity = 1;
}
function save_pin(pinDetails,add_pin) {
    const users_data = {
        ...pinDetails,
        author: "jack",
        board: "default",
        title: document.querySelector("#pin_title").value,
        description: document.querySelector("#pin_description").value,
        destination: document.querySelector("#pin_destination").value,
        pin_size: document.querySelector("#pin_size").value,
    };
    add_pin(users_data);
}

function AddPin(props) {
    const [pinDetails, setPinDetails] = useState({
        author: "",
        board: "",
        title: "",
        description: "",
        destination: "",
        img_blob: "",
        pin_size: ""
    })
    const [showLabel, setShowLabel] = useState(true);
    const [showModalPin, setShowModalPin] = useState(false);


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
                                        <ArrowCircleUpTwoToneIcon className="pint_mock_icon"    />
                                    </div>
                                    <div>Click to upload</div>
                                    <div>
                                        Recommendation: Use high-quality .jpg less than 20MB
                                    </div>
                                </div>
                            </div>
                            <input onChange={event => upload_img(event, pinDetails, setPinDetails, setShowLabel, setShowModalPin)} type="file" name="upload_img" id="upload_img" value="" />
                        </label>
                        <div className="modals_pin" style={{
                            display: showModalPin ? 'block' : 'none'
                        }}>
                            <div className="pin_image">
                                <img onLoad={check_size} src={pinDetails.img_blob} alt="pin_image" />
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
                            <select defaultValue="Select" name="pin_size" id="pin_size">
                                <option value="">Select</option>
                                <option value="small">small</option>
                                <option value="medium">medium</option>
                                <option value="large">large</option>
                            </select>
                            <div onClick={() => save_pin(pinDetails,props.add_pin)} className="save_pin">Save</div>
                        </div>
                    </div>
                    <div className="setction2">
                        <input placeholder="Add your title" type="text" className="new_pin_input" id="pin_title" />
                        <input
                            placeholder="Tell everyone what your Pin is about"
                            type="text"
                            className="new_pin_input"
                            id="pin_description"
                        />
                        <input
                            placeholder="Add a destination link"
                            type="text"
                            className="new_pin_input"
                            id="pin_destination"
                        />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default AddPin
