import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { deepOrange } from "@material-ui/core/colors";

let style = makeStyles((theme) => {
  return {
    navbarFooter: {
      height: "25vh",
      width: "100%",
      backgroundColor: deepOrange[900],
      zIndex: 0,
    },
    navbar: {
      backgroundColor: deepOrange[900],
    },
  };
});

function NavBar() {
  const classes = style();
  return (
    <>
      <AppBar className={classes.navbar} elevation={0} position="relative">
        <Toolbar>
          <Typography variant="h5">Genetic Algorithm</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.navbarFooter}></div>
    </>
  );
}

export default NavBar;
