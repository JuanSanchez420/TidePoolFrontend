import { useCallback, useContext, useEffect, useRef } from "react"
import { ethers } from "ethers"
import Web3Modal from "web3modal"
import { networks, Ethereum } from "../info/networks";
import { Global } from "../context/GlobalContext"

const providerOptions = {
  injected: {
    display: {
      name: "MetaMask",
      description: "For desktop & mobile web wallets",
    },
    package: null,
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: false,
  providerOptions
});

interface Web3 {
  connect: ()=> void
  switchChains: (chainId: number)=> void
}

const useWeb3Modal = (): Web3 => {
  const firstLoad = useRef(true)
  const { provider, setProvider, network, setNetwork, setAccount } = useContext(Global)

  const switchChains = useCallback(async (chainId: number): Promise<void> => {
    if(await provider.getSigner().getChainId() !== chainId) {
      try {
          await provider.send('wallet_switchEthereumChain', [{chainId:`0x${chainId.toString(16)}`}]);
          window.location.reload()
      } catch (switchError: any) {
        console.log(switchError);
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider.send('wallet_addEthereumChain',[{chainId:`0x${chainId.toString(1)}`}]);
          } catch (e) {
            console.log("switchChains: " + e);
          }
        }
      }
    }
    setNetwork(networks.find(n=>n.chainId === chainId) || network)
  },[provider, network, setNetwork])

  const connect = useCallback(async () => {

    const web3 = await web3Modal.connect()

    web3.on("accountsChanged", async (accounts: string[]) =>setAccount(accounts[0]))
    web3.on("chainChanged", async (chainId: number) => window.location.reload())

    let p = new ethers.providers.Web3Provider(web3);

    const network = await p.getNetwork()
    setNetwork(networks.find(n=>n.chainId === network.chainId) || Ethereum)

    setProvider(p)

    setAccount(await p.getSigner().getAddress())
    
  },[setProvider, setAccount, setNetwork])


  useEffect(()=>{
    const eager = async () => {
        firstLoad.current = false
        connect()
    }
    if(firstLoad.current && provider) eager()
  },[connect, provider])
  
  return { connect, switchChains }

}

export default useWeb3Modal;