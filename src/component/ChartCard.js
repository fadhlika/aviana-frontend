import React from 'react';
import Card from 'material-ui/Card';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Line} from 'react-chartjs-2';

const styles = theme => ({
    card: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 0,
      marginBottom: 5,
      width: '100%',
      height: '250px',
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
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                      padding: {
                          left: 10,
                          right: 10,
                          top: 10,
                          bottom: 0
                      }
                    },
                    elements: {
                      line: {
                          tension: 0, // disables bezier curves
                      }
                    },
                    scales:
                    {
                      yAxes: [
                        {
                          gridLines: {
                            display: true,
                          },
                        }
                      ],
                      xAxes: [{
                        type: 'time',
                        autoSkip: false,
                        distribution: 'series',
                        time: {
                            unit: 'minute',
                            unitStepSize: 20
                        },
                        displayFormats: {
                          quarter: 'h:mm a'
                        },
                        scaleLabel: {
                          display: true
                        },
                        gridLines: {
                          display: true,
                        },
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