import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Gender from './Gender';
import { withStyles } from "@mui/styles";
import CategriesSelection from './CategriesSelection';
import { CountrySelect } from './LanguagesCountry';


const styles = theme => ({
    textFielStyle: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderRadius: 30
        },

        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "red"
        },
        "& label.Mui-focused": {
            color: "red"
        }
    },
    bottmStyle: {
        backgroundColor: "red",
        "&:hover": {
            backgroundColor: "darkred"
        }

    },
    containerStyle: {
        "& .MuiContainer-root": {
            backgroundColor: "gray"
        }
    },
    root :{
        "Mui-activ":{
            color : "red"
        }
            
        
    },
    labelContainer: {
        "& $alternativeLabel": {
          marginTop: 0
        }
      },
      step: {
        "& $completed": {
          color: "red"
        },
        "& $active": {
          color: "red"
        },
        "& $disabled": {
          color: "red"
        }
      },
      alternativeLabel: {},
      active: {}, //needed so that the &$active tag works
      completed: {},
      disabled: {},
      labelContainer: {
        "& $alternativeLabel": {
          marginTop: 0
        }
      },
});

const steps = ['Gender', 'Intersted in'];



const theme = createTheme();

class SignupAfterLogin extends React.Component {
    constructor(){
        super();
        this.state={
            activeStep:0
        }
    }
     getStepContent=(step)=> {
      switch (step) {
        case 0:
          return <Gender />;
        case 1:
          return <CategriesSelection getimage={this.props.getimage} />;
        
        
      }
    }

  handleNext = () => {
    this.setState(prevState => {
        return {activeStep: prevState.activeStep + 1}
     })
  };

   handleBack = () => {
    this.setState(prevState => {
        return {activeStep: prevState.activeStep - 1}
     })
  };

  render(){
    const { classes } = this.props;
      return<div>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          
          <Stepper classes={{
            root: classes.root
          }} activeStep={this.state.activeStep} sx={{ pt: 3, pb: 5 ,}}>
            {steps.map((label) => (
              <Step  classes={{
                root: classes.step,
                completed: classes.completed,
                active: classes.active
              }} key={label}>
                <StepLabel classes={{
            alternativeLabel: classes.alternativeLabel,
            labelContainer: classes.labelContainer
          }}
          StepIconProps={{
            classes: {
              root: classes.step,
              completed: classes.completed,
              active: classes.active,
              disabled: classes.disabled
            }
          }} >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {this.state.activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your Register.
                </Typography>

              </React.Fragment>
            ) : (
              <React.Fragment>
                {this.getStepContent(this.state.activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {this.state.activeStep !== 0 && (
                    <Button onClick={this.handleBack} sx={{ mt: 3, ml: 1 ,color:"red" }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={this.handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    className={classes.bottmStyle}
                  >

                    {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>

      </Container>

      </div>
  }
}
export default withStyles(styles)(SignupAfterLogin);

