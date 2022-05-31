import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';

const MsgFile = React.memo((props: any) => {
  const {data} = props;

  const Item = ({item}: any) => {
    return (
      <>
        {item?.type == 4 && (
          <TouchableOpacity>
            <FastImage
              source={{uri: item?.path}}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <>
      {data?.map((item: any, index: any) => {
        return <Item item={item} key={item?.id} />;
      })}
    </>
  );
});

const styles = StyleSheet.create({
  container: {},
  image: {
    width: moderateScale(150),
    height: moderateScale(100),
    marginVertical: verticalScale(3),
    borderRadius: moderateScale(5),
  },
});

export {MsgFile};
