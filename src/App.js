
import logo from './logo.svg';
import './App.css';
//import { ThemeProvider } from '@mui/material';
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import Routing from './Routing';


function App() {
  return (    
      //<ThemeProvider> 
      <ThemeProvider theme={theme}>
      <Routing />
     </ThemeProvider>   
  );
}

export default App;

