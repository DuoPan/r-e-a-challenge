import amber from '@material-ui/core/colors/amber';

/**
 * Set up theme
 */
const color = Object.assign(amber, {
  500: '#F6C61C',
});

export default {
  palette: {
    primary: color,
    text: {
      primary: '#555',
      secondary: '#777',
      light: '#999',
      faded: '#BBB',
      reverse: '#FFF',
    }
  },
  status: {
    danger: '#F44336',
    warning: '#FF6E40',
    success: '#21CE99',
    info: color[500],
  },
  design: {
    highLight: '#CE4A0C',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1), 0 3px 8px rgba(0,0,0,0.16)',
  },
};