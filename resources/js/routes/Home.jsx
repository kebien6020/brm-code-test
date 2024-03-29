import React from 'react'

import { withStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import ResponsiveContainer from '../components/ResponsiveContainer'

import AdapterLink from '../components/AdapterLink'

class Home extends React.Component {
  render() {
    const { props } = this
    const { classes } = props

    return (
      <ResponsiveContainer>
        <Paper className={classes.paper}>
          <Grid container style={{height: '100%'}}>
            <Grid item xs={12}>
              <Typography variant='h2' className={classes.title}>
                I am a…
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.buttonContainer}>
              <Button
                component={AdapterLink}
                to='/supplier'
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Supplier
              </Button>
            </Grid>
            <Grid item xs={6} className={classes.buttonContainer}>
              <Button
                component={AdapterLink}
                to='/customer'
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Customer
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
    height: '80%',
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

export default withStyles(styles)(Home)
