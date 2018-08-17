// @flow strict

import * as React from 'react';
import { graphql, createFragmentContainer } from '@kiwicom/mobile-relay';
import { TextIcon } from '@kiwicom/mobile-shared';
import { Translation } from '@kiwicom/mobile-localization';
import { MenuItem } from '@kiwicom/mobile-navigation';
import idx from 'idx';

import LocationsPopup from './LocationsPopup';
import LocationPopupButton from './LocationPopupButton';
import type { LoungeMenuItem as LoungeMenuItemType } from './__generated__/LoungeMenuItem.graphql';

type Props = {|
  +data: LoungeMenuItemType,
  +onOpenTransportationMap: () => void,
|};

type State = {|
  popupVisible: boolean,
|};

class TransporationMenuItem extends React.Component<Props, State> {
  state = {
    popupVisible: false,
  };

  openPopup = () => {
    this.setState({
      popupVisible: true,
    });
  };

  hidePopup = () => {
    this.setState({
      popupVisible: false,
    });
  };

  openTransportationMap = () => {
    this.hidePopup();
    this.props.onOpenTransportationMap();
  };

  render = () => {
    const lounge = idx(this.props, _ => _.data.lounge);

    if (!lounge) {
      // no lounges available on this trip (do not render the menu item at all)
      return null;
    }

    const relevantAirports = idx(lounge, _ => _.relevantAirports) || [];

    return (
      <React.Fragment>
        <LocationsPopup
          isVisible={this.state.popupVisible}
          onClose={this.hidePopup}
        >
          {relevantAirports.map(relevantAirport => {
            if (!relevantAirport) {
              return null;
            }
            const { whitelabelURL, location } = relevantAirport;
            return (
              <LocationPopupButton
                key={whitelabelURL}
                data={location}
                whitelabelURL={whitelabelURL}
                onPress={this.openTransportationMap}
                displayIata={true}
              />
            );
          })}
        </LocationsPopup>

        <MenuItem
          title={
            <Translation id="mmb.trip_services.local_services.transportation" />
          }
          onPress={this.openPopup}
          icon={<TextIcon code=";" />}
        />
      </React.Fragment>
    );
  };
}

export default createFragmentContainer(
  TransporationMenuItem,
  graphql`
    fragment TransporationMenuItem on WhitelabeledServices {
      lounge {
        relevantAirports {
          whitelabelURL
          location {
            ...LocationPopupButton
          }
        }
      }
    }
  `,
);
