const drawerWidth = 240;
const navbarHeight = 60;

const styles = theme => ({
  layoutContainerWhenLeftMenuOpen: {
    height: `calc(100vh - ${navbarHeight}px)`,    
    width: `calc(100vw - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
  },
  layoutContainerWhenLeftMenuClose: {
    height: `calc(100vh - ${navbarHeight}px)`,    
    width: '100vw',
    marginLeft: theme.spacing.unit * 7,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      width: '100vw',
      marginLeft: theme.spacing.unit * 9,
    },
  },
});

export default styles;