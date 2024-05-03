import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

import {chatStamp1, chatStamp2, chatStamp3, chatStamp4} from '@images';

//Các image Stamp được đánh tên và trọng số trùng với id VD: chatStamp2 => tương ứng với id là 2
const DATA = [
  {id: 1, url: chatStamp1},
  {id: 2, url: chatStamp2},
  {id: 3, url: chatStamp3},
  {id: 4, url: chatStamp4},
];

const CONTAINER_PADDING_HORIZONTAL = 20;
const CONTAINER_PADDING_VERTICAL = 12;

const GAP = 12;
const ITEM_PER_ROW = 4;
const TOTAL_GAP = (ITEM_PER_ROW - 1) * GAP;
const TOTAL_ROW = DATA.length / ITEM_PER_ROW;

const WINDOW_WIDTH = Dimensions.get('screen').width;
const CHILD_WIDTH =
  (WINDOW_WIDTH - scale(CONTAINER_PADDING_HORIZONTAL * 2) - scale(TOTAL_GAP)) /
  ITEM_PER_ROW;

const ModalStamp = React.memo((props: any) => {
  const {onChose} = props;

  return (
    <ScrollView
      style={[
        styles.scrollView,
        {
          maxHeight:
            CHILD_WIDTH * 2 + scale(GAP + CONTAINER_PADDING_VERTICAL * 2 + 12),
        },
      ]}>
      <View style={styles.container}>
        {DATA.map((item: any, index) => {
          return (
            <TouchableOpacity
              key={item?.id}
              onPress={() => {
                onChose(item?.id);
              }}>
              <Image
                source={item?.url}
                style={[
                  styles.image,
                  (index + 1) % ITEM_PER_ROW !== 0
                    ? styles.imageMarginRight
                    : styles.imageNoMarginRight,
                  (index + 1) / ITEM_PER_ROW < TOTAL_ROW
                    ? styles.imageMarginBottom
                    : styles.imageNoMarginBottom,
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    backgroundColor: '#FFFFFF',
    shadowColor: '#D6D6D6',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 14,
    paddingHorizontal: scale(CONTAINER_PADDING_HORIZONTAL),
    flexWrap: 'wrap',
    paddingVertical: verticalScale(CONTAINER_PADDING_VERTICAL),
  },
  scrollView: {
    paddingTop: scale(12),
  },
  image: {
    width: CHILD_WIDTH,
    height: CHILD_WIDTH,
    zIndex: 9999,
  },
  imageMarginRight: {
    marginRight: scale(GAP),
  },
  imageNoMarginRight: {
    marginRight: 0,
  },
  imageMarginBottom: {
    marginBottom: scale(GAP),
  },
  imageNoMarginBottom: {
    marginBottom: 0,
  },
});

export {ModalStamp};
