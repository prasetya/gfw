import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import WidgetHeader from '../widget-header/widget-header';

class WidgetTreeLocated extends PureComponent {
  componentDidMount() {
    const { setInitialData } = this.props;
    setInitialData(this.props);
  }

  moreRegion = () => {
    const { moreRegion } = this.props;
    moreRegion();
  };

  lessRegion = () => {
    const { lessRegion } = this.props;
    lessRegion();
  };

  render() {
    const {
      isLoading,
      countryData,
      topRegions,
      startArray,
      endArray
    } = this.props;

    const showUpIcon = startArray >= 10;
    const showDownIcon = endArray >= topRegions.length;

    if (isLoading) {
      return <div className="c-loading -widget"><div className="loader">Loading...</div></div>
    } else {
      return (
        <div className="c-widget c-widget-tree-located">
          <WidgetHeader
            title={`Where are the forest located in ${countryData.name}`}
            noMap={true} />
          <ul className="c-widget-tree-located__regions">
            {topRegions.slice(startArray, endArray).map((item, index) => {
              return (
                <li key={index}>
                  <div className="c-widget-tree-located__region-bubble">{item.position}</div>
                  <div className="c-widget-tree-located__region-name">{item.name}</div>
                  <div className="c-widget-tree-located__region-percent">{numeral(Math.round(item.percent)).format('0,0')}%</div>
                  <div className="c-widget-tree-located__region-value">{numeral(Math.round(item.value / 1000)).format('0,0')} Ha</div>
                </li>
              );
            })}
          </ul>
          <div className="c-widget-tree-located__scroll-more">
            {showUpIcon && <div className="circle-icon -up" onClick={this.lessRegion}><svg className="icon icon-angle-arrow-down"><use xlinkHref="#icon-angle-arrow-down">{}</use></svg></div>}
            {!showDownIcon && <div className="circle-icon" onClick={this.moreRegion}><svg className="icon icon-angle-arrow-down"><use xlinkHref="#icon-angle-arrow-down">{}</use></svg></div>}
          </div>
        </div>
      )
    }
  }
}

WidgetTreeLocated.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setInitialData: PropTypes.func.isRequired,
  countryData: PropTypes.object.isRequired,
  topRegions: PropTypes.array.isRequired
};

export default WidgetTreeLocated;
