import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid';
import MatchCard from 'components/MatchCard';
import ConfirmModal from 'components/ConfirmModal';
import AddNewMatchModal from 'components/AddNewMatchModal';
import Card from "components/Card";
import moment from "moment";
import _ from "lodash";
import {
  COLORS,
  COLORS_VALUES
} from "components/theme/colors";
import EmptyState from "components/EmptyState";
import {faFile} from "@fortawesome/free-solid-svg-icons";
import {FONT_TYPES} from "components/theme/fonts";
import {
  Rect,
  ShimmerEffect
} from "components/ShimmerEffect";

const { GREY_LIGHT, GREY_DARK, BRANDING_GREEN, WHITE  } = COLORS;
const { BIG_TITLE } = FONT_TYPES;

const Matches = props => {
  const {
    matches,
    isConfirmModalOpen,
    isAddNewMatchModalOpen,
    confirmModalHeader,
    confirmModalText,
    confirmModalFunction,
    handleToggleConfirmModal,
    handleDeleteMatch,
    isDeleteMatchFetching,
    handleToggleEditMatchModal,
    isEditMatchModalOpen,
    matchDetails,
    matchIndex,

    isGetAllMatchesFetching,
    isGetAllMatchesError,
    getAllMatchesErrorMessage,
  } = props;

  /**
   * Creates lazy loading matches block
   */
  const getLoadingMatches = key => (
    <ShimmerEffect width={1} key={key}>
      <Rect width={1 / 3} height={250} m={2} />
      <Rect width={1 / 3} height={250} m={2} />
      <Rect width={1 / 3} height={250} m={2} />
    </ShimmerEffect>
  );

  /**
   * Render multiple loading list of matches blocks
   */
  const createLoadingMatchesList = () => {
    const list = [];
    for (let counter = 0; counter < 3; counter += 1) {
      list.push(getLoadingMatches(counter));
    }
    return list;
  };

  const groupedMatches = _.chain(matches)
    .sortBy('startTime')
    .groupBy((match) => moment(match.startTime).format('YYYY-MM-DD'))
    .value();

  let counter = 0;

  let matchesRenderer = _.map(groupedMatches, (group, key) =>
    group.map((match, index) => {
      const {_id} = match;

      if(index === 0) {
        return (
          <>
            <Flex width={1}  alignItems="center" justifyContent="center">
              <span>{key}</span>
            </Flex>
            <Box key={_id} width={1}>
              <MatchCard
                index={counter++}
                match={match}
                handleToggleConfirmModal={handleToggleConfirmModal}
                handleDeleteMatch={handleDeleteMatch}
                handleToggleEditMatchModal={handleToggleEditMatchModal}
              />
            </Box>
          </>
        );
      }

      return (
        <Box key={_id} width={1}>
          <MatchCard
            m={2}
            index={index}
            match={match}
            handleToggleConfirmModal={handleToggleConfirmModal}
            handleDeleteMatch={handleDeleteMatch}
            handleToggleEditMatchModal={handleToggleEditMatchModal}
          />
        </Box>
      );
    }));

  if (isGetAllMatchesFetching) {
    matchesRenderer = createLoadingMatchesList();
  }

  if (isGetAllMatchesError) {
    matchesRenderer = (
      <Box width={1}>
        <Box width={[1, 1, 1, 1, 1]}>
          <Card
            minHeight={500}
            ml={[0, 0, 0, 0, 0]}
            mb={3}
            flexDirection="column"
            bgColor={COLORS_VALUES[GREY_DARK]}
          >
            <Flex m={2} justifyContent="center" alignItems="center">
              <Card width={1} minHeight={500} alignItems="center" backgroundColor={GREY_LIGHT}>
                <EmptyState
                  icon={faFile}
                  iconColor={BRANDING_GREEN}
                  iconSize="3x"
                  textColor={WHITE}
                  textSize={BIG_TITLE}
                  text={getAllMatchesErrorMessage}
                />
              </Card>
            </Flex>
          </Card>
        </Box>
      </Box>
    );
  }

  if (!matches.length) {
    matchesRenderer = (
      <Box width={1}>
        <Box width={[1, 1, 1, 1, 1]}>
          <Card
            minHeight={500}
            ml={[0, 0, 0, 0, 0]}
            mb={3}
            flexDirection="column"
            bgColor={COLORS_VALUES[GREY_DARK]}
          >
            <Flex m={2} justifyContent="center" alignItems="center">
              <Card width={1} minHeight={500} alignItems="center" backgroundColor={GREY_LIGHT}>
                <EmptyState
                  icon={faFile}
                  iconColor={BRANDING_GREEN}
                  iconSize="3x"
                  textColor={COLORS_VALUES[WHITE]}
                  textSize={BIG_TITLE}
                  text="لا يوجد مباريات"
                />
              </Card>
            </Flex>
          </Card>
        </Box>
      </Box>
    );
  }

  return (
    <Flex flexDirection="row-reverse" flexWrap="wrap" width={1}>
      {matchesRenderer}
      {isConfirmModalOpen && (
        <ConfirmModal
          isOpened={isConfirmModalOpen}
          header={confirmModalHeader}
          confirmText={confirmModalText}
          toggleFunction={handleToggleConfirmModal}
          confirmFunction={confirmModalFunction}
          isConfirming={isDeleteMatchFetching}
        />
      )}
      {isAddNewMatchModalOpen && <AddNewMatchModal />}
      {isEditMatchModalOpen && (
        <AddNewMatchModal matchDetails={matchDetails} matchIndex={matchIndex} />
      )}
    </Flex>
  );
};
Matches.displayName = 'Matches';

Matches.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isConfirmModalOpen: PropTypes.bool,
  isAddNewMatchModalOpen: PropTypes.bool,
  confirmModalHeader: PropTypes.string,
  confirmModalText: PropTypes.string,
  confirmModalFunction: PropTypes.func,
  handleToggleConfirmModal: PropTypes.func,
  handleDeleteMatch: PropTypes.func,
  isDeleteMatchFetching: PropTypes.bool,

  handleToggleEditMatchModal: PropTypes.func,
  isEditMatchModalOpen: PropTypes.bool,
  matchDetails: PropTypes.shape({}),
  matchIndex: PropTypes.number,
};

Matches.defaultProps = {
  isConfirmModalOpen: false,
  isAddNewMatchModalOpen: false,
  confirmModalHeader: '',
  confirmModalText: '',
  confirmModalFunction: () => {},
  handleToggleConfirmModal: () => {},
  handleDeleteMatch: () => {},
  isDeleteMatchFetching: false,

  handleToggleEditMatchModal: () => {},
  isEditMatchModalOpen: false,
  matchDetails: undefined,
  matchIndex: false,
};

export default Matches;
