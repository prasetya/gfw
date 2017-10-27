import { PureComponent, createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'query-string';
import { isCountryDisabled } from 'app/utils';
import { getLocationParamUpdated } from 'utils/navigation';
import { europeSlug, europeanCountries } from 'app/data/european-countries';

import Component from './about-impacts-component';

class AboutImpactsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      impacts: [],
    };
  }

  fetchData() {
    fetch('http://wri-01.carto.com/api/v2/sql?q=SELECT%20*%20FROM%20gfw_outcomes_for_about_page_images')
      .then(data => this.setState({ impacts: data.rows }))
      .catch((e) => console.log(e))
  }

  render() {
    const { impacts } = this.state;
    const { fetchData } = this;
    return createElement(Component, {
      ...this.props,
      impacts,
      fetchData
    });
  }
}

AboutImpactsContainer.propTypes = {};

export default AboutImpactsContainer;
