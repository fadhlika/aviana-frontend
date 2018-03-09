import React from 'react';
import Card from 'material-ui/Card';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Line} from 'react-chartjs-2';

const styles = theme => ({
    card: {
      margin: 10,
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
      color: theme.palette.text.secondary,
    },
    pos: {
      marginBottom: 12,
      color: theme.palette.text.secondary,
    },
  });

class ChartCard extends React.Component {
    render() {
        const {classes, data} = this.props;

        return (
            <Card className={classes.card}>
                <Line options={
                  {
                    layout: {
                      padding: {
                          left: 0,
                          right: 10,
                          top: 0,
                          bottom: 10
                      }
                    },
                    scales:
                    {
                      xAxes: [{
                        type: 'time',
                        ticks: {
                          source: 'data'
                        },
                        display: false,
                        bounds : 'data',
                        distribution: 'series'
                      }]
                    }
                  }
                } 
                data={data} />
            </Card>
        );
    }
}

ChartCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ChartCard);