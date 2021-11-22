import React from 'react'
import styled from 'styled-components'
import './Pin.css'
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

function Pin(props) {
    let { urls } = props
    return (
        <Wrapper>
            <Container>

                <div className="card">
                    {/* <div className="pin_title">{props.pinDetails.title}</div> */}
                    <div className="pin_modal">
                        <div className="modal_head">
                            <Button variant="contained" className="save_card" size="small">Save</Button>
                        </div>
                        <div className="modal_foot">
                            <div className="destination">
                                <div className="pint_mock_icon_container">
                                    <ArrowUpwardIcon className="Arrowup" />
                                </div>
                                <span>{"www.twitter.com".slice(0,11)}</span>
                            </div>
                            <div className="pint_mock_icon_container">
                                <FileUploadOutlinedIcon />
                            </div>
                            <div className="pint_mock_icon_container">
                                <MoreHorizRoundedIcon  />
                            </div>
                        </div>
                    </div>
                    <div className="pin_image">
                        <img src={urls?.regular} alt="pin" />
                    </div>
                </div>
            </Container>
        </Wrapper>
    )
}

export default Pin
const Wrapper = styled.div`
    display:inline-flex;
    padding:8px;
`

const Container = styled.div`
    display:flex;
    align-items:center;
    box-sizing:border-box;
    cursor:pointer;
    width:236px;

    img{
        display:flex;
        width:100%;
        cursor:zoom-in;
        border-radius:16px;
        object-fit:cover;

    }
`