import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {chatStamp1, chatStamp2, chatStamp3, chatStamp4} from '@images';

const DATA = [
  {id: 1, url: chatStamp1},
  {id: 2, url: chatStamp2},
  {id: 3, url: chatStamp3},
  {id: 4, url: chatStamp4},
] as const;

const CONTAINER_PADDING_HORIZONTAL = 20;
const CONTAINER_PADDING_VERTICAL = 12;
const WINDOW_WIDTH = Dimensions.get('screen').width;

const GAPX = 12;
const GAPY = 12;
const ITEM_PER_ROW = WINDOW_WIDTH < 500 ? 4 : WINDOW_WIDTH / 100;
const TOTAL_GAP = (ITEM_PER_ROW - 1) * GAPX;
const TOTAL_ROW = DATA.length / ITEM_PER_ROW;
const CHILD_WIDTH = Math.floor(
  (WINDOW_WIDTH - CONTAINER_PADDING_HORIZONTAL * 2 - TOTAL_GAP) / ITEM_PER_ROW,
);
const MAX_ROW = 1;

const ModalStamp = React.memo((props: any) => {
  const {onChose} = props;

  return (
    <View style={styles.wrap}>
      <ScrollView
        style={[
          styles.scrollView,
          {
            maxHeight:
              CHILD_WIDTH * MAX_ROW +
              (GAPY * (MAX_ROW - 1) + CONTAINER_PADDING_VERTICAL * 2) +
              12,
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
    </View>
  );
});

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 12,
    shadowColor: '#D6D6D6',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 14,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: CONTAINER_PADDING_HORIZONTAL,
    flexWrap: 'wrap',
    paddingVertical: CONTAINER_PADDING_VERTICAL,
  },
  scrollView: {
    width: '100%',
    backgroundColor: '#fff',
  },
  image: {
    width: CHILD_WIDTH,
    height: CHILD_WIDTH,
  },
  imageMarginRight: {
    marginRight: GAPX,
  },
  imageNoMarginRight: {
    marginRight: 0,
  },
  imageMarginBottom: {
    marginBottom: GAPY,
  },
  imageNoMarginBottom: {
    marginBottom: 0,
  },
});

export {ModalStamp};
