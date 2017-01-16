import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Card, Heading } from '../components';
import { load as loadCats, trigger } from '../redux/modules/cats';

const CatsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

class Cats extends Component {
  static propTypes = {
    cats: PropTypes.array.isRequired,
    loadCats: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { cats } = this.props;

    if (!cats.isLoaded) {
      this.props.loadCats();
    }
  }

  render() {
    const { cats } = this.props;

    return (
      <CatsWrapper>
        {cats.length ? cats.map(({ data }) => (
          <Card key={data.id}>
            <img
              role="presentation"
              src={data.thumbnail}
            />
          </Card>
        )) :
        <Heading>Loading you some cats</Heading>}
      </CatsWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    cats: state.cats.list,
  };
}

export default connect(mapStateToProps, { loadCats, trigger })(Cats);
