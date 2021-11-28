import React, { Component } from 'react'
import { Box, Container, Typography, Grid, Button, Divider, List, ListItem, Icon } from "@mui/material";
import Pin from './Pin';

export default class BoardView extends Component {
    constructor() {
        super();
        this.state = {title: "Alex",pin:[]}


    }
    refresh=(props)=>{
        console.log(this.props.pins)
        this.state.pin.push(...this.props.pins)
        this.setState({pin:this.state.pin})
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
                        {this.state.title}
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
                            {this.state.pin.length} Pins
                        </Typography>
                        <Divider variant="middle" sx={{ margin: 3 }} />
                    </Container>
                    <Container>
                        {this.state.pin.map(pin=>(
                            <Pin discUrl={pin.discUrl} urls={pin.img} savePin={this.savePin}/>
                        ))}
                    </Container>

                </Box>
            </Container>
        </div>


    }
}