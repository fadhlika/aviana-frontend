import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
      margin: 10,
      overflowX: 'auto',
    },
    table: {
      
    },
  });

class DataTable extends Component {
        
    render() {
        const {classes, keys, data} = this.props;

        return (    
            <Paper className={classes.root} elevation={4}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {keys.map((item, i) => {
                                return <TableCell key={i}>{item}</TableCell>  
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    {keys.map((column, i) => {
                                        return <TableCell key={i}>{item[column]}</TableCell>
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(DataTable);
  