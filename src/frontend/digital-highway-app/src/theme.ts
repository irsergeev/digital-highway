import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
      color: {
        red: string,
        blue: string,
        grey: string,
        darkGrey: string,
        green: string,
        white: string,
        black: string,
      };
    }

    interface ThemeOptions {
      color?: {
        red: string,
        blue: string,
        grey: string,
        darkGrey: string,
        green: string,
        white: string,
        black: string,
      };
    }
  }

export const highwayTheme = createTheme({
    palette: {
        primary: {
            main: '#043669'
        }
    },
    typography: {
        fontFamily: '"Segoe UI"'
    },
    color: {
      red: '#d32f2f',
      blue: '#043669',
      grey: '#ebebeb',
      darkGrey: '#808080',
      green: '#2e7d32',
      white: '#ffffff',
      black: '#000000',
  }
});