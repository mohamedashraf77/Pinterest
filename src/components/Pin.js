import React from 'react'
import styled from 'styled-components'
import './Pin.css'
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {Link} from 'react-router-dom'

function Pin({urls,discUrl,savePin,deletePin,pinId,onEdit}) {
    let imgurl = discUrl
    // console.log(imgurl.slice(0,11))

    // let { urls } = props
    const addHandler=(urls,discUrl,pinId)=>{
        let image ={
                id:pinId,
                img:urls,
                discUrl: discUrl,
            }
            savePin(image)
    }
    
    
    return (
        <Wrapper>
            <Container>
                <div className="card">
                    {/* <div className="pin_title">{props.pinDetails.title}</div> */}
                    <div className="pin_modal">
                        {/* <div className="modal_head"> */}
                            <Button variant="contained" color='error' onClick={()=>(addHandler(urls,discUrl,pinId))} className="save_card" size="small">Save</Button>
                        {/* </div> */}
                        <div className="modal_foot">
                        <a href={imgurl}>
                            <div className="destination">
                                <div className="pint_mock_icon_container">
                                    <ArrowUpwardIcon className="Arrowup" />
                                </div>
                                <span>{imgurl.slice(0,11)}</span>
                            </div></a>
                            <div className="pint_mock_icon_container">
                                <Link to={`/edit/${pinId}`}> <FileUploadOutlinedIcon onClick={()=>onEdit({pinId})}/></Link>
                            </div>
                            <div className="pint_mock_icon_container">
                                <MoreHorizRoundedIcon onClick={()=>(deletePin(pinId))} />
                            </div>
                        </div>
                        
                        <a href={`/show/:${urls}`} ><div className="over-lay"></div></a>
                    </div>
                    <div className="pin_image">
                        <img src={urls} alt="pin:" />
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