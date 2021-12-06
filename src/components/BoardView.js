import React, { Component } from 'react'
import { Box, Container, Typography, Grid, Button, Divider, List, ListItem, Icon } from "@mui/material";
import Pin from './Pin';

const http_url = "http://localhost:8000/";

export default class BoardView extends Component {
    
    constructor() {
        
        super();
        // let item = this.props.board.filter(board => board.id == this.props.match.params.id)[0]
        this.state = {
            board:[]
        }
        
    }
 

    // refresh=(props)=>{
    //     console.log(this.state.board.pins.length)
    //     // console.log(this.props.location.history)
    //     // this.state.pin.push(...this.props.pins)
    //     // this.setState({pin:this.state.pin})
    // }
    componentDidMount = ()=>{
        console.log(this.props.match.params.id)
        let user = JSON.parse(localStorage.getItem("user"))
        
            var myHeaders = new Headers();
            myHeaders.append("Authorization", user.Authorization);
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
        
            fetch((http_url+"pinterest_app/api/v1/crud/board/"+this.props.match.params.id), requestOptions)
              .then(response => response.text())
              .then(result => {
                  let boards = JSON.parse(result)
                  console.log(result)
                  boards.pin.forEach(element => {
                        element.url = http_url.slice(0,(http_url.length-1))+element.url
                      });
               
                  this.setState({...this.state, board:boards })
                  console.log(this.state)
                  
              })
              .catch(error => console.log('error', error));
    }

        
    
    
 savePin =(item)=>{
     console.log(item)
     this.state.pin.push(item)
     this.setState({pin:this.state.pin})
     let x=this.props.onadd
     console.log (x)

  }
  
    render() {
        return <div>
            <Container component="main" maxWidth="ms" >

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 5,
                        bgcolor: 'white',
                    }}
                >



                    <Typography component="h1" variant="h5" sx={{ fontSize: 35, color: 'black', fontWeight: "bold" }}>
                        {this.state.board.title}
                    </Typography>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: 30, bgcolor: "gray", ":hover": { bgcolor: "darkgray" }, width: 200 }}
                        onClick={this.refresh}
                    // type="submit" 
                    >
                        Edit Board
                    </Button>

                    <Container>
                        <Typography component="h1" variant="h5" sx={{ fontSize: 20, color: 'black' }}>
                            {this.state.board.pin?.length} Pins
                        </Typography>
                        <Divider variant="middle" sx={{ margin: 3 }} />
                    </Container>
                    <Container>
                        {this.state.board.pin?.map(pin=>(
                            <Pin discUrl={pin.url} urls={pin.url} savePin={this.savePin}/>
                        ))}
                    </Container>

                </Box>
            </Container>
        </div>


    }
}