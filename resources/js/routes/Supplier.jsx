import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import { withStyles } from '@material-ui/styles'
import { DatePicker } from '@material-ui/pickers'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import BackIcon from '@material-ui/icons/ArrowBack'

import AdapterLink from '../components/AdapterLink'
import PriceField from '../components/PriceField'
import ResponsiveContainer from '../components/ResponsiveContainer'

class Supplier extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      products: null,

      productId: -1,
      quantity: '0',
      lotNumber: '',
      expirationDate: moment().startOf('day'),
    }

    // Bind this for non-react methods
    ;[
      'handleChange',
      'handleDateChange',
      'handleSubmit',
      'renderProductSelect',
      'renderQuantityField',
      'renderLotField',
      'renderExpirationDatePicker',
      'renderPriceField',
    ].forEach(func => {
      this[func] = this[func].bind(this)
    })
  }

  async componentDidMount() {
    const response = await axios.get('/api/products')
    const products = response.data.data
    const productId = products[0] ? products[0].id : -1

    this.setState({products, productId})
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    });
  }

  handleDateChange(date) {
    this.setState({expirationDate: date})
  }

  async handleSubmit() {
    const { state } = this

    // TODO: handle submit
  }

  renderProducts(products) {
    if (products) {
      return products.map((prod, key) =>
        <MenuItem key={key} value={prod.id}>{prod.name}</MenuItem>
      )
    }
    return <MenuItem value={-1}>Cargando…</MenuItem>
  }

  renderProductSelect() {
    const { props, state } = this
    const { classes } = props

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="product">Product</InputLabel>
        <Select
          value={state.productId}
          onChange={this.handleChange}
          inputProps={{
            name: 'productId',
            id: 'product',
          }}
        >
          {this.renderProducts(state.products)}
        </Select>
      </FormControl>
    )
  }

  renderQuantityField() {
    const { props, state } = this
    const { classes } = props

    return (
      <FormControl className={classes.formControl}>
        <TextField
          id='quantity'
          name='quantity'
          label='Quantity'
          value={state.quantity}
          onChange={this.handleChange}
          type='number'
          margin="normal"
        />
      </FormControl>
    )
  }

  renderLotField() {
    const { props, state } = this
    const { classes } = props

    return (
      <FormControl className={classes.formControl}>
        <TextField
          id='lot-number'
          name='lotNumber'
          label='Lot Number'
          value={state.lotNumber}
          onChange={this.handleChange}
          margin="normal"
        />
      </FormControl>
    )
  }

  renderExpirationDatePicker() {
    const { props, state } = this
    const { classes } = props

    return (
      <DatePicker
        value={state.expirationDate}
        onChange={this.handleDateChange}
        className={classes.formControl}
        label='Expiration Date'
        fullWidth
        format='DD/MMM/YYYY'
        margin='normal'
      />
    )
  }

  renderPriceField() {
    const { props, state } = this
    const { classes } = props

    return (
      <PriceField
        label='Valor Unitario'
        value={state.unitPrice}
        onChange={this.handleChange}
        TextFieldProps={{
          id: 'unit-price',
          name: 'unitPrice',
        }}
      />
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
              to='/'
            >
              <BackIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' className={classes.title}>
              Add to Inventory
            </Typography>
          </Toolbar>
        </AppBar>
        <ResponsiveContainer>
          <Paper className={classes.paper}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                {this.renderProductSelect()}
              </Grid>
              <Grid item xs={6}>
                {this.renderQuantityField()}
              </Grid>
              <Grid item xs={6}>
                {this.renderLotField()}
              </Grid>
              <Grid item xs={6}>
                {this.renderExpirationDatePicker()}
              </Grid>
              <Grid item xs={6}>
                {this.renderPriceField()}
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={this.handleSubmit}
                  color='primary'
                  variant='contained'
                  fullWidth
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Paper>
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
  paper: {
    marginTop: 16,
    marginBotton: 16,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 32,
    paddingRight: 32,
  },
  formControl: {
    width: '100%',
  },
})

export default withStyles(styles)(Supplier)
