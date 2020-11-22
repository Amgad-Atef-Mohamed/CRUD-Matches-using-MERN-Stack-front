import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex, Box } from '@rebass/grid';
import { space, bgColor } from 'styled-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Card from 'components/Card';
import Text from 'components/Text';
import { COLORS_VALUES, COLORS } from 'components/theme/colors';
import { FONT_TYPES, FONT_WEIGHTS } from 'components/theme/fonts';
import FilterInput from './FilterInput';
import DatePicker from './DatePicker';

const { DISABLED, WHITE_TRANSPARENT_BACKGROUND } = COLORS;
const { TITLE, SUBHEADING } = FONT_TYPES;
const { NORMAL } = FONT_WEIGHTS;

const FilterContainer = styled.div`
  ${bgColor};
  ${space};
  position: fixed;
  display: flex;
  opacity: ${props => (props.isOpened ? 1 : 0)};
  justify-content: center;
  align-items: center;
  direction: rtl;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: all 200ms ease-out;
  z-index: ${props => (props.isOpened ? 999 : -1)};
`;

const FilterContent = styled(Card)`
  position: absolute;
  left: ${props => (props.isOpened ? 0 : '-380px')};
  height: 100vh;
  transition: all 400ms ease-out;
`;

const FilterOverFlowContent = styled(Flex)`
  position: absolute;
  left: ${props => (props.isOpened ? '380px' : 'calc(100% + 380px)')};
  height: 100vh;
  transition: all 400ms ease-out;
`;

const ScrollableModalContent = styled(Flex)`
  min-height: calc(100% - 12px);
  overflow-y: auto;
`;

const ModalHeader = styled(Flex)`
  position: fixed;
  z-index: 1;
  background-color: ${COLORS_VALUES[COLORS.GREY_MEDIUM]};
  border-bottom: 2px solid ${COLORS_VALUES[COLORS.GREY_LIGHT]};
`;

const CloseButton = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

class Filter extends Component {
  static propTypes = {
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    isOpened: PropTypes.bool,
    toggleFilter: PropTypes.func,
  };

  static defaultProps = {
    header: '',
    isOpened: false,
    toggleFilter: () => {},
  };

  constructor(props) {
    super(props);

    const {isOpened, filterQueries, cachedFilterPage} = props;
    const cachedFilterState = JSON.parse(sessionStorage.getItem(`${cachedFilterPage}FilterState`));
    let filterState = {
      teamName: undefined,
      fromDateValue: undefined,
      toDateValue: undefined,
      filterQueries,
    };
    if (cachedFilterState) {
      const {
        teamName,
        fromDateValue,
        toDateValue,
        filterQueries: cachedFilterQueries,
      } = cachedFilterState;

      filterState = {
        teamName,
        fromDateValue,
        toDateValue,
        filterQueries: cachedFilterQueries,
      };
    }


    this.state = {
      isOpened,
      ...filterState,
    };
  }

  componentDidUpdate = prevProps => {
    const { isOpened, cachedFilterPage } = this.props;
    const { isOpened: isOpenedState, ...otherState } = this.state;
    if (prevProps.isOpened !== isOpened) {
      this.toggleFilter(isOpened);
    }

    if (cachedFilterPage !== prevProps.cachedFilterPage) {
      const cache = JSON.parse(sessionStorage.getItem(`${cachedFilterPage}FilterState`)) || {
        teamName: '',
        fromDateValue: '',
        toDateValue: '',
        filterQueries: {
          skip: 0,
          limit: 20,
        },
      };
      this.setState({
        ...cache,
      });
      return;
    }

    sessionStorage.setItem(`${cachedFilterPage}FilterState`, JSON.stringify(otherState));
  };

  toggleFilter = isOpened => {
    const { isOpened: isOpenedState } = this.state;

    if (isOpenedState !== isOpened) {
      this.setState({ isOpened });
    }
  };

  handleTeamNameInputChange = teamName => {
    const { filterFunction, handleChangeFilterQueries } = this.props;
    const { filterQueries } = this.state;

    this.setState({ teamName }, () => {
      this.setState(
        {
          filterQueries: {
            ...filterQueries,
            teamName,
            skip: 0,
            limit: 20,
          },
        },
        () => {
          const { filterQueries: filterQueriesNextState } = this.state;

          setTimeout(() => {
            handleChangeFilterQueries('teamName', teamName);
            filterFunction(filterQueriesNextState, true);
          }, 1000);
        },
      );
    });
  };


  render() {
    const {
      header,
      toggleFilter,
      filterSections,
    } = this.props;
    const {
      teamName,
      fromDateValue,
      toDateValue,
      isOpened,
    } = this.state;
    console.log('filterSections', filterSections)
    const showTeamNameSection = filterSections.includes('teamName');
    const showDatesSection = filterSections.includes('dates');


    return (
      <FilterContainer isOpened={isOpened} bg={WHITE_TRANSPARENT_BACKGROUND}>
        <FilterContent
          width={['280px', '380px', '380px', '380px', '380px']}
          isOpened={isOpened}
          flexDirection="column"
        >
          <ModalHeader
            header={header}
            width={['280px', '380px', '380px', '380px', '380px']}
            p={4}
            flexDirection="row-reverse"
            justifyContent="space-between"
          >
            <CloseButton
              color={COLORS_VALUES[DISABLED]}
              size="lg"
              icon={faTimes}
              onClick={() => toggleFilter()}
            />
            {header && (
              <Text
                textAlign="right"
                color={COLORS_VALUES[DISABLED]}
                type={TITLE}
                fontWeight={NORMAL}
              >
                {header}
              </Text>
            )}
          </ModalHeader>
          <ScrollableModalContent pt="56px" px={2} mt={3}>
            <Box width={1}>
              {showTeamNameSection && (
                <Flex width={1} flexDirection="column" mb={2}>
                  <Text
                    mx={2}
                    mb={4}
                    type={SUBHEADING}
                    color={COLORS_VALUES[DISABLED]}
                    fontWeight={NORMAL}
                  >
                    اسم الفريق
                  </Text>
                  <FilterInput
                    value={teamName}
                    handleInputChange={this.handleTeamNameInputChange}
                    inputType="text"
                    inputPlaceholder="اسم الفريق"
                  />
                </Flex>
              )}
              {showDatesSection && (
                <Flex width={1} flexDirection="column" mb={2}>
                  <Text
                    mx={2}
                    mb={4}
                    type={SUBHEADING}
                    color={COLORS_VALUES[DISABLED]}
                    fontWeight={NORMAL}
                  >
                    التاريخ
                  </Text>
                  <Flex width={1}>
                    <DatePicker
                      value={fromDateValue}
                      handleDatePickerChange={this.handleFromDateInputChange}
                      placeholder="MM/DD/YYYY"
                    />
                    <DatePicker
                      value={toDateValue}
                      handleDatePickerChange={this.handleToDateInputChange}
                      placeholder="MM/DD/YYYY"
                    />
                  </Flex>
                </Flex>
              )}
            </Box>
          </ScrollableModalContent>
        </FilterContent>
        <FilterOverFlowContent
          isOpened={isOpened}
          onClick={() => toggleFilter()}
          width={[
            'calc(100% - 280px)',
            'calc(100% - 380px)',
            'calc(100% - 380px)',
            'calc(100% - 380px)',
            'calc(100% - 380px)',
          ]}
        />
      </FilterContainer>
    );
  }
}

Filter.displayName = 'Filter';

Filter.propTypes = {
  cachedFilterPage: PropTypes.string.isRequired,
  filterFunction: PropTypes.func.isRequired,
  handleChangeFilterQueries: PropTypes.func,
  filterSections: PropTypes.arrayOf(
    PropTypes.oneOf([
      'teamName',
      'dates',
    ]),
  ).isRequired,
  filterQueries: PropTypes.shape({}).isRequired,
};

Filter.defaultProps = {
  handleChangeFilterQueries: () => {},
  isRequestsStatusMulti: true,
};

export default Filter;
