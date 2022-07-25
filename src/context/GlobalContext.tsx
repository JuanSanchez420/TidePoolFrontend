import { ethers } from "ethers";
import { createContext, useState } from "react";
import useTheList from "../hooks/useTheList";
import { Network, Ethereum } from "../info/networks";
import { TheList } from "../info/types";

interface IGlobalContext {
  account: string;
  setAccount: (account: string) => void;
  network: Network;
  setNetwork: (network: Network) => void;
  provider: ethers.providers.JsonRpcProvider;
  setProvider: (provider: ethers.providers.JsonRpcProvider) => void;
  theList: TheList;
}

export const Global = createContext<IGlobalContext>({} as IGlobalContext);

export const GlobalContext: React.FC = ({ children }) => {
  const [network, setNetwork] = useState<Network>(Ethereum);
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>(
    new ethers.providers.JsonRpcProvider(Ethereum.rpc)
  );
  const [account, setAccount] = useState<string>("");
  const theList = useTheList(network);

  return (
    <Global.Provider
      value={{
        account,
        setAccount,
        network,
        setNetwork,
        provider,
        setProvider,
        theList,
      }}
    >
      {children}
    </Global.Provider>
  );
};
