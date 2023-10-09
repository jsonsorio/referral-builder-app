import { loadAsync } from 'expo-font';

export const fonts = {
  aestetico: {
    regular: 'aestetico_regular',
    light: 'aestetico_light',
    medium: 'aestetico_medium',
    semibold: 'aestetico_semibold',
    bold: 'aestetico_bold',
  },
  inter: {
    regular: 'inter_regular',
    light: 'inter_light',
    medium: 'inter_medium',
    semibold: 'inter_semibold',
    bold: 'inter_bold',
  },
  openSan: {
    regular: 'openSans_regular',
    regularItalic: 'openSans_regular_italic',
    semiBold: 'openSans_semiBold',
    semiBoldItalic: 'openSans_semiBold_italic',
    bold: 'openSans_bold',
    boldItalic: 'openSans_bold_italic',
  },
};

// preload fonts
export const loadFonts = () =>
  loadAsync({
    aestetico_regular: require('@assets/fonts/aestetico-regular.otf'),
    aestetico_light: require('@assets/fonts/aestetico-light.otf'),
    aestetico_medium: require('@assets/fonts/aestetico-medium.otf'),
    aestetico_semibold: require('@assets/fonts/aestetico-semibold.otf'),
    aestetico_bold: require('@assets/fonts/aestetico-bold.otf'),
    inter_regular: require('@assets/fonts/Inter-Regular.otf'),
    inter_light: require('@assets/fonts/Inter-Light.otf'),
    inter_medium: require('@assets/fonts/Inter-Medium.otf'),
    inter_semibold: require('@assets/fonts/Inter-SemiBold.otf'),
    inter_bold: require('@assets/fonts/Inter-Bold.otf'),
    openSans_regular: require('@assets/fonts/OpenSans-Regular.ttf'),
    openSans_regular_italic: require('@assets/fonts/OpenSans-Italic.ttf'),
    openSans_semiBold: require('@assets/fonts/OpenSans-Semibold.ttf'),
    openSans_semiBold_italic: require('@assets/fonts/OpenSans-SemiboldItalic.ttf'),
    openSans_bold: require('@assets/fonts/OpenSans-Bold.ttf'),
    openSans_bold_italic: require('@assets/fonts/OpenSans-BoldItalic.ttf'),
  });
