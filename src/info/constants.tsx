
export const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
// export const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
export const ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
export const FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984"
export const NONFUNGIBLEPOSITIONMANAGER =
  "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"

export const NFPM_ABI = [
  "function positions(uint256 tokenId) external view override returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)",
  "function balanceOf(address owner) external view returns (uint256 balance)",
]

export const MAX_UINT256 =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935"

export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000"

export const UNISWAP_FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984"
