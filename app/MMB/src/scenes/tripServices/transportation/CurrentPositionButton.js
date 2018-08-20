// @flow

import * as React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet, TextIcon, Color } from '@kiwicom/mobile-shared';

type Props = {|
  +onPress: () => void,
|};

export default function CurrentPositionButton(props: Props) {
  return (
    <View style={styles.roundButton}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View>
          <TextIcon code="&quot;" style={styles.icon} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    borderWidth: 1,
    width: 40,
    height: 40,
    borderColor: Color.white,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowColor: Color.black,
    shadowOffset: { height: 0, width: 0 },
    position: 'absolute',
    bottom: 80,
    end: 20,
  },
  icon: {
    color: Color.brand,
    fontSize: 20,
  },
});
