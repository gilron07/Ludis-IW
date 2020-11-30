import { createMuiTheme }  from '@material-ui/core/styles'
const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#f2ae1b',
        light: "f4a215"
    },
    secondary: {
        main: '#7ed9b1'
    },
  },
  dialog: {
    // fullWidth,
    maxWidth: 100,
  }
})
export default theme