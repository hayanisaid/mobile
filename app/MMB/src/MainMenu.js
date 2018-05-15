// @flow

import * as React from 'react';
import { ScrollView } from 'react-native';
import { TextIcon } from '@kiwicom/mobile-shared';
import { Translation } from '@kiwicom/mobile-localization';

import Header from './components/header/Header';
import TitledMenuGroup from './components/menu/TitledMenuGroup';
import MenuItem from './components/menu/MenuItem';

type Props = {|
  openMenu: string => void,
  bookingId: string,
|};

type State = {|
  activeId: string,
|};

export default class MainMenu extends React.Component<Props, State> {
  state = {
    activeId: 'mmb.main_menu.services.flight_services',
  };

  handleOpenFlightServicesSubmenu = () => {
    this.setState(
      {
        activeId: 'mmb.main_menu.services.flight_services',
      },
      () => this.props.openMenu('mmb.flight_services'),
    );
  };

  handleOpenTripServicesSubmenu = () => {
    this.setState(
      {
        activeId: 'mmb.main_menu.services.trip_services',
      },
      () => this.props.openMenu('mmb.trip_services'),
    );
  };

  handleOpenHelpSubmenu = () => {
    this.setState(
      {
        activeId: 'mmb.main_menu.manage.help',
      },
      () => this.props.openMenu('mmb.help'),
    );
  };

  handleOpenOtherSubmenu = () => {
    this.setState(
      {
        activeId: 'mmb.main_menu.manage.other',
      },
      () => this.props.openMenu('mmb.other'),
    );
  };

  render = () => {
    const { activeId } = this.state;

    return (
      <ScrollView>
        <Header bookingId={this.props.bookingId} />

        <TitledMenuGroup title={<Translation id="mmb.main_menu.services" />}>
          <MenuItem
            onPress={this.handleOpenFlightServicesSubmenu}
            isActive={activeId === 'mmb.main_menu.services.flight_services'}
            icon={<TextIcon code="&#xe049;" />}
            title={<Translation id="mmb.main_menu.services.flight_services" />}
            description={
              <Translation id="mmb.main_menu.services.flight_services.description" />
            }
          />

          <MenuItem
            onPress={this.handleOpenTripServicesSubmenu}
            isActive={activeId === 'mmb.main_menu.services.trip_services'}
            icon={<TextIcon code="&#xe08a;" />}
            title={<Translation id="mmb.main_menu.services.trip_services" />}
            description={
              <Translation id="mmb.main_menu.services.trip_services.description" />
            }
          />
        </TitledMenuGroup>

        <TitledMenuGroup title={<Translation id="mmb.main_menu.manage" />}>
          <MenuItem
            onPress={this.handleOpenHelpSubmenu}
            isActive={activeId === 'mmb.main_menu.manage.help'}
            icon={<TextIcon code="F" />}
            title={<Translation id="mmb.main_menu.manage.help" />}
            description={
              <Translation id="mmb.main_menu.manage.help.description" />
            }
          />

          <MenuItem
            onPress={this.handleOpenOtherSubmenu}
            isActive={activeId === 'mmb.main_menu.manage.other'}
            icon={<TextIcon code="&#xe07d;" />}
            title={<Translation id="mmb.main_menu.manage.other" />}
            description={
              <Translation id="mmb.main_menu.manage.other.description" />
            }
          />
        </TitledMenuGroup>
      </ScrollView>
    );
  };
}
