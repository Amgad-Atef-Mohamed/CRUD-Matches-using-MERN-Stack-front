import React, { Component } from 'react';
import { Flex } from '@rebass/grid';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Text from '../Text';
import { COLORS, COLORS_VALUES } from '../theme/colors';
import Space from '../theme/space';
import { FONT_TYPES } from '../theme/fonts';

const Step = styled(Text)`
  border-radius: 4px;
  cursor: ${props => props.cursor};
  padding: ${Space[2]}px ${Space[3]}px;

  &:hover {
    background-color: ${props => COLORS_VALUES[props.hover]}};
  }
`;

class Breadcrumb extends Component {
  static propTypes = {
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        pathname: PropTypes.path,
      }),
    ).isRequired,
    location: PropTypes.object.isRequired, // eslint-disable-line
    history: PropTypes.object.isRequired, // eslint-disable-line
    fontType: PropTypes.string,
    arrowWidth: PropTypes.number,
    alertMessage: PropTypes.string,
    validationElementName: PropTypes.string,
  };

  static defaultProps = {
    fontType: FONT_TYPES.BODY,
    arrowWidth: 6,
    validationElementName: undefined,
    alertMessage: 'Data will be lost, are you sure you want to proceed?',
  };

  state = {
    activeStepIndex: 0,
    pathname: undefined,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.pathname !== prevState.pathname) {
      const { pathname } = nextProps.location;
      const { steps } = nextProps;
      const activeStepIndex = steps.findIndex(step => step.pathname === pathname);

      return {
        activeStepIndex,
        pathname: nextProps.location.pathname,
      };
    }

    return null;
  }

  /**
   * Change pathname by using history from react-router-dom
   * @param {string} pathname
   */
  changeRoute = (pathname, isLatest) => {
    // If the step is the last or the only one, we don't redirect
    if (isLatest) {
      return;
    }

    const { history, validationElementName, alertMessage } = this.props;
    const validationElement = document.querySelector(validationElementName);
    let couldRedirect = true;

    // Check if hidden input is exists
    if (validationElement) {
      // Check if field value is true
      couldRedirect = validationElement.value === 'true';
    }

    // Checks if user input is required
    if (!couldRedirect) {
      couldRedirect = window.confirm(alertMessage);
    }

    if (couldRedirect) {
      history.push(pathname);
    }
  };

  render() {
    const { steps, fontType, arrowWidth } = this.props;
    const { activeStepIndex } = this.state;

    return (
      <Flex alignItems="center">
        {steps.map((step, index) => {
          const isLatest = index === activeStepIndex;
          const cursor = isLatest ? 'default' : 'pointer';
          const bg = isLatest ? COLORS.WHITE : COLORS.HOVER;

          if (index <= activeStepIndex) {
            return (
              <Flex key={step.name} alignItems="center">
                <Step
                  cursor={cursor}
                  hover={bg}
                  type={fontType}
                  onClick={() => this.changeRoute(step.pathname, isLatest)}
                >
                  {step.name}
                </Step>
                {!isLatest && (
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    color={COLORS.HELP_TEXT}
                    size={arrowWidth}
                    mx={1}
                  />
                )}
              </Flex>
            );
          }
          return null;
        })}
      </Flex>
    );
  }
}

export default withRouter(Breadcrumb);
