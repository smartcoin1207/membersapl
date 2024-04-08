import {Platform} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

export const IS_IOS = Platform.OS === 'ios';

export const SAFE_BOTTOM_PADDING = IS_IOS
  ? initialWindowMetrics?.insets?.bottom || 0
  : 0;
