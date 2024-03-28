declare module '*.svg' {
  import {SvgProps} from 'react-native-svg'; // Adjust import as per your SVG library

  const content: React.FC<SvgProps>;
  export default content;
}
