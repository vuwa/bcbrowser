import * as api from "./api"

describe("App", () => {
  test("get latest block hash", async () => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve({})
    })
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetch)

    await api.getLatestBlockHash()

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      "https://blockchain.info/latestblock?cors=true"
    )
    global.fetch.mockClear()
  })

  test("fetch latest block", async () => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve({})
    })
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetch)

    await api.fetchBlock()

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      "https://blockchain.info/latestblock?cors=true"
    )
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      "https://blockchain.info/rawblock/undefined?cors=true"
    )
    global.fetch.mockClear()
  })

  test("fetch block by hash", async () => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve({})
    })
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetch)
    const blockHash = "mock_hash"

    await api.fetchBlock(blockHash)

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      `https://blockchain.info/rawblock/${blockHash}?cors=true`
    )
    global.fetch.mockClear()
  })
})
