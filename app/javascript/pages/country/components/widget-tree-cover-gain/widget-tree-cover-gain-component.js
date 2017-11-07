import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select-me';
import WidgetTreeCoverGainSettings from './widget-tree-cover-gain-settings-component';
import WidgetHeader from '../widget-header/widget-header';
import numeral from 'numeral';

class WidgetTreeCoverGain extends PureComponent {
  render() {
    const {
      isLoading,
      countryData,
      topRegions,
      totalAmount,
      percentage,
      startYear,
      endYear,
      regions,
      settings,
      countryRegion,
      countryRegions
    } = this.props;
    return (
      <div className="c-widget c-widget-tree-cover-gain">
        <WidgetHeader
          title={`TREE COVER GAIN IN ${countryRegion === 0 ? countryData.name : countryRegions[countryRegion - 1].name}`}
          noMap={false} >
          <WidgetTreeCoverGainSettings
            type="settings"
            regions={regions}
            settings={settings} />
        </WidgetHeader>
        <div className="c-widget-tree-cover-gain__container">
          <div className="c-widget-tree-cover-gain__info">
            <p className="title">Hansen - UMD</p>
            <p>
              Over the period of {startYear}-{endYear} {countryRegion === 0 ? countryData.name : countryRegions[countryRegion - 1].name} gained
              <strong> {numeral(Math.round(totalAmount / 1000)).format('0,0')} </strong>
              Ha of tree cover {countryRegion === 0 ? 'country-wide' : 'jurisdiction-wide'}, equivalent to <strong>{numeral(Math.round(percentage)).format('0,0')}%</strong> of countries total value.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

WidgetTreeCoverGain.propTypes = {
};

export default WidgetTreeCoverGain