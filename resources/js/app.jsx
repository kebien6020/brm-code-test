import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

import Home from './routes/Home'
import Supplier from './routes/Supplier'
import Customer from './routes/Customer'

class App extends React.Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <BrowserRouter>
          <MuiThemeProvider theme={createMuiTheme()}>
            <CssBaseline />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/supplier' component={Supplier} />
              <Route exact path='/customer' component={Customer} />
            </Switch>
          </MuiThemeProvider>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    )
  }
}

const styles = (theme) => ({
  "@global": {
    html: {
      fontSize: 12,
      [theme.breakpoints.up("sm")]: {
        fontSize: 16,
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 18,
      },
    }
  }
})

// React entrypoint
const root = document.getElementById('root')
ReactDOM.render(<App />, root)
