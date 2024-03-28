import {useColorScheme} from 'react-native';

export function useTheme() {
  const theme = useColorScheme();

  const colors = {
    dark: {
      primary: '#000000',
      secondary: '#ffffff',
      tertiary: '#393939',
      quaternary: '#191919',
      blue: '#0095F6',
      lightGray: '#616161',
      violet: '#6E3DEF',
    },
    light: {
      primary: '#ffffff',
      secondary: '#070005',
      tertiary: '#E8E7E7',
      quaternary: '#ffffff',
      blue: '#0095F6',
      lightGray: '#999999',
      violet: '#6E3DEF',
    },
  };

  const currentColor = theme === 'dark' ? colors.dark : colors.light;

  const fonts = {
    blackItalic: 'SFPRODISPLAY-BLACKITALIC',
    bold: 'SFPRODISPLAY-BOLD',
    heavyItalic: 'SFPRODISPLAY-HEAVYITALIC',
    lightItalic: 'SFPRODISPLAY-LIGHTITALIC',
    medium: 'SFPRODISPLAY-MEDIUM',
    regular: 'SFPRODISPLAY-REGULAR',
    semiboldItalic: 'SFPRODISPLAY-SEMIBOLDITALIC',
    thinItalic: 'SFPRODISPLAY-THINITALIC',
    ultraLightItalic: 'SFPRODISPLAY-ULTRALIGHTITALIC',
  };

  const currentFont = fonts;
  return {
    theme,
    colors,
    currentColor,
    fonts,
    currentFont,
  };
}
