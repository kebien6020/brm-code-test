import React from 'react'
import axios from 'axios'

import { withStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import BackIcon from '@material-ui/icons/ArrowBack'

import AdapterLink from '../components/AdapterLink'
import Alert from '../components/Alert'
import ResponsiveContainer from '../components/ResponsiveContainer'
import { money } from '../utils'

class Buy extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bundles: null,

      selectedBundle: null,
      quantity: 1,

      error: false,
      success: false,
    }

    // Bind this for non-react methods
    ;[
      'handleOpenDialog',
      'handleCloseDialog',
      'handleChange',
      'handleBuy',
      'renderProductBundle',
      'renderBuyDialog',
      'updateBundles',
    ].forEach(func => {
      this[func] = this[func].bind(this)
    })
  }

  async updateBundles() {
    const response = await axios.get('/api/productbundles')
    const bundles = response.data.data

    this.setState({bundles})
  }

  componentDidMount() {
    this.updateBundles()
  }

  handleChange(event) {
    let { name, value } = event.target
    if (name === 'quantity') {
      if (value < 0)
        value = 0
      if (value > this.state.selectedBundle.quantity)
        value = this.state.selectedBundle.quantity
    }
    this.setState({
      [name]: value,
    });
  }

  handleOpenDialog(bund) {
    if (this.state.quantity > bund.quantity) {
      this.setState({quantity: bund.quantity})
    }
    this.setState({selectedBundle: bund})
  }

  handleCloseDialog(bund) {
    this.setState({selectedBundle: null})
  }

  async handleBuy() {
    const { state } = this

    // Gather some info
    const bundle = state.selectedBundle
    const orderQty = state.quantity
    const newQty = Math.max(bundle.quantity - orderQty, 0)
    const changes = {quantity: newQty}

    // Close the dialog
    this.setState({selectedBundle: null})

    let errorFlag = false
    try {
      // Update the bundle
      const res = await axios.patch('/api/productbundles/' + bundle.id, changes)

      // Create a new order
      const res2 = await axios.post('/api/orders', {
        product_bundle_id: bundle.id,
        quantity: orderQty,
      })
    } catch (e) {
      errorFlag = true
    }

    if (!errorFlag && res.data && res.data.data && res2.data && res2.data.data) {
      this.setState({success: true})
      this.updateBundles()
    } else {
      this.setState({error: true})
      console.error(res)
      return
    }
  }

  renderProductBundle(bund, key) {
    const { classes } = this.props

    const bull = <span className={classes.bullet}>•</span>

    return (
      <Card key={key} className={classes.card}>
        <CardContent>
          <Typography variant='h5'>
            {bund.product.name} {bull} {money(bund.unit_price)}
            <small>per unit</small>
          </Typography>
          <Typography color='textSecondary' gutterBottom>
            {bund.quantity} available
          </Typography>
          <Typography variant='body1' gutterBottom>
            {bund.product.description}
          </Typography>
          <Typography variant='body2'>
            Expiration date: {bund.expiration_date}
          </Typography>
          <Typography variant='body2' gutterBottom>
            Lot Number: {bund.lot_number}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => this.handleOpenDialog(bund)}
          >
            Buy
          </Button>
        </CardActions>
      </Card>
    )
  }

  renderBuyDialog() {
    const { props, state } = this
    const { classes } = props

    if (state.selectedBundle === null) return null

    return (
      <Dialog
        open={state.selectedBundle !== null}
        onClose={this.handleCloseDialog}
      >
        <DialogTitle>Buy {state.selectedBundle.product.name}</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <TextField
              id='quantity'
              name='quantity'
              label='Quantity'
              value={state.quantity}
              onChange={this.handleChange}
              type='number'
              margin="normal"
              inputProps={{min: 0, max: state.selectedBundle.quantity}}
            />
          </FormControl>
          <Typography variant='h6' color='inherit' className={classes.totalPrice}>
            Total Price: {money(state.quantity * state.selectedBundle.unit_price)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCloseDialog} color="primary">
            Close
          </Button>
          <Button onClick={this.handleBuy} color="primary" autoFocus>
            Buy
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  render() {
    const { props, state } = this
    const { classes } = props

    return (
      <>
        {this.renderBuyDialog()}
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
              Buy
            </Typography>
          </Toolbar>
        </AppBar>
        <ResponsiveContainer>
          {state.error &&
            <Alert type='error' message='Error when saving' />
          }
          {state.success &&
            <Alert type='success' message='Saved succesfully' />
          }
          {state.bundles ?
            state.bundles.filter(b => b.quantity > 0).map(this.renderProductBundle)
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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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

export default withStyles(styles)(Buy)
