import React from "react";
import { Box, Typography } from "@mui/material";

import Logo from "../../images/logo.png";

const Navigation = () => {
  return (
    <Box display="flex">
      <Box component="img" src={Logo} alt="logo" sx={{ height: "50px" }} />
      <Box
        ml={2}
        sx={{
          height: "50px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">DApp ICO Crowdsale</Typography>
      </Box>
    </Box>
  );
};

export default Navigation;
