import React from 'react'
import axios from 'axios'
import moment from 'moment'

import { withStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import BackIcon from '@material-ui/icons/ArrowBack'

import AdapterLink from '../components/AdapterLink'
import Alert from '../components/Alert'
import ResponsiveContainer from '../components/ResponsiveContainer'
import { money } from '../utils'


class Orders extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      orders: null,

      success: false,
      error: false,
    }

    // Bind this for non-react methods
    ;[
      'handleUndo',
      'renderOrder',
      'updateOrders',
    ].forEach(func => {
      this[func] = this[func].bind(this)
    })
  }

  async updateOrders() {
    const response = await axios.get('/api/orders')
    const orders = response.data.data

    this.setState({orders})
  }

  async componentDidMount() {
    this.updateOrders()
  }

  async handleUndo(order) {
    const bundleChange = {
      quantity: Number(order.bundle.quantity) + Number(order.quantity)
    }

    let errorFlag = false
    let res = null, res2 = null
    try {
      // Update the quantity of the bundle
      res = await axios.patch('/api/productbundles/' + order.bundle.id, bundleChange)

      // Delete the order
      res2 = await axios.delete('/api/orders/' + order.id)
    } catch (e) {
      errorFlag = true
    }

    if (!errorFlag && res.data && res.data.data && res2.data) {
      this.setState({success: true})
      this.updateOrders()
    } else {
      this.setState({error: true})
      console.error({res, res2})
      return
    }
  }

  renderOrder(order, key) {
    const { classes } = this.props

    const bull = <span className={classes.bullet}>•</span>

    return (
      <Card key={key} className={classes.card}>
        <CardContent>
          <Typography variant='h5'>
            Ordered {order.bundle.product.name}
          </Typography>
          <Typography variant='body2'>
            Quantity: {order.quantity}
          </Typography>
          <Typography variant='body2'>
            Ordered on: {moment(order.created_at.date).format('DD/MMM/YYYY')}
          </Typography>
          <Typography variant='body2' gutterBottom>
            Unit price: {money(order.bundle.unit_price)}
          </Typography>
          <Typography variant='body2'>
            Total amount: {money(order.bundle.unit_price * order.quantity)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => this.handleUndo(order)}
          >
            Undo
          </Button>
        </CardActions>
      </Card>
    )
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
