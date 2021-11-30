import React, { Component } from 'react'
import { Box, Container, Typography, Grid, Button, Divider, List, ListItem, Icon } from "@mui/material";
import Pin from './Pin';

export default class BoardView extends Component {
    constructor(props) {
        
        super(props);
        let item = this.props.board.filter(board => board.id == this.props.match.params.id)[0]
        this.state = {
            board:item
        }
    }
 

    refresh=(props)=>{
        console.log(this.state.board.pins.length)
        // console.log(this.props.location.history)
        // this.state.pin.push(...this.props.pins)
        // this.setState({pin:this.state.pin})
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
                            {this.state.board.pins.length} Pins
                        </Typography>
                        <Divider variant="middle" sx={{ margin: 3 }} />
                    </Container>
                    <Container>
                        {this.state.board.pins.map(pin=>(
                            <Pin discUrl={pin.img} urls={pin.img} savePin={this.savePin}/>
                        ))}
                    </Container>

                </Box>
            </Container>
        </div>


    }
}