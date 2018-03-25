import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import ChartCard from './ChartCard';
import Sockette from 'sockette';
import Topbar from './Topbar';

const styles = theme => ({
    root: {
        padding: 10
    },
    content: {
        height: '100%',
        width: '100%',
        marginTop: 64,
        backgroundColor: theme.palette.background.default,
    },
});

class ChartGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: [],
            data: [],
            arraydata: []
        }
    }

    getData = (name) => {
        fetch('https://api.aviana.fadhlika.com/data/' + name + '/1440')
            .then(response => {
                //console.log(response);
                return response.json()
            })
            .then(responsejson => {
                if (responsejson == null) {
                    this.setState({ data: [], keys: [] })
                    return;
                }
                let keys = Object.keys(responsejson[0])
                let fields = ["_id", "device_id", "device_name", "type", "date"]
                for (var field in fields) {
                    let index = keys.indexOf(fields[field])
                    keys.splice(index, 1)
                }
                keys.unshift("date");
                for (var r in responsejson) {
                    delete responsejson[r]._id;
                    delete responsejson[r].device_id;
                    delete responsejson[r].device_name;
                    delete responsejson[r].type;
                }
                this.setState({ data: responsejson, keys: keys }, this.prepareData);
            });
    }

    prepareData = () => {
        var arraydata = this.state.keys.map(item => {
            if (item === "date") return null;
            return ({
                //labels:  data.map((d) => {return d["date"];}),
                datasets: [
                    {
                        label: item,
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 0,
                        borderWidth: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 10,
                        data: this.state.data.map((d, i) => {
                            //console.log(d, i);
                            return { x: new Date(d["date"]), y: d[item] };
                        })
                    }
                ]
            });
        });
        arraydata.splice(0, 1);
        this.setState({ arraydata: arraydata })
    }

    componentWillMount() {
        const { match } = this.props;
        this.getData(match.params.id);
        this.ws = new Sockette('wss://api.aviana.fadhlika.com/websocket', {
            timeout: 5e3,
            maxAttempts: 10,
            onopen: e => { console.log('websocket open' + e) },
            onclose: e => { console.log('websocket close' + e) },
            onmessage: e => {
                let newdata = [JSON.parse(e.data)]
                this.setState({ data: newdata.concat(this.state.data) }, this.prepareData);
            },
            onerror: e => { console.log('websocket error ' + e) }
        })
    }

    render() {
        const { classes } = this.props;
        const { arraydata } = this.state;
        return (
            <div className={classes.root}>
                <Topbar />
                <main className={classes.content}>
                    <Grid container className={classes.root}>
                        {arraydata.map((item, i) => {
                            return <ChartCard key={i} data={item} />
                        })}
                    </Grid>
                </main>
            </div>
        );
    }
}

ChartGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartGrid);