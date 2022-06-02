import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {AppButton} from '@component';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {colors, stylesCommon} from '@stylesCommon';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const ModalPickFile = React.memo((prop: any) => {
  const {choseFile, onCancel, chosePhoto, visible} = prop;
  const closeModal = () => {
    onCancel();
  };
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}
      animationType="fade">
      <View style={styles.containerModal}>
        <View
          style={styles.viewOut}
          //@ts-ignore
          onStartShouldSetResponder={closeModal}
        />
        <View style={styles.container}>
          <AppButton
            title="Choose a photo / video"
            onPress={chosePhoto}
            styleButton={styles.button}
            styleTitle={styles.txtTitle}
          />
          <AppButton
            title="Select file"
            onPress={choseFile}
            styleButton={styles.button}
            styleTitle={styles.txtTitle}
          />
          <AppButton
            title="Cancel"
            onPress={closeModal}
            styleButton={styles.button}
            styleTitle={styles.txtTitle}
          />
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    borderRadius: moderateScale(4),
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingBottom: getBottomSpace() + 20,
  },
  viewOut: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  txtHeader: {
    marginTop: verticalScale(14),
    fontSize: moderateScale(18),
    color: colors.darkGrayText,
    ...stylesCommon.fontWeight600,
    textAlign: 'center',
  },
  viewButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(30),
  },
  button: {
    width: '100%',
    marginTop: verticalScale(12),
    backgroundColor: '#FFFFFF',
    height: moderateScale(50),
  },
  txtTitle: {
    fontSize: moderateScale(16),
    color: colors.darkGrayText,
  },
});

export {ModalPickFile};
