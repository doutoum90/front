import { useColorModeValue } from '@chakra-ui/react';

export const useProfileStyles = () => ({
    pageBg: useColorModeValue('app.pageBg.light', 'app.pageBg.dark'),
    cardBg: useColorModeValue('app.cardBg.light', 'app.cardBg.dark'),
    textPrimary: useColorModeValue('app.textPrimary.light', 'app.textPrimary.dark'),
    textSecondary: useColorModeValue('app.textSecondary.light', 'app.textSecondary.dark'),
    buttonColorScheme: 'app.button',
    progressColorScheme: 'app.progress',
    badgeColorScheme: 'app.badge',
    boxShadow: 'md',
    borderRadius: 'xl',
});