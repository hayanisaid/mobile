// @flow

import * as React from 'react';

import Color from './Color';
import StyleSheet from './PlatformStyleSheet';
import TextIcon from './icons/TextIcon';

type Props = {|
  size?: number,
  color?: string,
  code?: string,
|};

const createStyles = (size: number, color: string) =>
  StyleSheet.create({
    icon: {
      color: color,
      fontSize: size,
      ios: {
        position: 'absolute',
        left: -size / 2,
        top: -size,
      },
      android: {},
    },
  });

export default function PositionMarker({
  size = 25,
  code,
  color = Color.brand,
}: Props) {
  const styles = createStyles(size, color);
  return <TextIcon code={code || 'B'} style={styles.icon} />;
}
