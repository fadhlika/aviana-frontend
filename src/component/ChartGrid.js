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
        datasets: [
            {
                label: item,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data.map((d, i) => {return {x: d["date"], y: d[item]} })
            }
        ]
    });
  });
  arraydata.splice(0, 1);

  return (
      <Grid container className={classes.root}>
            {arraydata.map((item, i) => {
                console.log(item);
                return <Grid item xs><ChartCard key={i} data={item}/></Grid>
            })}
      </Grid>
  );
}

ChartGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartGrid);