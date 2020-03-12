import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  Card,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  root: {
    fontFamily: "'Roboto Mono', monospace",
    fontSize: "0.85rem",
    margin: "20px 0",
    maxHeight: "60vh",
    "overflow-y": "scroll",
    "overflow-x": "clip",
    textAlign: "left"
  },
  tx: {
    "&:hover": {
      backgroundColor: "lightgray"
    }
  }
})

const TxList = ({ data, onViewBlock, onViewTxData }) => {
  const classes = useStyles()

  return (
    <Container disableGutters>
      <Card className={classes.root} elevation={10}>
        <CardContent>
          <List>
            {data.map(txHash => (
              <ListItem
                key={txHash}
                onClick={() => onViewTxData(txHash)}
                disableGutters={true}
              >
                <ListItemText className={classes.tx} disableTypography>
                  {txHash}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Button variant="text" color="primary" onClick={onViewBlock}>
        Back to Block
      </Button>
    </Container>
  )
}

TxList.propTypes = {
  data: PropTypes.object.isRequired,
  onViewBlock: PropTypes.func,
  onViewTxData: PropTypes.func
}

TxList.defaultTypes = {
  onViewBlock: () => {},
  onViewTxData: () => {}
}

export default TxList
