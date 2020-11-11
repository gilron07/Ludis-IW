import { createMuiTheme }  from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#f2ae1b'
    },
    secondary: {
        main: '#7ed9b1'
    } 
  },
  breakpoints: {
    values: {
      sm: 300,
      md: 550,
    },
  },
})
export default theme