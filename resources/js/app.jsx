import './bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import Home from './routes/Home'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={createMuiTheme()}>
          <CssBaseline />
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
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
