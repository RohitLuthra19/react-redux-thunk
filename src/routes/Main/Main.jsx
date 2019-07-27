import React from 'react';
import { connect } from 'react-redux';

import "./Main.css";
import Spinner from '../../components/Spinner/Spinner';
import { fetchSingleCategory } from '../../redux/categories/actions';

export class Main extends React.PureComponent {
    render() {
      const { images, fetching } = this.props.categories;

      return (
        <div className="main">
          <div className="wrapper">
            {this.renderImages(images)}
            <Spinner
              left={'60%'}
              top={'60%'}
              fontSize={'3em'}
              visible={fetching}
            />
          </div>
          <div className="btn_wrapper">
            <button className="btn_more" onClick={this.handleMoreClick}>
              More
            </button>
          </div>
        </div>
      );
    }

    componentDidMount() {
      const { limit, page, activeCategory } = this.props.categories;
      if (activeCategory !== -1) {
        this.props.getSingleCategory(activeCategory, limit, page, false);
      }
    }

    componentDidUpdate(prevProps) {
      const { limit, page, activeCategory } = this.props.categories;
      if (prevProps.categories.activeCategory !== activeCategory) {
        this.props.getSingleCategory(activeCategory, limit, page, false);
      }
    }

    ///////////////////////////////////////////////////////////////////////
    //  RENDER METHODS
    ///////////////////////////////////////////////////////////////////////
    renderImages(images) {
      return images.map((item, i) => {
        return (<img key={item.id + i} src={item.url} width={450} height={400} alt={item.id} className="img"></img>);
      });
    }

    ///////////////////////////////////////////////////////////////////////
    //  EVENT HANDLERS
    ///////////////////////////////////////////////////////////////////////
    handleMoreClick = () => {
      const { limit, page, activeCategory } = this.props.categories;
      this.props.getSingleCategory(activeCategory, limit, page + 1, true);
    }
}

///////////////////////////////////////////////////////////////////////
//  REDUX CONNECTION
///////////////////////////////////////////////////////////////////////
function mapDispatchToProps(dispatch) {
  return {
    getSingleCategory: (categoryId, limit, page, isMore) => dispatch(fetchSingleCategory(categoryId, limit, page, isMore)),
  };
}

function mapStateToProps(state) {
  const { categories } = state;
  const categoriesToJS = categories.toJS();

  return {
    categories : categoriesToJS.categories,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);