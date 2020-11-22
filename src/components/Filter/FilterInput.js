import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@rebass/grid';
import Text from 'components/Text';
import InputField from 'components/InputField';
import { COLORS_VALUES, COLORS } from 'components/theme/colors';
import { FONT_TYPES, FONT_WEIGHTS } from 'components/theme/fonts';

const FilterInput = props => {
  const { value, handleInputChange, inputType, inputLabel, inputPlaceholder } = props;
  const { DISABLED } = COLORS;
  const { SUBHEADING } = FONT_TYPES;
  const { NORMAL } = FONT_WEIGHTS;

  return (
    <Flex width={1} flexWrap="wrap" flexDirection="column" px={1} mb={2}>
      {inputLabel && (
        <Text mx={2} mb={4} type={SUBHEADING} color={COLORS_VALUES[DISABLED]} fontWeight={NORMAL}>
          {inputLabel}
        </Text>
      )}
      <InputField
        type={inputType}
        placeholder={inputPlaceholder}
        width={1}
        value={value}
        onChange={handleInputChange}
        autoComplete="off"
      />
    </Flex>
  );
};
FilterInput.displayName = 'FilterInput';

FilterInput.propTypes = {
  value: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  inputType: PropTypes.string,
  inputLabel: PropTypes.string,
  inputPlaceholder: PropTypes.string.isRequired,
};

FilterInput.defaultProps = {
  value: undefined,
  inputType: 'text',
  inputLabel: undefined,
};

export default FilterInput;
