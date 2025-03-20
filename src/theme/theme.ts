import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  shadows: {
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  styles: {
    global: (props: any) => ({
      'html, #root': {
        fontSize: 'md',
        height: '100%',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : '#D8E8EE',
        color: props.colorMode === 'dark' ? 'gray.200' : 'gray.800',
        overflowX: 'hidden',
        fontFamily: 'N27, sans-serif',
        fontSize: 'md',
        height: '100%',
        backgroundImage: props.colorMode === 'light' ?
          'radial-gradient(208.77% 95.91% at -3.54% 105.56%, rgba(0, 102, 255, 0.25) 0%, rgba(217, 217, 217, 0.00) 100%)' : undefined,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
    }),
  },
  fonts: {
    heading: `'N27', sans-serif`,
    body: `'N27', sans-serif`,
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
    '6xl': '3.75rem',
  },
  colors: {
    app: {
      pageBg: {
        light: 'gray.50',
        dark: 'gray.800',
      },
      cardBg: {
        light: 'white',
        dark: 'gray.700',
      },
      textPrimary: {
        light: 'gray.800',
        dark: 'white',
      },
      textSecondary: {
        light: 'gray.600',
        dark: 'gray.300',
      },
      button: 'teal',
      progress: 'teal',
      badge: 'teal',
      formBg: { light: 'white', dark: 'gray.700' },
      heading: 'teal.600',
      text: 'gray.600',
      link: 'teal.600',
      focusBorder: 'teal.500',
      spinner: 'blue.500',
    },
    black: '#000',
    white: '#fff',
    gray_disabled: '#7C818D',
    blue: {
      600: '#0D1726',
    },
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      500: '#319795', // teal.500
      600: '#2C7A7B', // teal.600
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        primary: () => ({
          bg: 'brand.500',
          color: 'white',
          _hover: { bg: 'brand.600' },
          _disabled: { bg: 'gray_disabled', opacity: 0.6 },
        }),
        ghost: ({ colorMode }: { colorMode: string }) => ({
          color: colorMode === 'dark' ? 'gray.200' : 'gray.700',
          _hover: { bg: colorMode === 'dark' ? 'gray.700' : 'gray.100' },
        }),
      },
    },
    Card: {
      baseStyle: ({ colorMode }: { colorMode: string }) => ({
        bg: colorMode === 'dark' ? 'gray.700' : 'white',
        borderRadius: 'xl',
        boxShadow: 'md',
        p: 6,
        transition: 'background-color 0.3s ease',
      }),
    },
    Heading: {
      baseStyle: ({ colorMode }: { colorMode: string }) => ({
        color: colorMode === 'dark' ? 'brand.50' : 'brand.600',
      }),
    },
    Input: {
      baseStyle: ({ colorMode }: { colorMode: string }) => ({
        field: {
          bg: colorMode === 'dark' ? 'gray.700' : 'white',
          borderColor: colorMode === 'dark' ? 'gray.600' : 'gray.300',
          color: colorMode === 'dark' ? 'gray.200' : 'gray.800',
        },
      }),
    },
  },
});

export default theme;