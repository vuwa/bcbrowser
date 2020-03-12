import React, { useState } from "react"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import About from "./About"
import BlockData from "./BlockData"
import NavBar from "./NavBar"
import TxList from "./TxList"
import TxData from "./TxData"
import * as api from "../api.js"

const useStyles = makeStyles({
  root: {
    textAlign: "center"
  }
})

const App = () => {
  const ABOUT_VIEW = "About"
  const BLOCK_VIEW = "Block"
  const TX_LIST_VIEW = "Transaction List"
  const TX_DATA_VIEW = "Transaction Data"

  const [isLoading, setIsLoading] = useState(true)
  const [blocks, setBlocks] = useState({})
  const [currentBlockHash, setCurrentBlockHash] = useState(null)
  const [currentTx, setCurrentTx] = useState(null)
  const [view, setView] = useState(ABOUT_VIEW)

  async function getBlock(blockHash, previousBlockHash) {
    if (blocks[blockHash]) {
      const block = { ...blocks[blockHash].block }
      setCurrentBlockHash(block.hash)
    } else {
      setIsLoading(true)
      const block = await api.fetchBlock(blockHash || null)
      setIsLoading(false)
      setBlocks({
        ...blocks,
        [block.hash]: { next: previousBlockHash || null, block }
      })
      setCurrentBlockHash(block.hash)
    }
  }

  async function onPrevBlockHandler() {
    const hash = currentBlockHash
      ? blocks[currentBlockHash].block.prev_block
      : undefined
    await getBlock(hash, currentBlockHash)
  }

  async function onNextBlockHandler() {
    const hash = currentBlockHash ? blocks[currentBlockHash].next : undefined
    await getBlock(hash)
  }

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <NavBar title={view} />
      <Container maxWidth="md">
        {view === ABOUT_VIEW && (
          <About
            isLoading={isLoading}
            onViewBlock={() => {
              setView(BLOCK_VIEW)
            }}
          />
        )}
        {view === BLOCK_VIEW && (
          <BlockData
            isLoading={isLoading}
            data={currentBlockHash ? blocks[currentBlockHash].block : null}
            onPrev={onPrevBlockHandler}
            onNext={onNextBlockHandler}
            onLatest={() => getBlock()}
            onViewTxList={() => setView(TX_LIST_VIEW)}
          />
        )}
        {view === TX_LIST_VIEW && (
          <TxList
            data={blocks[currentBlockHash].block.tx.map(tx => tx.hash)}
            onViewBlock={() => {
              setView(BLOCK_VIEW)
            }}
            onViewTxData={txHash => {
              setCurrentTx(txHash)
              setView(TX_DATA_VIEW)
            }}
          />
        )}
        {view === TX_DATA_VIEW && (
          <TxData
            data={blocks[currentBlockHash].block.tx.find(
              tx => tx.hash === currentTx
            )}
            onViewTxList={() => {
              setView(TX_LIST_VIEW)
            }}
          />
        )}
      </Container>
    </div>
  )
}

export default App
