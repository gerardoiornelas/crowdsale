import React, { useState } from "react";
import _ from "lodash";
import { Box, Grid, TextField, Button, CircularProgress } from "@mui/material";
import { ethers } from "ethers";

const BuyTokens = ({ provider, price, crowdsale, setisLoading }) => {
  const [amount, setAmount] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);
  const handleOnChange = (e) => {
    const val = _.toNumber(e.target.value);
    setAmount(val);
  };

  const buyTokensHandler = async (e) => {
    e.preventDefault();
    setIsWaiting(true);
    console.log("BuyTokensing tokens...");
    try {
      // Get signer - user of contract
      const signer = await provider.getSigner();

      const value = ethers.utils.parseUnits(
        (amount * price).toString(),
        "ether"
      );
      const formattedAmount = ethers.utils.parseUnits(
        amount.toString(),
        "ether"
      );

      const transaction = await crowdsale
        .connect(signer)
        .buyTokens(formattedAmount, { value: value });

      await transaction.wait();
    } catch {
      window.alert("User rejected or transaction reverted");
    }
  };

  console.log({ amount });
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Box component="form" onSubmit={buyTokensHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="amount"
                    name="amoutn"
                    label="Enter Amount"
                    variant="outlined"
                    fullWidth
                    size="small"
                    type="number"
                    onChange={handleOnChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  {isWaiting ? (
                    <CircularProgress />
                  ) : (
                    <Button type="submit" variant="contained" fullWidth>
                      Buy Tokens
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default BuyTokens;
