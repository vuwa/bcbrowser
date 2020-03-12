export async function getLatestBlockHash() {
  try {
    const response = await fetch(
      "https://blockchain.info/latestblock?cors=true"
    )
    const data = await response.json()
    return data.hash
  } catch (e) {
    throw new Error("Error fetching latest block", e)
  }
}

export async function fetchBlock(blockHash) {
  console.log("fetchBlock", blockHash)
  const hash = blockHash || (await getLatestBlockHash())
  try {
    const response = await fetch(
      `https://blockchain.info/rawblock/${hash}?cors=true`
    )
    return await response.json()
  } catch (e) {
    throw new Error("failed to fetch block", e)
  }
}
