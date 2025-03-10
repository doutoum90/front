import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, #root': {
        fontSize: 'md',
        height: '100%'
      },
      body: {
        overflowX: 'hidden',
        fontFamily: 'N27, sans-serif',
        fontSize: 'md',
        height: '100%',
        // backgroundImage:
        //   'radial-gradient(208.77% 95.91% at -3.54% 105.56%, rgba(0, 102, 255, 0.25) 0%, rgba(217, 217, 217, 0.00) 100%), radial-gradient(151.1% 67.63% at 107.71% 23.37%, rgba(0, 102, 255, 0.25) 0%, rgba(217, 217, 217, 0.00) 100%), radial-gradient(123.4% 61.42% at 25.16% 104.31%, rgba(106, 204, 165, 0.50) 0%, rgba(255, 255, 255, 0.00) 100%), radial-gradient(122.37% 72.45% at 96.67% -10.15%, rgba(106, 204, 165, 0.50) 0%, rgba(255, 255, 255, 0.00) 100%);',
        backgroundColor: '#D8E8EE',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }
    }
  },
  fonts: {
    heading: `'N27', sans-serif`,
    body: `'N27', sans-serif`
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem'
  },
  colors: {
    black: '#000',
    white: '#fff',
    gray_disabled: '#7C818D',
    blue: {
      600: '#0D1726'
    }
  },
})

export default theme
