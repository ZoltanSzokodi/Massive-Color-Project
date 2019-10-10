const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    height: "64px"
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  navBtns: {}
});

export default styles;