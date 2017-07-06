import {
  orange500,
  grey700,
  red500,
  green500,
  fullWhite,
  fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import color from 'color';

export default {
  orange: orange500,
  white: fullWhite,
  grey: grey700,
  red: red500,
  green: green500,

  primary1Color: orange500,
  primary2Color: orange500,
  primary3Color: orange500,
  accent1Color: grey700,
  accent2Color: grey700,
  accent3Color: grey700,
  textColor: fullBlack,
  secondaryTextColor: fade(fullBlack, 0.7),
  alternateTextColor: fullBlack,
  canvasColor: '#fff',
  borderColor: fade(fullBlack, 0.3),
  disabledColor: fade(fullBlack, 0.3),
  pickerHeaderColor: fade(fullBlack, 0.12),
  clockCircleColor: fade(fullBlack, 0.12),
};
