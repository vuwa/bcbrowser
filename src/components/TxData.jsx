import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import DataViewer from "./DataViewer"

const useStyles = makeStyles({
  root: {
    fontFamily: "'Roboto Mono', monospace",
    fontSize: "0.85rem",
    margin: "20px 0",
    maxHeight: "60vh",
    overflow: "auto",
    textAlign: "left"
  }
})

const TxData = ({ data, onViewTxList }) => {
  const classes = useStyles()

  return (
    <Container disableGutters>
      <Card className={classes.root} elevation={10}>
        <CardContent>{data && <DataViewer data={data} />}</CardContent>
      </Card>
      <ButtonGroup variant="text" color="primary">
        <Button onClick={onViewTxList}>Back to Tx List</Button>
      </ButtonGroup>
    </Container>
  )
}

TxData.propTypes = {
  data: PropTypes.shape({
    next: PropTypes.string.isRequired,
    block: PropTypes.object.isRequired
  }).isRequired,
  onViewTxList: PropTypes.func
}

TxData.defaultTypes = {
  onViewTxList: () => {}
}

export default TxData
