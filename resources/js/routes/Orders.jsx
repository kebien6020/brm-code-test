import React from 'react'

import { withStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import BackIcon from '@material-ui/icons/ArrowBack'

import AdapterLink from '../components/AdapterLink'
import ResponsiveContainer from '../components/ResponsiveContainer'
import { money } from '../utils'


class Orders extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      orders: null,
    }
  }

  async componentDidMount() {

  }

  render() {
    const { props, state } = this
    const { classes } = props

    return (
      <>
        <AppBar position='static' className={classes.appbar}>
          <Toolbar>
            <IconButton
              className={classes.backButton}
              color='inherit'
              aria-label='Back'
              component={AdapterLink}
              to='/customer'
            >
              <BackIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' className={classes.title}>
              Orders
            </Typography>
          </Toolbar>
        </AppBar>
        <ResponsiveContainer>
          {state.error &&
            <Alert type='error' message='Error while saving' />
          }
          {state.success &&
            <Alert type='success' message='Saved succesfully' />
          }
          {state.orders ?
            state.orders.map(this.renderOrder)
            :
            <Typography variant='h6'>Cargando…</Typography>
          }
        </ResponsiveContainer>
      </>
    )
  }

}

const styles = theme => ({
  appbar: {
    flexGrow: 1,
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  card: {
    marginTop: 16,
    marginBotton: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  formControl: {
    width: '100%',
  },
})

export default withStyles(styles)(Orders)
