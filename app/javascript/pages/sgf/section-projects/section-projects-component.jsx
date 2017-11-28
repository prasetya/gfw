import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProjectsGLobe from 'pages/sgf/section-projects/section-projects-globe';
import ProjectsModal from 'pages/sgf/section-projects/section-projects-modal';
import Card from 'components/card';
import ItemsList from 'components/items-list';

import './section-projects-styles.scss';

class SectionProjects extends PureComponent {
  handleCardClick = d => {
    this.props.setSectionProjectsModal({
      isOpen: true,
      data: d
    });
  };

  render() {
    const {
      data,
      categories,
      setCategorySelected,
      categorySelected
    } = this.props;
    const hasData = data && !!data.length;
    const hasCategories = categories && !!categories.length;
    return (
      <div className="">
        <div className="l-section">
          <div className="row">
            <div className="column small-6">
              <h2 className="text -color-2 -title-xs -light">
                SMALL GRANTS FUND RECIPIENTS
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="column small-6">
              <ProjectsGLobe data={data} />
            </div>
            <div className="column small-6 section-projects-list">
              {hasCategories && (
                <ItemsList
                  data={categories}
                  itemSelected={categorySelected}
                  onClick={setCategorySelected}
                />
              )}
            </div>
          </div>
        </div>
        <div className="l-section">
          {hasData && (
            <ul className="row card-list">
              {data.map(d => (
                <li key={d.id} className="column small-6">
                  <Card data={d} onClick={this.handleCardClick} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <ProjectsModal />
      </div>
    );
  }
}

SectionProjects.propTypes = {
  data: PropTypes.array,
  categories: PropTypes.array.isRequired,
  categorySelected: PropTypes.string.isRequired,
  setCategorySelected: PropTypes.func.isRequired,
  setSectionProjectsModal: PropTypes.func.isRequired
};

export default SectionProjects;