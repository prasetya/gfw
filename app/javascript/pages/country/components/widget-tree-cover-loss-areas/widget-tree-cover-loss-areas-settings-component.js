import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select-me';

class WidgetTreeCoverLossAreasSettings extends PureComponent {

  // regionChange = (value) => {
  //   this.props.onRegionChange(value.value);
  // };
  //
  // unitChange = (value) => {
  //   this.props.onUnitChange(value.value);
  // };
  //
  // canopyChange = (value) => {
  //   this.props.onCanopyChange(value.value);
  // };

  iconRenderer = () => {
    return(<svg className="icon icon-angle-arrow-down"><use xlinkHref="#icon-angle-arrow-down">{}</use></svg>);
  }

  render() {
    const {
      regions,
      units,
      canopies,
      settings,
      years
    } = this.props;
    return (
      <div className="c-widget-settings">
        <div className="c-widget-settings__select">
          <div className="c-widget-settings__title">LOCATION</div>
          <Select
            iconRenderer={this.iconRenderer}
            value={settings.region}
            options={regions}/>
        </div>
        <div className="c-widget-settings__select">
          <div className="c-widget-settings__title">UNIT</div>
          <Select
            iconRenderer={this.iconRenderer}
            value={settings.unit}
            options={units}/>
        </div>
        <div className="c-widget-settings__button-select -years">
          <div className="c-widget-settings__title">YEARS</div>
          <div className="c-widget-settings__container-years">
            <Select
              value={settings.startYear}
              options={years}/>
            <span className="text-date">to</span>
            <Select
              value={settings.endYear}
              options={years}/>
          </div>
        </div>
        <div className="c-widget-settings__button-select">
          <div className="c-widget-settings__title">CANOPY DENSITY</div>
          <Select
            value={settings.canopy}
            options={canopies}/>
        </div>
      </div>
    );
  }
}

WidgetTreeCoverLossAreasSettings.propTypes = {
  regions: PropTypes.array.isRequired,
  units: PropTypes.array.isRequired,
  canopies: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
};

export default WidgetTreeCoverLossAreasSettings;
