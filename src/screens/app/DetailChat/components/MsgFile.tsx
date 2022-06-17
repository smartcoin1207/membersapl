import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import {scale, moderateScale, verticalScale} from 'react-native-size-matters';
import Video from 'react-native-video';
import {iconPlay, iconPdf, iconDoc, iconXls, iconFile} from '@images';
import {ModalReadFile} from '@component';
import {colors, stylesCommon} from '@stylesCommon';
import ImageView from 'react-native-image-viewing';

const MsgFile = React.memo((props: any) => {
  const {data} = props;

  const [modalImage, setModalImage] = useState(false);
  const [urlModalImage, setUrlModalImage] = useState<any>([]);

  const [dataModalFile, setDataModalFile] = useState({
    show: false,
    path: null,
  });

  const openFile = useCallback(url => {
    // Linking.openURL(url);
    setDataModalFile({
      show: true,
      path: url,
    });
  }, []);

  const onCloseModalFile = useCallback(() => {
    setDataModalFile({
      show: false,
      path: null,
    });
  }, []);

  const viewImage = useCallback(() => {
    setModalImage(!modalImage);
  }, [modalImage]);

  const Item = ({item}: any) => {
    return (
      <>
        {item?.type == 4 && (
          <TouchableOpacity
            onPress={async () => {
              await setUrlModalImage([{uri: item?.path}]);
              viewImage();
            }}>
            <Image
              source={{uri: item?.path}}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        {item?.type == 7 && (
          <TouchableOpacity
            style={styles.viewRow}
            onPress={() => openFile(item?.path)}>
            <Image source={iconFile} style={styles.iconFile} />
            <Text style={styles.txtTitleFile} numberOfLines={1}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
        {item?.type == 2 && (
          <TouchableOpacity
            style={styles.viewRow}
            onPress={() => openFile(item?.path)}>
            <Image source={iconPdf} style={styles.iconFile} />
            <Text style={styles.txtTitleFile} numberOfLines={1}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
        {item?.type == 5 && (
          <TouchableOpacity
            style={styles.viewRow}
            onPress={() => openFile(item?.path)}>
            <Image source={iconDoc} style={styles.iconFile} />
            <Text style={styles.txtTitleFile} numberOfLines={1}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
        {item?.type == 3 && (
          <TouchableOpacity
            style={styles.viewRow}
            onPress={() => openFile(item?.path)}>
            <Image source={iconXls} style={styles.iconFile} />
            <Text style={styles.txtTitleFile} numberOfLines={1}>
              {item?.name}
            </Text>
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
      <ImageView
        images={urlModalImage}
        imageIndex={0}
        visible={modalImage}
        onRequestClose={viewImage}
      />
      <ModalReadFile data={dataModalFile} onClose={onCloseModalFile} />
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
  iconPlay: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: '#FFFFFF',
  },
  viewIconPlay: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    position: 'absolute',
  },
  viewCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconFile: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  txtTitleFile: {
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
    fontSize: moderateScale(12),
    marginLeft: scale(5),
    width: '80%',
  },
});

export {MsgFile};
