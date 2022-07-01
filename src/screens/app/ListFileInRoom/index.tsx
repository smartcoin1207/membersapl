import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {stylesCommon} from '@stylesCommon';
import {Header} from '@component';

import {HeaderButton} from './Component/HeaderButton';
import {ViewImage} from './Component/ViewImage';
import {ViewFile} from './Component/ViewFile';

const ListFileInRoom = () => {
  const [active, setActive] = useState(1);

  const changeActive = useCallback(
    value => {
      setActive(value);
    },
    [active],
  );

  const renderView = useCallback(() => {
    switch (active) {
      case 1:
        return <ViewImage />;
      case 2:
        return <ViewFile />;
      case 3:
        return <Text>Eello</Text>;
    }
  }, [active]);

  return (
    <View style={styles.container}>
      <Header title="メディア・ファイル・URL" imageCenter back />
      <View style={styles.viewContent}>
        <HeaderButton
          onActive={(value: number) => changeActive(value)}
          active={active}
        />
        {renderView()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesCommon.viewContainer,
  },
  viewContent: {
    flex: 1,
  },
});

export {ListFileInRoom};
