import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import { space, bgColor } from 'styled-system';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Card from 'components/Card';
import Text from 'components/Text';
import IconButton from 'components/Buttons/IconButton';
import { COLORS_VALUES, COLORS } from 'components/theme/colors';
import { FONT_TYPES, FONT_WEIGHTS } from 'components/theme/fonts';

const ModalContainer = styled.div`
  ${space};
  ${bgColor};
  overflow-y: ${props => props.overFlowY};
  display: ${props => (props.isOpened ? 'flex' : 'none')};
  position: fixed;
  justify-content: flex-start;
  align-items: center;
  direction: rtl;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;

const ModelContentContainer = styled(Flex)`
  position: relative;
`;

const ModalContent = styled(Card)``;

const ModalHeader = styled(Flex)`
  border-bottom: 2px solid ${COLORS_VALUES[COLORS.GREY_LIGHT]};
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: -15px;
  left: -15px;
  z-index: 9;
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
`;

class Modal extends Component {
  static propTypes = {
    header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    children: PropTypes.element,
    isOpened: PropTypes.bool,
    toggleModal: PropTypes.func,
  };

  static defaultProps = {
    header: '',
    children: '',
    isOpened: false,
    toggleModal: () => {},
  };

  constructor(props) {
    super(props);

    const { isOpened } = props;

    this.state = {
      isOpened,
    };
  }

  componentDidUpdate = prevProps => {
    const { isOpened } = this.props;

    if (prevProps.isOpened !== isOpened) {
      this.toggleModal(isOpened);
    }
  };

  toggleModal = isOpened => {
    const { isOpened: isOpenedState } = this.state;

    if (isOpenedState !== isOpened) {
      this.setState({ isOpened });
    }
  };

  render() {
    const { children, header, toggleModal } = this.props;
    const { isOpened } = this.state;
    const { TITLE } = FONT_TYPES;
    const { NORMAL } = FONT_WEIGHTS;
    const { BRANDING_BLUE, DISABLED, WHITE_TRANSPARENT_BACKGROUND } = COLORS;

    return (
      <ModalContainer overFlowY="auto" isOpened={isOpened} bg={WHITE_TRANSPARENT_BACKGROUND}>
        <ModelContentContainer my={8} width={['90%', '90%', '90%', '50%', '40%']}>
          <CloseButton
            iconColor={BRANDING_BLUE}
            iconSize="lg"
            icon={faTimes}
            onClick={() => toggleModal(false)}
          />
          <ModalContent width={1} flexDirection="column">
            {header && (
              <ModalHeader width={1} p={4} mb={3} flexDirection="row">
                <Text
                  textAlign="right"
                  color={COLORS_VALUES[DISABLED]}
                  type={TITLE}
                  fontWeight={NORMAL}
                >
                  {header}
                </Text>
              </ModalHeader>
            )}
            {children}
          </ModalContent>
        </ModelContentContainer>
      </ModalContainer>
    );
  }
}

export default Modal;
