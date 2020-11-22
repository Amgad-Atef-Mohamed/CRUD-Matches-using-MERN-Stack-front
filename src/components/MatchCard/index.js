import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@rebass/grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import Card from 'components/Card';
import { CardBody, CardLabel, CardFooter, CallToActionIcon } from 'components/shared';
import { COLORS, COLORS_VALUES } from 'components/theme/colors';
import { FONT_WEIGHTS, FONT_TYPES } from 'components/theme/fonts';
import moment from 'moment';

const { GREY_LIGHT, DISABLED, BRANDING_GREEN, LIGHT_RED } = COLORS;
const { CAPTION } = FONT_TYPES;
const { NORMAL } = FONT_WEIGHTS;

const MatchCard = props => {
  const {
    index,
    match,
    match: {
      _id,
      homeTeam,
      awayTeam,
      startTime,
      endTime,
      duration,
      homeTeamScore,
      awayTeamScore,
      isActive,
      league,
    },
    handleToggleConfirmModal,
    handleDeleteMatch,
    handleToggleEditMatchModal,
  } = props;

  const startTimeInLocalZone = new Date(startTime).toLocaleDateString()
  const endTimeInLocalZone = new Date(endTime).toLocaleDateString()

  const isMatchStarted = moment(startTimeInLocalZone).isBetween(moment(endTimeInLocalZone));
  const isMatchFinished = moment().isAfter(moment(endTimeInLocalZone));
  const isMatchWillStart = moment().isBefore(moment(startTimeInLocalZone));
  const deleteMatchTooltip = 'مسح المباراة';
  const editMatchTooltip = 'تعديل المباراة';
  const deleteMatchConfirmModalHeader = 'تأكيد مسح المباراة';
  const deleteMatchConfirmModalConfirmText = 'هل أنت متأكد أنك تريد مسح المباراة';
  const deleteMatchConfirmModalFunction = () => {
    handleDeleteMatch(_id, index);
  };

  return (
    <Flex width={1} alignItems="center" justifyContent="center">
    <Card
      {...props}
      height="calc(100% - 16px)"
      width={[1/2]}
      minHeight={100}
      flexDirection="column"
      justifyContent="center"
      bgColor={COLORS_VALUES[GREY_LIGHT]}
    >
      <CardBody
        justifyContent="space-between"
        flexDirection={['column', 'row', 'row', 'row', 'row']}
        py={3}
        px={1}
      >
        <Flex width={1} flexDirection='column'>
          <Flex width={1} ml={1} flexDirection={'row'}>
            <Flex
              width={1 /2}
              mb={[3, 0, 0, 0, 0]}
            >
              <Flex alignItems="center" justifyContent="flex-end">
                    <FontAwesomeIcon
                      color={COLORS_VALUES[BRANDING_GREEN]}
                      size="sm"
                    />
                    <CardLabel
                      py={1}
                      px={2}
                      mx={2}
                      type={CAPTION}
                      border={`1px solid ${COLORS_VALUES[BRANDING_GREEN]}`}
                      color={COLORS_VALUES[DISABLED]}
                      fontWeight={NORMAL}
                    >
                      {homeTeam}
                    </CardLabel>
                  </Flex>
            </Flex>

            <Flex pr="10%">
              {homeTeamScore}
            </Flex>
            <Flex pl="10%">
              {awayTeamScore}
            </Flex>
            <Flex
              width={1/2}
              flexWrap={['wrap', 'initial', 'initial', 'initial', 'initial']}
              flexDirection={['row-reverse', 'column', 'column', 'column', 'column']}
              mb={[3, 0, 0, 0, 0]}
            >
                <Flex alignItems="center" justifyContent="flex-end">
                  <FontAwesomeIcon
                    color={COLORS_VALUES[BRANDING_GREEN]}
                    size="sm"
                  />
                  <CardLabel
                    py={1}
                    px={2}
                    mx={2}
                    type={CAPTION}
                    border={`1px solid ${COLORS_VALUES[BRANDING_GREEN]}`}
                    color={COLORS_VALUES[DISABLED]}
                    fontWeight={NORMAL}
                  >
                    {awayTeam}
                  </CardLabel>
                </Flex>
            </Flex>
          </Flex>
          <Flex width={1} flexDirection='row-reverse' py={2} alignItems="center" justifyContent="center">
            {isMatchWillStart ? 'لم تبدا المباراة بعد': isMatchStarted? 'بدائت المباراة':  isMatchFinished? 'انتهت المباراة': ''  }
          </Flex>
        </Flex>
      </CardBody>
      <CardFooter
        flexDirection="row-reverse"
        justifyContent="space-between"
        flexWrap="wrap"
        p={2}
      >
        <Flex px={2}>
          <ReactTooltip id={`deleteWorker_${_id}`} type="error" effect="solid">
            <span>{deleteMatchTooltip}</span>
          </ReactTooltip>
          <Box mr={3}>
            <CallToActionIcon
              data-for={`deleteWorker_${_id}`}
              data-tip
              onClick={() =>
                handleToggleConfirmModal(
                  deleteMatchConfirmModalHeader,
                  deleteMatchConfirmModalConfirmText,
                  deleteMatchConfirmModalFunction,
                )
              }
              icon={faTrashAlt}
              color={COLORS_VALUES[LIGHT_RED]}
              size="sm"
            />
          </Box>
          <ReactTooltip id={`editMatch_${_id}`} type="light" effect="solid">
            <span>{editMatchTooltip}</span>
          </ReactTooltip>
          <Box>
            <CallToActionIcon
              data-for={`editMatch_${_id}`}
              data-tip
              onClick={() => handleToggleEditMatchModal(index, match)}
              icon={faPen}
              color={COLORS_VALUES[DISABLED]}
              size="sm"
            />
          </Box>
        </Flex>
      </CardFooter>
    </Card>
    </Flex>
  );
};
MatchCard.displayName = 'MatchCard';

MatchCard.propTypes = {
  index: PropTypes.number.isRequired,
  match: PropTypes.shape({}).isRequired,
  handleDeleteMatch: PropTypes.func,
  handleToggleConfirmModal: PropTypes.func,
};

MatchCard.defaultProps = {
  handleDeleteMatch: () => {},
  handleToggleConfirmModal: () => {},
};

export default MatchCard;
