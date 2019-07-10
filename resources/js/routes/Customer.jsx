import React from 'react'

import { withStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import ResponsiveContainer from '../components/ResponsiveContainer'

import AdapterLink from '../components/AdapterLink'

class Customer extends React.Component {
  render() {
    const { props } = this
    const { classes } = props

    return (
      <ResponsiveContainer>
        <Paper className={classes.paper}>
          <Grid container style={{height: '100%'}}>
            <Grid item xs={12}>
              <Typography variant='h2' className={classes.title}>
                I want to…
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.buttonContainer}>
              <Button
                component={AdapterLink}
                to='/customer/buy'
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Buy
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.buttonContainer}>
              <Button variant='contained' color='primary' className={classes.button}>
                See my orders
              </Button>
            </Grid>
            <Grid item xs={12} className={classes.buttonBack}>
              <Button
                component={AdapterLink}
                to='/'
                variant='outlined'
                color='primary'
                className={classes.button}
              >
                Go back
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </ResponsiveContainer>
    )
  }
}

const styles = theme => ({
  paper: {
    height: '30vh',
    width: '100%',
    marginTop: ((100 - 30) / 2.5) + 'vh',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  title: {
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  buttonBack: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
  },
  button: {
    minWidth: '90%',
    [theme.breakpoints.up("sm")]: {
      minWidth: '70%',
    },
    [theme.breakpoints.up("md")]: {
      minWidth: '60%',
    },
    minHeight: '60%',
  },
})

export default withStyles(styles)(Customer)
