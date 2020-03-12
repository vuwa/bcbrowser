import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Typography } from "@material-ui/core"
import Toolbar from "@material-ui/core/Toolbar"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}))

const NavBar = ({ title }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired
}

NavBar.defaultProps = {
  title: "Blockchain Browser"
}

export default NavBar
