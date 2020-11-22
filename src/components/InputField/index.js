import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { width, space } from 'styled-system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS, COLORS_VALUES } from '../theme/colors';
import { FONT_TYPES, FONT_SIZES } from '../theme/fonts';
import InputTextField from './partials/InputTextField';
import TextAreaField from './partials/TextAreaField';
import IconContainer from './partials/IconContainer';

const InputFieldContainer = styled.div`
  position: relative;
  direction: rtl;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  ${width};
  ${space};
`;

class InputField extends Component {
  constructor(props) {
    super(props);

    const { value } = props;
    const { GREY_DARK } = COLORS;

    this.state = {
      iconColor: COLORS_VALUES[GREY_DARK],
      value: value || '',
    };
  }

  /**
   * Update value if it was changed
   */
  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return {
        value: props.value,
      };
    }
    return null;
  }

  /**
   * Returns the current input value
   */
  getInputValue = () => this.input.value;

  /**
   * Changing the icon color depending on input state
   */
  onFocus = () => {
    const { center } = this.props;
    const { BRANDING_GREEN } = COLORS;

    if (center) {
      this.input.removeAttribute('placeholder');
    }

    this.setState({ iconColor: COLORS_VALUES[BRANDING_GREEN] });
  };

  /**
   * Validating the input value and change the icon color to default
   */
  onBlur = () => {
    const { onBlur } = this.props;
    const { GREY_DARK } = COLORS;

    this.setState({ iconColor: COLORS_VALUES[GREY_DARK] });

    if (onBlur) {
      onBlur(this.getInputValue());
    }
  };

  /**
   * Update input's value while writing
   * @param {event} e
   */
  onTyping = e => {
    const { onChange } = this.props;
    const {
      currentTarget: { value },
    } = e;

    this.setState(
      {
        value,
      },
      () => {
        if (onChange) {
          onChange(value);
        }
      },
    );
  };

  /**
   * Move focus to the input
   */
  focus = () => {
    this.input.focus();
  };

  render() {
    const {
      icon,
      iconSize,
      center,
      helperIcon,
      helperIconSize,
      helperImages,
      disabled,
      type,
      borderColor,
      placeholder,
      inputId,
      autoComplete,
      name,
      maxLength,
      language,
      isRequired,
      onChange,
      onBlur,
      color,
      ...filteredProps
    } = this.props;
    const { iconColor, value } = this.state;
    let iconContent;
    let noIconClass = '';
    let centerClass = '';
    let helpers;
    let maxLengthValue;

    if (icon) {
      iconContent = (
        <IconContainer>
          <FontAwesomeIcon icon={icon} size={iconSize} color={iconColor} />
        </IconContainer>
      );
    } else {
      iconContent = <div />;
      noIconClass = ' field-no-icon';
    }

    if (center) {
      centerClass = ' placeholder--center';
    }

    if (helperIcon) {
      helpers = (
        <div className="helper-icon">
          <FontAwesomeIcon icon={helperIcon} size={helperIconSize} color={iconColor} />
        </div>
      );
    }

    if (helperImages) {
      helpers = (
        <div className="helper-images">
          {helperImages.map((helper, index) => (
            <img key={index} src={helper.image} height={helper.height} alt={helper.image} /> // eslint-disable-line
          ))}
        </div>
      );
    }

    if (maxLength) {
      maxLengthValue = maxLength;
    } else {
      maxLengthValue = undefined;
    }

    if (type === 'hidden') {
      return (
        <input
          type={type}
          value={value}
          id={inputId}
          autoComplete={autoComplete}
          name={name}
          ref={input => {
            this.input = input;
          }}
        />
      );
    }
    if (type === 'textarea') {
      return (
        <InputFieldContainer lang={language} {...filteredProps}>
          <TextAreaField
            className={`${noIconClass}${centerClass}`}
            borderColor={borderColor}
            fontSize={FONT_SIZES[FONT_TYPES.BODY]}
            type={type}
            placeholder={`${placeholder}${isRequired ? '*' : ''}`}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            maxLength={maxLengthValue}
            ref={input => {
              this.input = input;
            }}
            value={value}
            onChange={this.onTyping}
            id={inputId}
            autoComplete={autoComplete}
            name={name}
            disabled={disabled}
          />
        </InputFieldContainer>
      );
    }
    return (
      <InputFieldContainer lang={language} {...filteredProps}>
        {iconContent}
        <InputTextField
          className={`${noIconClass}${centerClass}`}
          fontSize={FONT_SIZES[FONT_TYPES.BODY]}
          type={type}
          placeholder={`${placeholder}${isRequired ? '*' : ''}`}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          maxLength={maxLength}
          ref={input => {
            this.input = input;
          }}
          value={value}
          onChange={this.onTyping}
          id={inputId}
          autoComplete={autoComplete}
          name={name}
          disabled={disabled}
          icon={icon}
          color={color}
        />
        {helpers}
      </InputFieldContainer>
    );
  }
}

InputField.displayName = 'InputField';

InputField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  borderColor: PropTypes.string,
  icon: PropTypes.shape({
    icon: PropTypes.array,
    iconName: PropTypes.string,
    prefix: PropTypes.string,
  }),
  iconSize: PropTypes.string,
  center: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  validationChecks: PropTypes.arrayOf(PropTypes.object),
  language: PropTypes.string,

  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  helperImages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf])),
  helperIcon: PropTypes.shape({
    icon: PropTypes.array,
    iconName: PropTypes.string,
    prefix: PropTypes.string,
  }),
  helperIconSize: PropTypes.string,
  maxLength: PropTypes.number,
  formatOnTyping: PropTypes.func,
  inputId: PropTypes.string,
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  color: PropTypes.string,
};

InputField.defaultProps = {
  type: 'text',
  borderColor: COLORS.GREY_DARK,
  icon: undefined,
  iconSize: 'sm',
  center: false,
  className: '',
  value: '',
  validationChecks: [],
  isRequired: false,
  language: 'ar',
  onBlur: () => {},
  onChange: () => {},
  helperImages: [],
  helperIcon: {},
  helperIconSize: 'sm',
  maxLength: undefined,
  formatOnTyping: () => {},
  inputId: undefined,
  autoComplete: undefined,
  name: undefined,
  disabled: false,
  color: undefined,
};

export default InputField;
