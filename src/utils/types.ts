export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface Notification {
  type: NotificationType
  message: string
  timestamp: number
  from?: string
  href?: string
}

export interface Token {}

export interface OrbitBridgingContracts {}

export interface OPBridgingContracts {}

// "adminProxy": "0x7004Db7dF5fc785FeC651Fe4AEF16873Af4178ae",
// "bridge": "0x57FFe03e0c189A244a6Bf539D319A1365CD5c0fe",
// "inbox": "0xC1bEE36d337E36D5dA4bdf6890124a97A6A8e03e",
// "l2customGateway": "0x71d59a143f956dCED01671f7b318d3ab350c7e41",
// "l2multicall": "0x73465577E9FD7Cd585E4270F23A9eBa99B92b6eD",
// "l2proxyAdmin": "0x7004Db7dF5fc785FeC651Fe4AEF16873Af4178ae",
// "l2router": "0x1685c06751fbF984e151399f30cd8D3Ad5917d7A",
// "l2standardGateway": "0xf51f6e6aAe0046c088BF9C96b6444AF52fD24a72",
// "l2weth": "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
// "l2wethGateway": "0x7CD6cAc51c75bAf7f65a21603aEe4EB348628b72",
// "l3customGateway": "0xCDcB6aD80187Aa983A7852eE8D7c053506e3622E",
// "l3multicall": "0xecb3dE49E4246E6ED1697B66809Ea26E5d84F891",
// "l3proxyAdmin": "0x6972a208695667DAFd082320D86652FD67dF473d",
// "l3router": "0x50BFdC41541D7FFCfc8E6FE8AF31444E2d25d8e3",
// "l3standardGateway": "0x065D0451E0B8e2186F53F93dCaf96E54e36751Af",
// "l3weth": "0xEBCcc4F7b5356e63556180AD3906b5778A789d08",
// "l3wethGateway": "0xc4Da94526012586d57A99374bEe3ad05048B520A",
// "outbox": "0x34e39661F753B40d84763F1f2F7192b88914d0Bc",
// "rollup": "0xEb5800c8fC4cbF831E0261f836b4a240E135BEA3",
// "sequencerInbox": "0xD9Ffc5CF64D065B0cdF282B0E4fCE82Da84a955a",
// "utils": "0x8A5cAA7719b021F7cf2fE315bCf3e17F876a6AE4"

// export type Deployment =  {
//   name: string
//   type: string
//   contractAddresses:

// }
