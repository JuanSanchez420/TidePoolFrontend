import { useCallback, useState, useContext } from "react"
import { ethers } from "ethers"
import Web3Modal from "web3modal"
import { networks } from "../info/networks";
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
  cacheProvider: true,
  providerOptions
});

interface Web3 {
  connect: ()=> void
  switchChains: (chainId: number)=> void
}

const useWeb3Modal = (): Web3 => {
  const g = useContext(Global)

  const connect = useCallback(async () => {
    const p = new ethers.providers.Web3Provider(await web3Modal.connect());
    await p.send("eth_requestAccounts", []);
    g?.setProvider(p)
    g?.setSigner(p.getSigner())
    
  },[])

  const switchChains = async (chainId: number): Promise<void> => {
    console.log(chainId)
    if(g?.signer) {
      try {
          await g.provider.send('wallet_switchEthereumChain', [{chainId:`0x${chainId.toString(16)}`}]);
      } catch (switchError: any) {
        console.log(switchError);
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await g.provider.send('wallet_addEthereumChain',[{chainId:`0x${chainId.toString(16)}`}]);
          } catch (e) {
            console.log("switchChains: " + e);
          }
        }
      }
    }
    g?.setNetwork(networks.find(n=>n.chainId === chainId) || g?.network)
  }
  
  return { connect, switchChains}

}

export default useWeb3Modal;