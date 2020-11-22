import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';
import Modal from 'components/Modal';
import Text from 'components/Text';
import Button from 'components/Buttons';
import { COLORS, COLORS_VALUES } from 'components/theme/colors';
import { FONT_TYPES, FONT_WEIGHTS } from 'components/theme/fonts';
import Caution from 'components/Caution';

const ConfirmModal = props => {
  const {
    header,
    isOpened,
    confirmText,
    toggleFunction,
    confirmFunction,
    isConfirming,
    isFail,
    errorMessage,
  } = props;
  const { BRANDING_BLUE, DISABLED, LIGHT_RED, WHITE, ERROR } = COLORS;
  const { NORMAL } = FONT_WEIGHTS;
  const { SUBHEADING } = FONT_TYPES;

  return (
    <Modal toggleModal={toggleFunction} header={header} isOpened={isOpened}>
      <Flex flexDirection="column">
        <Flex pt={1} pb={4} px={4} mb={3}>
          <Text type={SUBHEADING} color={COLORS_VALUES[DISABLED]} fontWeight={NORMAL}>
            {confirmText}
          </Text>
        </Flex>
        {isFail && (
          <Caution mx={2} bgColor={LIGHT_RED} textColor={WHITE} borderColorProp={ERROR}>
            {errorMessage}
          </Caution>
        )}
        <Flex flexDirection="row-reverse" p={3}>
          <Button color={BRANDING_BLUE} onClick={confirmFunction} isLoading={isConfirming} mx={1}>
            نعم
          </Button>
          <Button color={DISABLED} onClick={toggleFunction} mx={1}>
            <Text cursor="pointer" color={COLORS_VALUES[BRANDING_BLUE]} fontWeight={NORMAL}>
              لا
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
ConfirmModal.displayName = 'ConfirmModal';

ConfirmModal.propTypes = {
  header: PropTypes.string,
  confirmText: PropTypes.string.isRequired,
  isOpened: PropTypes.bool,
  toggleFunction: PropTypes.func,
  confirmFunction: PropTypes.func,
  isConfirming: PropTypes.bool,
  isFail: PropTypes.bool,
  errorMessage: PropTypes.string,
};

ConfirmModal.defaultProps = {
  header: undefined,
  toggleFunction: () => {},
  confirmFunction: () => {},
  isOpened: false,
  isConfirming: false,
  isFail: false,
  errorMessage: undefined,
};

export default ConfirmModal;
