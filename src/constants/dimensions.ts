import {Platform} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import {verticalScale} from 'react-native-size-matters';

export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const SAFE_BOTTOM_PADDING = IS_IOS
  ? initialWindowMetrics?.insets?.bottom || verticalScale(12)
  : verticalScale(12);

export const SAFE_TOP_PADDING = IS_IOS
  ? initialWindowMetrics?.insets?.top || verticalScale(15)
  : verticalScale(15);
