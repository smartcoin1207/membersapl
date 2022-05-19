import React, {useCallback} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {iconEdit, like, happy, heart, great, smile, sad} from '@images';
import {verticalScale, scale} from 'react-native-size-matters';

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
      {reaction?.map((item: any) => {
        return (
          <Image
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
    width: scale(14),
    height: scale(14),
    marginHorizontal: scale(2),
  },
  imageHeart: {
    width: scale(14),
    height: scale(12),
    marginHorizontal: scale(2),
  },
});

export {Reaction};
