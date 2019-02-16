import React from 'react';
import ReactLoading from 'react-loading';


const loader = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent:'center',
  marginTop: '15%'
};

const Loader = ({ type, color }) => (
  <div style={loader}>
    <ReactLoading type={type} color={color} height={'10%'} width={'10%'} />
    <p>Syncing with cloud...</p>
  </div>
);

export default Loader;
