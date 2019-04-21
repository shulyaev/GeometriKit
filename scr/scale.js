import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const  scaleVertical = (percent) => height * (percent / 100);
const  scaleHorizontal = (percent) => width * (percent / 100);

export { scaleVertical, scaleHorizontal };
