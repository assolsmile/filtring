import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as actions from "./components/actions";
import React, {Component} from 'react';
import Listing from "./components/listing/Listing";
import './App.scss';
import Filter from "./components/filter/Filter";

class App extends Component {
  componentDidMount() {
    const {loadAll} = this.props;
    loadAll();
  }

  render() {
    const {geoName, listings} = this.props;
    const listingCards = listings.map((v, i) => <Listing key={i} {...v}/>);
    return (
      <div className="App">
        <header className="header">
          <h1>{geoName}</h1>
          <Filter {...this.props} />
        </header>
        <div className="listingCards">
          {listingCards}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  geoName: state.main.geoName,
  listings: state.main.listings.display,
  features: state.main.features,
  types: state.main.types,
  filters: state.main.filters
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
