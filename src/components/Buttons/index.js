import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import ColorString from 'color-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ButtonBase from './ButtonBase';
import Text from '../Text';
import Spinner from '../Spinner';
import { FONT_WEIGHTS } from '../theme/fonts';
import { COLORS, COLORS_VALUES } from '../theme/colors';

class Button extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    color: PropTypes.string,
    primary: PropTypes.bool,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    icon: PropTypes.shape({
      icon: PropTypes.array,
      iconName: PropTypes.string,
      prefix: PropTypes.string,
    }),
    iconWidth: PropTypes.string,
    reverse: PropTypes.bool,
    xMargin: PropTypes.number,
  };

  static defaultProps = {
    color: undefined,
    primary: true,
    disabled: false,
    isLoading: false,
    icon: undefined,
    iconWidth: 'sm',
    reverse: false,
    xMargin: 10,
  };

  /**
   * Decides button background and text color depends on the button type
   * and whether it's disabled or not
   * Types:
   * - Primary: Background will inherit color prop and the text will be white
   * - Secondary: Text will inherit color prop and the background will be transparent
   *
   * @returns {object} contains {textColor, buttonBackground}
   */
  getButtonColors = () => {
    const { primary, disabled, isLoading } = this.props;
    let { color } = this.props;
    const isDisabled = disabled || isLoading;
    let textColor;
    let buttonBackground;
    let buttonBackgroundOnHover;
    let borderColor;
    let borderColorOnHover;

    // Set the default colors if the color prop is not provided
    if (!color) {
      color = primary ? COLORS.LIGHT_RED : COLORS.TEXT;
    }

    if (primary) {
      if (isDisabled) {
        textColor = COLORS_VALUES[COLORS.BRANDING_BLUE];
        buttonBackground = COLORS.DISABLED;
        buttonBackgroundOnHover = buttonBackground;
      } else {
        textColor = COLORS_VALUES[COLORS.WHITE];
        buttonBackground = color;
        buttonBackgroundOnHover = Color(COLORS_VALUES[buttonBackground])
          .darken(0.15)
          .hex();
      }
      borderColor = buttonBackground;
      borderColorOnHover = buttonBackgroundOnHover;
    } else {
      if (isDisabled) {
        textColor = COLORS_VALUES[COLORS.BRANDING_BLUE];
        buttonBackgroundOnHover = COLORS.TRANSPARENT;
      } else {
        textColor = color;
        buttonBackgroundOnHover = Color(COLORS_VALUES[color])
          .alpha(0.08)
          .rgb()
          .array();
        buttonBackgroundOnHover = ColorString.to.rgb(buttonBackgroundOnHover);
      }

      borderColor = COLORS.DISABLED;
      buttonBackground = COLORS.TRANSPARENT;
      borderColorOnHover = borderColor;
    }

    return {
      textColor,
      buttonBackground,
      borderColor,
      buttonBackgroundOnHover,
      borderColorOnHover,
    };
  };

  render() {
    const { children, isLoading, disabled, icon, iconWidth, reverse, xMargin } = this.props;
    const {
      textColor,
      buttonBackground,
      borderColor,
      buttonBackgroundOnHover,
      borderColorOnHover,
    } = this.getButtonColors();
    const shouldRenderIcon = icon && !isLoading;
    const flexDirection = reverse ? 'row-reverse' : 'row';
    const cursor = disabled || isLoading ? 'default' : 'pointer';

    return (
      <ButtonBase
        {...this.props}
        disabled={disabled || isLoading}
        bg={buttonBackground}
        borderColor={borderColor}
        hover={{ background: buttonBackgroundOnHover, borderColor: borderColorOnHover }}
        flexDirection={flexDirection}
      >
        {isLoading && (
          <Spinner radius={16} color={textColor} ml={reverse && 2} mr={!reverse && 2} />
        )}
        {shouldRenderIcon && <FontAwesomeIcon icon={icon} size={iconWidth} color={textColor} />}
        {typeof children === 'string' ? (
          <Text
            tag="span"
            width="max-content"
            color={textColor}
            fontWeight={FONT_WEIGHTS.NORMAL}
            lineHeight={14}
            cursor={cursor}
            mx={xMargin}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </ButtonBase>
    );
  }
}

export default Button;
