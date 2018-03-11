import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import ChartCard from './ChartCard';

const styles = theme => ({
    root: {
        flexGrow: 1,
      },
});

function ChartGrid(props) {
  const { classes, data, keys } = props;

  var arraydata = keys.map(item => {
    if(item === "date") return null;
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
                data: data.map((d, i) => {
                    //console.log(d, i);
                    return {x: new Date(d["date"]), y: d[item]}; 
                })
            }
        ]
    });
  });
  arraydata.splice(0, 1);

  return (
      <Grid container className={classes.root}>
            {arraydata.map((item, i) => {
                return <Grid item xs={4} key={i}><ChartCard key={item} data={item}/></Grid>
            })}
      </Grid>
  );
}

ChartGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartGrid);