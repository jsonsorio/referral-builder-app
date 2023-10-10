import { loadAsync } from 'expo-font';

export const fonts = {
  aestetico: {
    regular: 'aestetico-regular',
    light: 'aestetico-light',
    medium: 'aestetico-medium',
    semibold: 'aestetico-semibold',
    bold: 'aestetico-bold',
  },
  inter: {
    regular: 'inter-regular',
    light: 'inter-light',
    medium: 'inter-medium',
    semibold: 'inter-semibold',
    bold: 'inter-bold',
  },
};

// preload fonts
export const loadFonts = () =>
  loadAsync({
    'aestetico-regular': require('@assets/fonts/aestetico-regular.otf'),
    'aestetico-light': require('@assets/fonts/aestetico-light.otf'),
    'aestetico-medium': require('@assets/fonts/aestetico-medium.otf'),
    'aestetico-semibold': require('@assets/fonts/aestetico-semibold.otf'),
    'aestetico-bold': require('@assets/fonts/aestetico-bold.otf'),
    'inter-regular': require('@assets/fonts/Inter-Regular.otf'),
    'inter-light': require('@assets/fonts/Inter-Light.otf'),
    'inter-medium': require('@assets/fonts/Inter-Medium.otf'),
    'inter-semibold': require('@assets/fonts/Inter-SemiBold.otf'),
    'inter-bold': require('@assets/fonts/Inter-Bold.otf'),
  });
