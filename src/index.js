import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import blue from 'material-ui/colors/blue';
import App from './component/App';
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
    palette: {
      primary: blue
    }
});

ReactDOM.render(
    <Router>
        <MuiThemeProvider theme={theme}>
            <Reboot/>
            <App />
        </MuiThemeProvider>
    </Router>, document.getElementById('root'));
registerServiceWorker();
