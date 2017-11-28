import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ScrollEvent from 'react-onscroll';

import Share from 'components/share';
import Header from 'pages/country/header';
import Footer from 'pages/country/footer';
import Map from 'pages/country/map';
import WidgetTreeCover from 'pages/country/widget-tree-cover';
import WidgetTreeLocated from 'pages/country/widget-tree-located';
import WidgetTreeLoss from 'pages/country/widget-tree-loss';
import WidgetTreeCoverLossAreas from 'pages/country/widget-tree-cover-loss-areas';
import WidgetAreasMostCoverGain from 'pages/country/widget-areas-most-cover-gain';
import WidgetTotalAreaPlantations from 'pages/country/widget-total-area-plantations';
import WidgetTreeCoverGain from 'pages/country/widget-tree-cover-gain';
import WidgetPlantationArea from 'pages/country/widget-plantation-area';
import WidgetStories from 'pages/country/widget-stories';

class Root extends PureComponent {
  componentDidMount() {
    const { setInitialData } = this.props;
    setInitialData();
  }

  componentWillUpdate(nextProps) {
    const { checkLoadingStatus } = this.props;

    if (nextProps.isLoading) {
      checkLoadingStatus(nextProps);
    }
  }

  showMapMobile() {
    this.props.setShowMapMobile(!this.props.showMapMobile);
  }

  handleScrollCallback() {
    console.log('hi');
    const {
      gfwHeaderHeight,
      isMapFixed,
      setFixedMapStatus,
      setMapTop
    } = this.props;

    const mapFixedLimit =
      document.getElementById('c-widget-stories').offsetTop -
      window.innerHeight;

    if (
      !isMapFixed &&
      window.scrollY >= gfwHeaderHeight &&
      window.scrollY < mapFixedLimit
    ) {
      setFixedMapStatus(true);
      setMapTop(0);
    } else if (isMapFixed && window.scrollY >= mapFixedLimit) {
      setFixedMapStatus(false);
      setMapTop(mapFixedLimit);
    }
  }

  render() {
    const { isMapFixed, showMapMobile } = this.props;

    return (
      <div className="l-country">
        <ScrollEvent handleScrollCallback={() => this.handleScrollCallback()} />
        {isMapFixed && (
          <button
            className="open-map-mobile-tab"
            onClick={() => this.showMapMobile()}
          >
            <span>{!showMapMobile ? 'show' : 'close'} map</span>
          </button>
        )}
        <Header />
        <div
          className={`l-country__map ${isMapFixed ? '-fixed' : ''} ${
            showMapMobile ? '-open-mobile' : ''
          }`}
          style={{ top: this.props.mapTop }}
        >
          <Map
            maxZoom={14}
            minZoom={3}
            mapOptions={{
              mapTypeId: 'grayscale',
              backgroundColor: '#99b3cc',
              disableDefaultUI: true,
              panControl: false,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: true,
              streetViewControl: false,
              overviewMapControl: false,
              tilt: 0,
              scrollwheel: false
            }}
          />
        </div>
        <div className="l-country__widgets row">
          <div className="large-6 small-12 columns l-country__container-widgets">
            <WidgetTreeCover />
          </div>
          <div className="large-6 small-12 columns l-country__container-widgets">
            <WidgetTreeLocated />
          </div>
          <div className="small-12 columns l-country__container-widgets">
            <WidgetTreeLoss />
          </div>
          <div className="small-12 columns l-country__container-widgets">
            <WidgetTreeCoverLossAreas />
          </div>
          <div className="large-6 small-12 columns l-country__container-widgets">
            <WidgetTreeCoverGain />
          </div>
          <div className="large-6 small-12 columns l-country__container-widgets">
            <WidgetAreasMostCoverGain />
          </div>
          <div className="large-6 small-12 columns l-country__container-widgets -last">
            <WidgetTotalAreaPlantations />
          </div>
          <div className="large-6 small-12 columns l-country__container-widgets -last">
            <WidgetPlantationArea />
          </div>
        </div>
        <WidgetStories />
        <Footer />
        <Share />
      </div>
    );
  }
}

Root.propTypes = {
  gfwHeaderHeight: PropTypes.number.isRequired,
  setShowMapMobile: PropTypes.func.isRequired,
  showMapMobile: PropTypes.bool.isRequired,
  setFixedMapStatus: PropTypes.func.isRequired,
  setMapTop: PropTypes.func.isRequired,
  isMapFixed: PropTypes.bool.isRequired,
  mapTop: PropTypes.number.isRequired,

  setInitialData: PropTypes.func.isRequired,
  checkLoadingStatus: PropTypes.func.isRequired
};

export default Root;