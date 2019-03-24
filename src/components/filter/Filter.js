import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import PropTypes from 'prop-types';

const ALL = "ALL";

export default class Filter extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      features: [],
      type: ""
    };

    this.selectType = this.selectType.bind(this);
    this.filter = this.filter.bind(this);
  }


  render() {
    const types =
      [ALL, ...this.props.types]
        .map((v, i) => <option key={i}>{v}</option>);
    const features = this.props.features.map((v, i) => {
      return (
        <div className="checkbox-features" key={i}>
            <Input type="checkbox" onChange={e => this.selectFeature(e, v)}/>{' '}
            {v}
        </div>
      );
    });

    return (
      <Form onSubmit={this.filter}>
        <FormGroup>
          <Label className="title" for="exampleEmail">Types</Label>
          <Input type="select" name="types" onChange={this.selectType}>
            {types}
          </Input>
        </FormGroup>
        <FormGroup check>
          <Label className="title" for="exampleEmail">Features</Label>
          {features}
        </FormGroup>
        <Button className="btn-filter">Filter</Button>
      </Form>
    );
  }

  selectFeature(event, feature) {
    const target = event.target;
    const features =
      target.checked ?
        [...this.state.features, feature] :
        [...this.state.features.filter(v => v !== feature)];
    this.setState({
      ...this.state,
      features
    })
  }

  selectType(event) {
    const type = event.target.value;
    if (type !== ALL) {
      this.setState({
        ...this.state,
        type
      })
    } else {
      this.setState({
        ...this.state,
        type: ""
      })
    }
  }

  filter(event) {
    event.preventDefault();
    this.props.filterResult({...this.state})
  }
}

Filter.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterResult: PropTypes.func.isRequired
};
