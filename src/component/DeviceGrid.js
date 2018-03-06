import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import DeviceCard from './DeviceCard';

const styles = theme => ({
  
});

function DeviceGrid(props) {
  const { devices, handleViewData } = props;
  
  return (
      <div>
            {devices.map((item, i) => {
                return <DeviceCard key={i} device={item} handleViewData={handleViewData}/>
            })}
            <DeviceCard NewDevice handleViewData={handleViewData}/>
      </div>
  );
}

DeviceGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceGrid);