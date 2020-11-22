import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  width,
  height,
  minHeight,
  minWidth,
  bgColor,
  border,
  borderColor,
  space,
} from 'styled-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS, COLORS_VALUES } from '../theme/colors';

const StyledButton = styled.button`
  ${height};
  ${minHeight};
  ${width};
  ${minWidth};
  ${border};
  ${borderColor};
  ${bgColor};
  ${space};
  border-radius: 50%;
  outline: none;
  align-items: center;
  display: flex;
  justify-content: center;
  border-style: solid;

  &:not(:disabled) {
    cursor: pointer;
  }
  &:disabled {
    opacity: 0.6;
  }
`;

class IconButton extends PureComponent {
  static propTypes = {
    radius: PropTypes.number,
    disabled: PropTypes.bool,
    isActive: PropTypes.bool,
    icon: PropTypes.shape({
      icon: PropTypes.array,
      iconName: PropTypes.string,
      prefix: PropTypes.string,
    }).isRequired,
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    buttonBorderColor: PropTypes.string,
    buttonBackgroundColor: PropTypes.string,
  };

  static defaultProps = {
    radius: 40,
    disabled: false,
    isActive: false,
    iconSize: 'sm',
    iconColor: COLORS.BRANDING_GREY,
    buttonBorderColor: COLORS.BRANDING_GREY,
    buttonBackgroundColor: COLORS.WHITE,
  };

  constructor(props) {
    super(props);

    const { iconColor, buttonBorderColor, buttonBackgroundColor } = this.props;
    this.state = {
      iconColor,
      buttonBorderColor,
      buttonBackgroundColor,
    };
  }

  onMouseOver = () => {
    const { iconColor, buttonBackgroundColor } = this.props;

    this.changeButtonColors({
      iconColor: buttonBackgroundColor,
      buttonBackgroundColor: iconColor,
    });
  };

  onMouseOut = () => {
    const { iconColor, buttonBackgroundColor } = this.props;

    this.changeButtonColors({
      iconColor,
      buttonBackgroundColor,
    });
  };

  changeButtonColors = ({ iconColor, buttonBackgroundColor }) => {
    // If the button is disabled no more to update the state
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    this.setState({
      iconColor,
      buttonBackgroundColor,
    });
  };

  render = () => {
    const {
      radius,
      icon,
      iconSize,
      isActive,
      iconColor: iconColorProp,
      buttonBackgroundColor: buttonBackgroundColorProp,
    } = this.props;
    const { iconColor, buttonBackgroundColor, buttonBorderColor } = this.state;

    return (
      <StyledButton
        {...this.props}
        height={radius}
        minHeight={radius}
        width={radius}
        minWidth={radius}
        borderColor={buttonBorderColor}
        bg={isActive ? COLORS_VALUES[iconColorProp] : buttonBackgroundColor}
        onMouseEnter={this.onMouseOver}
        onMouseLeave={this.onMouseOut}
      >
        <FontAwesomeIcon
          icon={icon}
          size={iconSize}
          color={isActive ? buttonBackgroundColorProp : COLORS_VALUES[iconColor]}
        />
      </StyledButton>
    );
  };
}

export default IconButton;
