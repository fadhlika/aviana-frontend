import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import blue from 'material-ui/colors/blue';
import App from './component/App';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
    palette: {
      primary: blue
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Reboot/>
        <App />
    </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
