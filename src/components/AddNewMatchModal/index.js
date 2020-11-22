import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid';
import moment from 'moment';
import styled from 'styled-components';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  addMatch,
  updateMatch,
  toggleAddNewMatchModal,
  openEditMatchModal,
} from 'redux-modules/matches/actions';
import InputField from 'components/InputField';
import Caution from 'components/Caution';
import Modal from 'components/Modal';
import Text from 'components/Text';
import Button from 'components/Buttons';
import { Checkbox, Label } from '@rebass/forms';
import DatePicker from 'components/Filter/DatePicker';
import { StyledSelect, selectColors, customSelectStyles } from 'components/shared';
import { COLORS, COLORS_VALUES } from 'components/theme/colors';
import { FONT_TYPES } from 'components/theme/fonts';
import _ from 'lodash';
import { space } from 'styled-system';
import { FIELDS } from 'utils/constants';

const { BRANDING_GREEN, LIGHT_RED, ERROR, WHITE, DISABLED, GREY_LIGHT, BRANDING_ORANGE, GREY_DARK } = COLORS;
const { HEADING } = FONT_TYPES;

const fieldsKeys = Object.keys(FIELDS);
const fieldsSelectOptions = fieldsKeys.map(key => ({
  value: key,
  label: FIELDS[key].ar,
}));


const AddNewMatchFormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledDatePicker = styled(DatePicker)`
  ${space};
  background-color: ${props => props.backgroundColor};
  display: block;
  border: 1px solid;
  border-color: ${props => (props.isDanger ? COLORS_VALUES[COLORS.LIGHT_RED] : props.borderColor)};
  border-radius: ${props => props.theme.space[1]}px;
  color: ${props => COLORS_VALUES[props.color ? props.color : COLORS.DISABLED]};
  font-weight: ${props => props.theme.fontWeights.NORMAL};
  line-height: normal;
  outline: 0;
  width: calc(100% - 16px);
  font-size: 14px;
  direction: ltr;

  &:lang(ar) {
    padding: ${props => props.theme.space[2]}px;
    text-align: right;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

const SectionFlexContainer = styled(Flex)`
  .react-datepicker-popper {
    direction: ltr;
    &:lang(ar) {
      text-align: right;
      .react-datepicker__triangle {
        right: 50px;
        left: inherit;
      }
    }
  }
  .react-datepicker__input-container {
    display: block;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range {
    background-color: ${COLORS_VALUES[BRANDING_ORANGE]};
    &:hover {
      background-color: ${COLORS_VALUES[BRANDING_ORANGE]};
      opacity: 0.8;
    }
  }
  .react-datepicker__time-container,
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
    width: 120px;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    &.react-datepicker__time-list-item--selected {
      background-color: ${COLORS_VALUES[BRANDING_ORANGE]};
      &:hover {
        background-color: ${COLORS_VALUES[BRANDING_ORANGE]};
        opacity: 0.8;
      }
    }
  }
  .react-datepicker {
    font-family: 'english-font';
    :lang(ar) {
      font-family: 'arabic-font';
    }
    .react-datepicker-time__header {
      color: ${COLORS_VALUES[GREY_DARK]};
      font-weight: normal;
      font-size: 0.8rem;
    }
  }
  .react-datepicker__close-icon {
    right: 80%;
  }
  .react-datepicker__close-icon::after {
    height: 13px;
    width: 15px;
  }
`;

class AddNewMatchModal extends Component {
  static propTypes = {
    isAddMatchFetching: PropTypes.bool,
    isAddMatchError: PropTypes.bool,
    addMatchErrorMessage: PropTypes.string,
    addMatch: PropTypes.func,
    toggleAddNewMatchModal: PropTypes.func,
    isAddMatchModalOpen: PropTypes.bool,

    isEditMatchFetching: PropTypes.bool,
    matchDetails: PropTypes.shape({}),
    matchIndex: PropTypes.number,
    openEditMatchModal: PropTypes.func,
    isUpdateMatchError: PropTypes.bool,
    updateMatchErrorMessage: PropTypes.string,
  };

  static defaultProps = {
    isAddMatchFetching: false,
    isAddMatchError: false,
    addMatchErrorMessage: '',
    addMatch: () => {},
    toggleAddNewMatchModal: () => {},
    isAddMatchModalOpen: false,

    isEditMatchFetching: false,
    matchDetails: undefined,
    matchIndex: 0,
    openEditMatchModal: () => {},
    isUpdateMatchError: false,
    updateMatchErrorMessage: undefined,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      homeTeam: undefined,
      awayTeam: undefined,
      startTime: undefined,
      endTime: undefined,
      homeTeamScore: 0,
      awayTeamScore: 0,
      league: undefined,
    };
  }

  componentDidMount() {
    const { matchDetails } = this.props;

    if (matchDetails) {
      this.setState({
        active: matchDetails.active,
        homeTeam: matchDetails.homeTeam,
        awayTeam: matchDetails.awayTeam,
        startTime: matchDetails.startTime,
        endTime: matchDetails.endTime,
        homeTeamScore: matchDetails.homeTeamScore,
        awayTeamScore: matchDetails.awayTeamScore,
        league: fieldsSelectOptions.filter(options => matchDetails.league === options.value),
      });
    }
  }

  handleInputFieldChange = (type, value) => {
    this.setState({ [type]: value });
  };

  handleCheckBoxChange = () => {
    this.setState( previousState => ({ active: !previousState.active }) );
  };

  onSubmitAddMatchForm = e => {
    e.preventDefault();

    const {
      addMatch: addMatchAction,
      updateMatch: updateMatchAction,
      matchDetails,
      matchIndex,
    } = this.props;
    const {
      active,
      homeTeam,
      awayTeam,
      startTime,
      endTime,
      homeTeamScore,
      awayTeamScore,
      league,
    } = this.state;
    const matchLeague = league ? league.value : '';

    let newMatchInfo = {
      active,
      homeTeam,
      awayTeam,
      startTime,
      endTime,
      homeTeamScore,
      awayTeamScore,
      league: matchLeague,
    };

    if (matchDetails) {
      const { _id } = matchDetails;

      return updateMatchAction(newMatchInfo, _id, matchIndex);
    }

    addMatchAction(newMatchInfo);
  };

  render() {
    const {
      isAddMatchFetching,
      isAddMatchModalOpen,
      toggleAddNewMatchModal: toggleAddNewMatchModalAction,
      openEditMatchModal: openEditMatchModalAction,
      isAddMatchError,
      addMatchErrorMessage,
      matchDetails,
      matchIndex,
      isEditMatchFetching,
      isUpdateMatchError,
      updateMatchErrorMessage,
    } = this.props;
    const {
      active,
      homeTeam,
      awayTeam,
      startTime,
      endTime,
      homeTeamScore,
      awayTeamScore,
      league,
    } = this.state;

    const addMatchModalHeader = matchDetails ? 'تعديل المباراة' : 'أضف مباراة';
    const submitButtonText = matchDetails ? 'تعديل' : 'أضف';
    return (
      <Modal
        toggleModal={() =>
          matchDetails
            ? openEditMatchModalAction(matchIndex, matchDetails)
            : toggleAddNewMatchModalAction()
        }
        header={addMatchModalHeader}
        isOpened={isAddMatchModalOpen}
      >
        <AddNewMatchFormContainer onSubmit={this.onSubmitAddMatchForm}>
          <Flex flexDirection="column">
            <Flex pb={3} px={4}>
              <Flex flexDirection="column" width={1} pl={2}>
                <Text mb={2} type={HEADING} color={COLORS_VALUES[BRANDING_GREEN]}>
                  اسم الفريق صاحب الارض
                  <Text mb={2} type={HEADING} color={COLORS_VALUES[LIGHT_RED]}>
                    *
                  </Text>
                </Text>
                <InputField
                  type="text"
                  placeholder="ااسم الفريق صاحب الارض"
                  width={1}
                  value={homeTeam}
                  onChange={value => this.handleInputFieldChange('homeTeam', value)}
                  mb={2}
                  autoComplete="on"
                />
              </Flex>
              <Flex flexDirection="column" width={1} pl={2}>
                <Text mb={2} type={HEADING} color={COLORS_VALUES[BRANDING_GREEN]}>
                  اسم الخصم
                  <Text mb={2} type={HEADING} color={COLORS_VALUES[LIGHT_RED]}>
                    *
                  </Text>
                </Text>
                <InputField
                  type="text"
                  placeholder=" اسم الخصم"
                  width={1}
                  value={awayTeam}
                  onChange={value => this.handleInputFieldChange('awayTeam', value)}
                  mb={2}
                  autoComplete="on"
                  disabled={!_.isEmpty(matchDetails)}
                />
              </Flex>
            </Flex>
            <Flex pb={3} px={4}>
              <SectionFlexContainer flexDirection="column" width={1} flexWrap="wrap" px={1} mb={2}>
                <Text mb={2} type={HEADING} color={COLORS_VALUES[BRANDING_GREEN]}>
                  تاريخ بداية المباراة
                  <Text mb={2} type={HEADING} color={COLORS_VALUES[LIGHT_RED]}>
                    *
                  </Text>
                </Text>
                <StyledDatePicker
                  mb={5}
                  inline={false}
                  placeholderText="تاريخ بداية المباراة"
                  borderColor={COLORS_VALUES[DISABLED]}
                  backgroundColor={COLORS_VALUES[GREY_LIGHT]}
                  selected={startTime? new Date(startTime): undefined}
                  onChange={value => this.handleInputFieldChange('startTime', value)}
                  isClearable
                />
              </SectionFlexContainer>
              <SectionFlexContainer flexDirection="column" width={1} flexWrap="wrap" px={1} mb={2}>
                <Text mb={2} type={HEADING} color={COLORS_VALUES[BRANDING_GREEN]}>
                  تاريخ انتهاء المباراة
                  <Text mb={2} type={HEADING} color={COLORS_VALUES[LIGHT_RED]}>
                    *
                  </Text>
                </Text>
                <StyledDatePicker
                  mb={5}
                  inline={false}
                  placeholderText="تاريخ انتهاء المباراة"
                  borderColor={COLORS_VALUES[DISABLED]}
                  backgroundColor={COLORS_VALUES[GREY_LIGHT]}
                  selected={endTime? new Date(endTime): undefined}
                  onChange={value => this.handleInputFieldChange('endTime', value)}
                  isClearable
                />
              </SectionFlexContainer>
            </Flex>
            <Flex pb={3} px={4}>
              <Flex flexDirection="column" width={1} pl={2}>
                <Text mb={2} type={HEADING} color={COLORS_VALUES[BRANDING_GREEN]}>
                  نتيجة فريق صاحب الارض
                </Text>
                <InputField
                  type="text"
                  placeholder="نتيجة فريق صاحب الارض"
                  width={1}
                  value={homeTeamScore}
                  onChange={value => this.handleInputFieldChange('homeTeamScore', value)}
                  mb={2}
                  autoComplete="on"
                  disabled={!_.isEmpty(matchDetails)}
                />
              </Flex>
              <Flex flexDirection="column" width={1}>
                <Text mb={2} type={HEADING} color={COLORS_VALUES[BRANDING_GREEN]}>
                  نتيجة فرق الخصم
                </Text>
                <InputField
                  type="text"
                  placeholder="نتيجة الفرق الخصم"
                  width={1}
                  value={awayTeamScore}
                  onChange={value => this.handleInputFieldChange('awayTeamScore', value)}
                  mb={2}
                  autoComplete="on"
                  disabled={!_.isEmpty(matchDetails)}
                />
              </Flex>
            </Flex>
            <Flex pb={3} px={4}>
              <Flex flexDirection="column" width={1} pl={2}>
                <Text mb={2} type={HEADING} color={COLORS_VALUES[BRANDING_GREEN]}>
                   البطولة
                  <Text mb={2} type={HEADING} color={COLORS_VALUES[LIGHT_RED]}>
                    *
                  </Text>
                </Text>
                <StyledSelect
                  mb={3}
                  placeholder="البطولة"
                  noOptionsMessage={() => 'لا يوجد اختيارات متاحة'}
                  isRtl
                  backspaceRemovesValue={false}
                  value={league}
                  onChange={value => this.handleInputFieldChange('league', value)}
                  options={fieldsSelectOptions}
                  theme={selectColors}
                  styles={customSelectStyles}
                  isMulti={false}
                  isClearable
                />
              </Flex>
            </Flex>
            <Flex pb={3} px={4}>
              <Box>
                <Label>
                  <Text mb={2} type={HEADING} color={COLORS_VALUES[BRANDING_GREEN]}>
                    نشط
                  </Text>
                  <Checkbox
                    name="remember"
                    checked={active}
                    onChange={this.handleCheckBoxChange}
                    sx={{ color: '#fcfffa' }}
                  />
                </Label>
              </Box>
            </Flex>
            <Flex
              flexDirection="row-reverse"
              alignItems="center"
              justifyContent="space-between"
              pb={5}
              px={4}
            >
              <Button
                type="submit"
                primary
                color={BRANDING_GREEN}
                icon={faChevronLeft}
                reverse
                onClick={this.onSubmitAddMatchForm}
                disabled={isAddMatchFetching}
                isLoading={isAddMatchFetching || isEditMatchFetching}
              >
                {submitButtonText}
              </Button>
              {(isAddMatchError || isUpdateMatchError) && (
                <Caution mx={2} bgColor={LIGHT_RED} textColor={WHITE} borderColorProp={ERROR}>
                  {addMatchErrorMessage || updateMatchErrorMessage}
                </Caution>
              )}
            </Flex>
          </Flex>
        </AddNewMatchFormContainer>
      </Modal>
    );
  }
}
AddNewMatchModal.displayName = 'AddNewMatchModal';

const mapStateToProps = state => ({
  isAddMatchFetching: state.matches.addMatch.isFetching,
  isEditMatchFetching: state.matches.editMatch.isFetching,
  isAddMatchError: state.matches.addMatch.isFail.isError,
  isUpdateMatchError: state.matches.editMatch.isFail.isError,
  addMatchErrorMessage: state.matches.addMatch.isFail.message,
  isAddMatchModalOpen:
    state.matches.addNewMatchModal.isOpen || state.matches.editMatchModal.isOpen,
  updateMatchErrorMessage: state.matches.editMatch.isFail.message,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addMatch,
      updateMatch,
      toggleAddNewMatchModal,
      openEditMatchModal,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddNewMatchModal);
