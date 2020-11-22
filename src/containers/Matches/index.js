import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getAllMatches,
  addMatchReset,
  deleteMatch,
  toggleAddNewMatchModal,
  openEditMatchModal,
} from 'redux-modules/matches/actions';
import Filter from 'components/Filter';
import Text from 'components/Text';
import Button from 'components/Buttons';
import { FONT_WEIGHTS, FONT_TYPES } from 'components/theme/fonts';
import { COLORS, COLORS_VALUES } from 'components/theme/colors';
import { StickyContainer } from 'components/shared';
import Matches from 'components/Matches';

const { GREY_MEDIUM, DISABLED, BRANDING_GREEN, PRIMARY } = COLORS;
const { SUPER_TITLE, SUBHEADING } = FONT_TYPES;
const { NORMAL } = FONT_WEIGHTS;

class MatchesContainer extends Component {
  static propTypes = {
    matches: PropTypes.arrayOf(PropTypes.shape({})),
    hasMoreMatches: PropTypes.bool,
    isGetAllMatchesFetching: PropTypes.bool,
    isGetAllMatchesError: PropTypes.bool,
    isDeleteMatchFetching: PropTypes.bool,
    isDeleteMatchSuccess: PropTypes.bool,
    getAllMatches: PropTypes.func,
    addMatchReset: PropTypes.func,
    deleteMatch: PropTypes.func,
    toggleAddNewMatchModal: PropTypes.func,
    openEditMatchModal: PropTypes.func,
    isAddNewMatchModalOpen: PropTypes.bool,
    isEditMatchModalOpen: PropTypes.bool,
    getAllMatchesErrorMessage: PropTypes.string,
  };

  static defaultProps = {
    matches: [],
    hasMoreMatches: true,
    isGetAllMatchesFetching: false,
    isGetAllMatchesError: false,
    isDeleteMatchFetching: false,
    isDeleteMatchSuccess: false,
    getAllMatches: () => {},
    addMatchReset: () => {},
    deleteMatch: () => {},
    toggleAddNewMatchModal: () => {},
    openEditMatchModal: () => {},
    isAddNewMatchModalOpen: false,
    isEditMatchModalOpen: false,
    getAllMatchesErrorMessage: undefined,
  };

  constructor(props) {
    super(props);

    const cachedFilterState = JSON.parse(sessionStorage.getItem('matchesFilterState'));
    let filterQueries = {
      skip: 0,
      limit: 20,
    };

    if (cachedFilterState) {
      const { filterQueries: cachedFilterQueries } = cachedFilterState;

      filterQueries = cachedFilterQueries;
    }

    this.state = {
      isFilterOpen: false,
      isConfirmModalOpen: false,
      confirmModalHeader: '',
      confirmModalText: '',
      confirmModalFunction: () => {},
      filterQueries,
      index: 0,
      matchDetails: undefined,
    };
  }

  componentDidMount() {
    const { getAllMatches: getAllMatchesAction } = this.props;
    const { filterQueries } = this.state;

    getAllMatchesAction(filterQueries, true);
  }

  componentDidUpdate(prevProps) {
    const { isDeleteMatchSuccess } = this.props;

    if (
      isDeleteMatchSuccess &&
      isDeleteMatchSuccess !== prevProps.isDeleteMatchSuccess
    ) {
      this.handleToggleConfirmModal('', '', () => {});
    }
  }

  loadMoreMatches = () => {
    const { getAllMatches: getAllMatchesAction } = this.props;
    const {
      filterQueries,
      filterQueries: { skip, limit },
    } = this.state;

    this.setState(
      {
        filterQueries: { ...filterQueries, skip: skip + 20, limit },
      },
      () => {
        const { filterQueries: filterQueriesNextState } = this.state;

        getAllMatchesAction(filterQueriesNextState);
      },
    );
  };

  handleToggleConfirmModal = (header, confirmText, confirmFunction) => {
    const { isConfirmModalOpen } = this.state;

    this.setState(
      {
        confirmModalHeader: !isConfirmModalOpen ? header : '',
        confirmModalText: !isConfirmModalOpen ? confirmText : '',
        confirmModalFunction: !isConfirmModalOpen ? confirmFunction : () => {},
      },
      () => {
        this.setState({
          isConfirmModalOpen: !isConfirmModalOpen,
        });
      },
    );
  };

  handleToggleAddNewMatchModal = () => {
    const {
      toggleAddNewMatchModal: toggleAddNewMatchModalAction,
      addMatchReset: addMatchResetAction,
    } = this.props;

    addMatchResetAction();
    toggleAddNewMatchModalAction();
  };

  handleToggleEditMatchModal = (index, matchDetails) => {
    console.log('sddddddddddddddddddddddddd', index);
    const { openEditMatchModal: openEditMatchModalAction } = this.props;
    this.setState({ matchDetails, index });

    openEditMatchModalAction();
  };

  handleToggleFilterModal = () => {
    const { isFilterOpen } = this.state;

    this.setState({ isFilterOpen: !isFilterOpen });
  };

  handleChangeFilterQueries = (type, val) => {
    const { filterQueries } = this.state;

    this.setState({ filterQueries: { ...filterQueries, [type]: val, skip: 0, limit: 20 } });
  };

  render() {
    const {
      matches,
      hasMoreMatches,
      isGetAllMatchesFetching,
      isGetAllMatchesError,
      getAllMatches: getAllMatchesAction,
      deleteMatch: deleteMatchAction,
      isAddNewMatchModalOpen,
      isEditMatchModalOpen,
      isDeleteMatchFetching,
      getAllMatchesErrorMessage,
    } = this.props;
    const {
      isFilterOpen,
      isConfirmModalOpen,
      confirmModalHeader,
      confirmModalText,
      confirmModalFunction,
      filterQueries,
      index,
      matchDetails,
    } = this.state;

    return (
      <Flex flexDirection="column" alignItems="flex-end" width={1}>
        <Helmet>
          <title>المباريات</title>
        </Helmet>
          <>
            <StickyContainer
              width={1}
              py={2}
              flexDirection="row-reverse"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              bgColor={COLORS_VALUES[GREY_MEDIUM]}
            >
              <Text m={2} type={SUPER_TITLE} color={COLORS_VALUES[DISABLED]} fontWeight={NORMAL}>
                المباريات
              </Text>
              <Flex m={2}>
                <Button
                  ml={1}
                  mr={1}
                  color={PRIMARY}
                  onClick={this.handleToggleFilterModal}
                  icon={faFilter}
                  iconWidth="sm"
                  xMargin={3}
                  isLoading={false}
                  reverse
                >
                  <Text
                    cursor="pointer"
                    mx={2}
                    type={SUBHEADING}
                    color={COLORS_VALUES[DISABLED]}
                    fontWeight={NORMAL}
                  >
                    فرز
                  </Text>
                </Button>
                  <Button
                    ml={1}
                    mr={1}
                    color={PRIMARY}
                    onClick={this.handleToggleAddNewMatchModal}
                    icon={faPlus}
                    iconWidth="sm"
                    xMargin={3}
                    isLoading={false}
                    reverse
                  >
                    <Text
                      cursor="pointer"
                      mx={2}
                      type={SUBHEADING}
                      color={COLORS_VALUES[DISABLED]}
                      fontWeight={NORMAL}
                    >
                      أضف مباراة
                    </Text>
                  </Button>
              </Flex>
            </StickyContainer>
            <Filter
              cachedFilterPage="matches"
              filterSections={['teamName', 'dates']}
              fieldsQueryKey="field"
              citiesQueryKey="city"
              matchQueryKey="code"
              header="فرز"
              filterQueries={filterQueries}
              isOpened={isFilterOpen}
              filterFunction={getAllMatchesAction}
              toggleFilter={this.handleToggleFilterModal}
              handleChangeFilterQueries={this.handleChangeFilterQueries}
            />
            <Box width={1}>
              <InfiniteScroll
                dataLength={matches.length}
                next={this.loadMoreMatches}
                hasMore={hasMoreMatches}
                loader={
                  <Flex m={2} justifyContent="center" alignItems="center">
                    <FontAwesomeIcon
                      icon={faSpinner}
                      size="lg"
                      spin
                      color={COLORS_VALUES[BRANDING_GREEN]}
                    />
                  </Flex>
                }
              >
                <Matches
                  matches={matches}
                  isConfirmModalOpen={isConfirmModalOpen}
                  isAddNewMatchModalOpen={isAddNewMatchModalOpen}
                  confirmModalHeader={confirmModalHeader}
                  confirmModalText={confirmModalText}
                  confirmModalFunction={confirmModalFunction}
                  handleToggleConfirmModal={this.handleToggleConfirmModal}
                  handleDeleteMatch={deleteMatchAction}
                  isDeleteMatchFetching={isDeleteMatchFetching}
                  matchIndex={index}
                  matchDetails={matchDetails}
                  isEditMatchModalOpen={isEditMatchModalOpen}
                  handleToggleEditMatchModal={this.handleToggleEditMatchModal}
                  isGetAllMatchesFetching={isGetAllMatchesFetching}
                  isGetAllMatchesError={isGetAllMatchesError}
                  getAllMatchesErrorMessage={getAllMatchesErrorMessage}
                />
              </InfiniteScroll>
            </Box>
          </>
      </Flex>
    );
  }
}
MatchesContainer.displayName = 'MatchesContainer';

const mapStateToProps = state => ({
  matches: state.matches.matches,
  hasMoreMatches: state.matches.hasMoreMatches,
  isGetAllMatchesFetching: state.matches.getAllMatches.isFetching,
  isGetAllMatchesError: state.matches.getAllMatches.isFail.isError,
  getAllMatchesErrorMessage: state.matches.getAllMatches.isFail.message,
  isDeleteMatchFetching: state.matches.deleteMatch.isFetching,
  isDeleteMatchSuccess: state.matches.deleteMatch.isSuccess,
  isAddNewMatchModalOpen: state.matches.addNewMatchModal.isOpen,
  isEditMatchModalOpen: state.matches.editMatchModal.isOpen,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllMatches,
      addMatchReset,
      deleteMatch,
      toggleAddNewMatchModal,
      openEditMatchModal,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MatchesContainer);
