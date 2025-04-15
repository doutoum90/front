import { useColorMode } from '@chakra-ui/react';

export const useTheme = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const colors = {
        background: colorMode === 'light' ? 'white' : 'gray.800',
        text: colorMode === 'light' ? 'gray.800' : 'white',
        border: colorMode === 'light' ? 'gray.200' : 'gray.700',
        hover: colorMode === 'light' ? 'gray.100' : 'gray.700',
        subtle: colorMode === 'light' ? 'gray.600' : 'gray.400',
        icon: colorMode === 'light' ? 'gray.600' : 'gray.400',
    };

    const isDark = colorMode === 'dark';
    const isLight = colorMode === 'light';

    return {
        colorMode,
        toggleColorMode,
        colors,
        isDark,
        isLight,
    };
}; 