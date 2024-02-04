import { createTheme } from "@mui/material";
import { default as ColorPalette } from "./colors";

const theme = createTheme({
  palette: ColorPalette,
  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          color: "#f5f5f5",
        },
      },
    },
}});

export default theme;