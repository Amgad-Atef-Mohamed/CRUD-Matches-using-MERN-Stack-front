import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';
import { Flex } from '@rebass/grid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Text from 'components/Text';
import { COLORS_VALUES, COLORS } from 'components/theme/colors';
import { FONT_TYPES, FONT_WEIGHTS } from 'components/theme/fonts';

const StyledDatePicker = styled(DatePicker)`
  ${space};
  background-color: ${props => props.backgroundColor};
  display: block;
  border: 1px solid;
  border-color: ${props => (props.isDanger ? COLORS_VALUES[COLORS.LIGHT_RED] : props.borderColor)};
  border-radius: ${props => props.theme.space[1]}px;
  color: ${props => COLORS_VALUES[props.color ? props.color : COLORS.DISABLED]};
  font-weight: ${props => props.theme.fontWeights.NORMAL};
  line-height: normal;
  outline: 0;
  width: calc(100% - 16px);
  font-size: 14px;
  direction: ltr;

  &:lang(ar) {
    padding: ${props => props.theme.space[2]}px;
    text-align: right;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

export const SectionFlexContainer = styled(Flex)`
  .react-datepicker-popper {
    direction: ltr;
    &:lang(ar) {
      text-align: right;
      .react-datepicker__triangle {
        right: 50px;
        left: inherit;
      }
    }
  }
  .react-datepicker__input-container {
    display: block;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range {
    background-color: ${COLORS_VALUES[COLORS.BRANDING_ORANGE]};
    &:hover {
      background-color: ${COLORS_VALUES[COLORS.BRANDING_ORANGE]};
      opacity: 0.8;
    }
  }
  .react-datepicker__time-container,
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
    width: 120px;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    &.react-datepicker__time-list-item--selected {
      background-color: ${COLORS_VALUES[COLORS.BRANDING_ORANGE]};
      &:hover {
        background-color: ${COLORS_VALUES[COLORS.BRANDING_ORANGE]};
        opacity: 0.8;
      }
    }
  }
  .react-datepicker {
    font-family: 'english-font';
    :lang(ar) {
      font-family: 'arabic-font';
    }
    .react-datepicker-time__header {
      color: ${COLORS_VALUES[COLORS.GREY_DARK]};
      font-weight: normal;
      font-size: 0.8rem;
    }
  }
  .react-datepicker__close-icon {
    right: 80%;
  }
  .react-datepicker__close-icon::after {
    height: 13px;
    width: 15px;
  }
`;

const DatePickerComponent = props => {
  const { value, handleDatePickerChange, label, placeholder } = props;
  const { DISABLED, GREY_LIGHT } = COLORS;
  const { SUBHEADING } = FONT_TYPES;
  const { NORMAL } = FONT_WEIGHTS;

  return (
    <SectionFlexContainer width={1} flexWrap="wrap" flexDirection="column" px={1} mb={2}>
      {label && (
        <Text mx={2} mb={4} type={SUBHEADING} color={COLORS_VALUES[DISABLED]} fontWeight={NORMAL}>
          {label}
        </Text>
      )}
      <StyledDatePicker
        mb={5}
        inline={false}
        placeholderText={placeholder}
        showTimeSelect
        timeIntervals={15}
        locale="pt-BR"
        dateFormat="Pp"
        timeFormat="p"
        borderColor={COLORS_VALUES[DISABLED]}
        backgroundColor={COLORS_VALUES[GREY_LIGHT]}
        selected={value}
        onChange={handleDatePickerChange}
        isClearable
        {...props}
      />
    </SectionFlexContainer>
  );
};
DatePickerComponent.displayName = 'DatePickerComponent';

DatePickerComponent.propTypes = {
  value: PropTypes.string,
  handleDatePickerChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
};

DatePickerComponent.defaultProps = {
  value: undefined,
  label: undefined,
};

export default DatePickerComponent;
