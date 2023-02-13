import React, { useEffect, useState } from "react";
import _ from "lodash";
import { ethers } from "ethers";
import {
  Box,
  Typography,
  Divider,
  Container,
  CircularProgress,
} from "@mui/material";

import { UIShell } from "../UIShell";
import { Info } from "../Info";
import { Navigation } from "../Navigation";
import { TokensSoldProgress } from "../TokensSoldProgress";
import { BuyTokens } from "../BuyTokens";

import TOKEN_ABI from "../../abis/Token.json";
import CROWDSALE_ABI from "../../abis/Crowdsale.json";
import { goerli } from "../../networkConfig";

const Home = () => {
  const [provider, setProvider] = useState(null);
  const [crowdsale, setCrowdsale] = useState(null);
  const [account, setAccount] = useState(null);
  const [accountBalance, setAccountBalance] = useState(0);

  const [price, setPrice] = useState(0);
  const [maxTokens, setMaxTokens] = useState(0);
  const [tokensSold, setTokensSold] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    // Initiate contracts
    const token = new ethers.Contract(
      goerli.token.address,
      TOKEN_ABI,
      provider
    );
    const crowdsale = new ethers.Contract(
      goerli.crowdsale.address,
      CROWDSALE_ABI,
      provider
    );
    setCrowdsale(crowdsale);

    // Fetch accounts
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);

    // Fetch acount balance
    const accountBalance = ethers.utils.formatUnits(
      await token.balanceOf(account),
      18
    );
    setAccountBalance(accountBalance);

    // Fetch Price
    const price = ethers.utils.formatUnits(await crowdsale.price(), 18);
    setPrice(price);

    const maxTokens = ethers.utils.formatUnits(await crowdsale.maxTokens(), 18);
    setMaxTokens(_.toNumber(maxTokens));

    const tokensSold = ethers.utils.formatUnits(
      await crowdsale.tokensSold(),
      18
    );
    setTokensSold(tokensSold);

    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      loadBlockchainData();
    }
  }, [isLoading]);

  return (
    <UIShell>
      <Container>
        <Box>
          <Container>
            <Box my={4}>
              <Typography variant="h3" align="center">
                Introducing GIO Token!
              </Typography>
            </Box>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Box display="flex" justifyContent={`center`}>
                  <Typography>
                    <strong>Current Price: </strong>
                    {` ${price} ETH`}
                  </Typography>
                </Box>
                <Box my={4}>
                  <BuyTokens
                    provider={provider}
                    price={price}
                    crowdsale={crowdsale}
                    loadBlockchainData={loadBlockchainData}
                  />
                </Box>
                <TokensSoldProgress
                  tokensSold={tokensSold}
                  maxTokens={maxTokens}
                />
              </Box>
            )}

            <Box my={2}>
              <Divider />
            </Box>
            <Box>
              {account && (
                <Info account={account} accountBalance={accountBalance} />
              )}
            </Box>
          </Container>
        </Box>
      </Container>
    </UIShell>
  );
};

export default Home;
