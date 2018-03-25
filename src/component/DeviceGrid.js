import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import DeviceCard from './DeviceCard';
import Topbar from './Topbar';

const styles = theme => ({
  content: {
    height: '100%',
    width: '100%',
    marginTop: 64,
    backgroundColor: theme.palette.background.default,
  },
});

function DeviceGrid(props) {
  const { classes, devices, handleViewData } = props;
  
  return (
    <div>
        <Topbar />
        <main className={classes.content}>
            {devices.map((item, i) => {
                return <DeviceCard key={i} device={item} handleViewData={handleViewData}/>
            })}
            <DeviceCard NewDevice handleViewData={handleViewData}/>
        </main>
    </div>
  );
}

DeviceGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceGrid);