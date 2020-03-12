import React, { useEffect } from "react"
import PropTypes from "prop-types"
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CircularProgress,
  Container
} from "@material-ui/core"
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"
import DataViewer from "./DataViewer"

const useStyles = makeStyles({
  root: {
    display: "flex",
    fontFamily: "'Roboto Mono', monospace",
    fontSize: "0.85rem",
    justifyContent: "center",
    minHeight: "60vh",
    margin: "20px 0",
    maxHeight: "60vh",
    overflow: "auto",
    textAlign: "left"
  },
  spinner: {
    marginTop: 100
  }
})

const BlockData = ({
  isLoading,
  data,
  onViewTxList,
  onLatest,
  onPrev,
  onNext
}) => {
  const classes = useStyles()

  useEffect(() => {
    data === null && onLatest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container disableGutters>
      <Card className={classes.root} elevation={10}>
        {isLoading && (
          <CircularProgress size={100} className={classes.spinner} />
        )}
        {!isLoading && (
          <CardContent>{data && <DataViewer data={data} />}</CardContent>
        )}
      </Card>
      <ButtonGroup variant="text" color="primary" disabled={isLoading}>
        <Button>
          <ArrowBackIos onClick={onPrev} />
        </Button>
        <Button onClick={onViewTxList}>Tx List</Button>
        <Button onClick={onLatest}>Latest</Button>
        <Button>
          <ArrowForwardIos onClick={onNext} />
        </Button>
      </ButtonGroup>
    </Container>
  )
}

BlockData.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.object.isRequired,
  onViewTxList: PropTypes.func,
  onLatest: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func
}

BlockData.defaultTypes = {
  isLoading: false,
  onViewTxList: () => {},
  onLatest: () => {},
  onPrev: () => {},
  onNext: () => {}
}

export default BlockData
