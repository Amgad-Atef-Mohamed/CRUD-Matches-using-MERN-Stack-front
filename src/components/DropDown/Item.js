/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '../Text';
import Separator from '../Separator';
import { COLORS, COLORS_VALUES } from '../theme/colors';

const ItemStyle = styled.li`
  padding: ${props => props.theme.space[2]}px ${props => props.theme.space[4]}px;
  width: unset;
  display: ${props => !props.component && 'grid'}
  align-items: ${props => !props.component && 'center'};
  grid-column-gap: ${props => !props.component && props.theme.space[2]}px;
  grid-template-columns: ${props => !props.component && 'auto 25px'};
  cursor: ${props => props.isItemClickable && !props.disabled && 'pointer'};
  opacity: ${props => props.disabled && 0.6};

  &:hover {
    background-color: ${props => props.theme.colors.greyDark};
  };
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ItemText = styled(Text)`
  color: ${props => props.theme.colors.disabled};
  font-weight: ${props => props.theme.fontWeights.NORMAL};
  max-width: 200px;
  text-align: right;
  cursor: ${props => props.isItemClickable && !props.disabled && 'pointer'};
`;

class Item extends Component {
  static propTypes = {
    icon: PropTypes.shape({
      icon: PropTypes.array,
      iconName: PropTypes.string,
      prefix: PropTypes.string,
    }),
    image: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    component: PropTypes.any, // eslint-disable-line
    isDivider: PropTypes.bool,
  };

  static defaultProps = {
    icon: undefined,
    image: undefined,
    text: undefined,
    isDivider: false,
    disabled: false,
    onClick: undefined,
  };

  state = {
    iconColor: COLORS_VALUES[COLORS.DISABLED],
  };

  onHover = () => {
    this.setState({
      iconColor: '#fff',
    });
  };

  render() {
    const { icon, image, text, disabled, component, isDivider } = this.props;
    let { onClick } = this.props;
    const { iconColor } = this.state;
    const isItemClickable = onClick;

    // Add empty arrow function to prevent passing `false` to onClick
    onClick = onClick && !disabled ? onClick : () => {};

    if (isDivider) {
      return <Separator my="4px" />;
    }

    return (
      <ItemStyle
        component={component}
        disabled={disabled}
        isItemClickable={isItemClickable}
        onClick={onClick}
        onKeyDown={onClick}
      >
        {component || (
          <Fragment>
            <ItemText>{text}</ItemText>
            <IconContainer>
              {icon && <FontAwesomeIcon icon={icon} size="sm" color={iconColor} />}
              {image && <img src={image} alt="desc" width="15px" />}
            </IconContainer>
          </Fragment>
        )}
      </ItemStyle>
    );
  }
}

export default Item;
