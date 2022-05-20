import React, {useCallback} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {iconEdit, like, happy, heart, great, smile, sad} from '@images';
import {verticalScale, scale, moderateScale} from 'react-native-size-matters';

const Reaction = React.memo((props: any) => {
  const {reaction} = props;
  const renderSource = useCallback(value => {
    switch (value) {
      case 1:
        return heart;
      case 2:
        return happy;
      case 3:
        return great;
      case 4:
        return smile;
      case 5:
        return sad;
      case 6:
        return like;
    }
  }, []);

  return (
    <>
      {reaction?.map((item: any, index: any) => {
        return (
          <Image
            key={index}
            source={renderSource(item.reaction_no)}
            style={[item.reaction_no === 1 ? styles.imageHeart : styles.image]}
          />
        );
      })}
    </>
  );
});

const styles = StyleSheet.create({
  image: {
    width: moderateScale(14),
    height: moderateScale(14),
    marginHorizontal: moderateScale(2),
  },
  imageHeart: {
    width: moderateScale(14),
    height: moderateScale(12),
    marginHorizontal: moderateScale(2),
  },
});

export {Reaction};
