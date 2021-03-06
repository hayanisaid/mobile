// @flow strict

import * as React from 'react';
import { View } from 'react-native';
import { Text, StyleSheet } from '@kiwicom/mobile-shared';
import { Translation } from '@kiwicom/mobile-localization';
import { graphql, createFragmentContainer } from '@kiwicom/mobile-relay';
import { defaultTokens } from '@kiwicom/mobile-orbit';

import TravelTypeIcon from '../../../components/TravelTypeIcon';
import type { FromToRow_arrival as ArrivalType } from './__generated__/FromToRow_arrival.graphql';
import type { FromToRow_departure as DepartureType } from './__generated__/FromToRow_departure.graphql';

type Props = {|
  departure: DepartureType,
  arrival: ArrivalType,
  type: 'RETURN' | 'ONE_WAY' | 'MULTICITY',
|};

export const FromToRow = (props: Props) => (
  <View style={styles.row}>
    <View style={styles.flexItem}>
      <Text style={[styles.text, styles.cityText]}>
        <Translation passThrough={props.departure.airport?.city?.name} />
      </Text>
    </View>
    <View style={[styles.flexItem, styles.iconWrapper]}>
      <TravelTypeIcon type={props.type} style={styles.icon} />
    </View>
    <View style={[styles.flexItem, styles.arrivalWrapper]}>
      <Text style={[styles.text, styles.cityText]}>
        <Translation passThrough={props.arrival.airport?.city?.name} />
      </Text>
    </View>
  </View>
);

export default createFragmentContainer(FromToRow, {
  arrival: graphql`
    fragment FromToRow_arrival on RouteStop {
      airport {
        city {
          name
        }
      }
    }
  `,
  departure: graphql`
    fragment FromToRow_departure on RouteStop {
      airport {
        city {
          name
        }
      }
    }
  `,
});

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cityText: {
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    color: defaultTokens.paletteWhite,
  },
  flexItem: {
    flex: 1,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  icon: {
    color: defaultTokens.paletteWhite,
  },
  arrivalWrapper: {
    alignItems: 'flex-end',
  },
});
