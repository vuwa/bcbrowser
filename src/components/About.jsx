import React from "react"
import PropTypes from "prop-types"
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    margin: "20px 0"
  }
})

const About = ({ onViewBlock }) => {
  const classes = useStyles()

  return (
    <Grid container direction="column" alignItems="center">
      <Card className={classes.root} elevation={10}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Blockchain Browser
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Browse blockchain blocks and transactions
          </Typography>
        </CardContent>
      </Card>
      <Button variant="text" color="primary" onClick={onViewBlock}>
        Start
      </Button>
    </Grid>
  )
}

About.propTypes = {
  onViewBlock: PropTypes.func
}

About.defaultTypes = {
  onViewBlock: () => {}
}

export default About
