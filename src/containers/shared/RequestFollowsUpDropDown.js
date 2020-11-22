import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { fetchFollowUpsList } from 'redux-modules/statics/actions';
import { StyledSelect, selectColors, customSelectStylesIsDanger } from 'components/shared';

class RequestFollowsUpDropDown extends Component {
  componentDidMount() {
    const { isGetFollowUpsListSuccess, fetchFollowUpsList: fetchFollowUpsListAction } = this.props;

    if (!isGetFollowUpsListSuccess) {
      // fetchFollowUpsListAction();
    }
  }

  render() {
    const {
      isMulti,
      isDanger,
      value,
      handleInputChange,
      isGetFollowUpsListSuccess,
      followUpsList,
    } = this.props;
    const SelectOptions =
      followUpsList &&
      followUpsList.map(record => ({
        value: record.ar,
        label: record.ar,
      }));

    return (
      <StyledSelect
        {...this.props}
        placeholder=""
        noOptionsMessage={() => 'لا يوجد اختيارات متاحة'}
        isRtl
        isMulti={isMulti}
        backspaceRemovesValue={false}
        menuShouldScrollIntoView
        value={value}
        onChange={val => {
          handleInputChange(val);
        }}
        maxMenuHeight={165}
        isDisabled={!isGetFollowUpsListSuccess}
        isLoading={!isGetFollowUpsListSuccess}
        options={SelectOptions}
        theme={selectColors}
        styles={customSelectStylesIsDanger(isDanger)}
        isClearable
      />
    );
  }
}

RequestFollowsUpDropDown.displayName = 'RequestFollowsUpDropDown';

RequestFollowsUpDropDown.propTypes = {
  isMulti: PropTypes.bool,
  isDanger: PropTypes.bool,
  value: PropTypes.shape({}),
  handleInputChange: PropTypes.func,
  isGetFollowUpsListSuccess: PropTypes.bool,
  fetchFollowUpsList: PropTypes.func,
  followUpsList: PropTypes.shape({}),
  isFetchingFollowUpsList: PropTypes.bool,
  type: PropTypes.string,
};

RequestFollowsUpDropDown.defaultProps = {
  isMulti: true,
  isDanger: false,
  value: undefined,
  handleInputChange: () => {},
  isGetFollowUpsListSuccess: false,
  fetchFollowUpsList: () => {},
  followUpsList: [],
  isFetchingFollowUpsList: false,
  type: undefined,
};

export default RequestFollowsUpDropDown;
