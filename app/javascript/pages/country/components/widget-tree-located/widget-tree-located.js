import { createElement } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import WidgetTreeLocatedComponent from './widget-tree-located-component';
import actions from './widget-tree-located-actions';

export { initialState } from './widget-tree-located-reducers';
export { default as reducers } from './widget-tree-located-reducers';
export { default as actions } from './widget-tree-located-actions';

import {
  getTotalCover,
  getTotalCoverRegions
} from '../../../../services/tree-cover';

const mapStateToProps = state => ({
  isLoading: state.widgetTreeLocated.isLoading,
  iso: state.root.iso,
  countryRegions: state.root.countryRegions,
  countryRegion: state.root.countryRegion,
  countryData: state.root.countryData,
  topRegions: state.widgetTreeLocated.topRegions
});

const regionsForest = [];

const WidgetTreeLocatedContainer = (props) => {
  const setInitialData = (props) => {
    getTotalCover(props.iso, props.countryRegion)
    .then((totalCoverResponse) => {
      getTotalCoverRegions(props.iso)
      .then((totalCoverRegions) => {
        const totalCover = Math.round(totalCoverResponse.data.data[0].value);
        totalCoverRegions.data.data.forEach(function(item, index){
          const numberRegion = (_.findIndex(props.countryRegions, function(x) { return x.id === item.adm1; }));
          regionsForest.push({
            name: props.countryRegions[numberRegion].name,
            value: item.value,
            percent: (item.value / totalCover) * 100
          })
        });
        props.setTreeLocatedValues(regionsForest);
      });
    });
  };
  return createElement(WidgetTreeLocatedComponent, {
    ...props,
    setInitialData
  });
};

export default connect(mapStateToProps, actions)(WidgetTreeLocatedContainer);