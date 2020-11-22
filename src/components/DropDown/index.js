import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Item from './Item';
import { COLORS, COLORS_VALUES } from '../theme/colors';

const MENU_ALIGNMENT = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const DropDownContainer = styled.div`
  position: relative;
  width: max-content;
`;

const ViewContainer = styled.div`
  display: flex;
  min-height: max-content;
  align-items: center;
  width: max-content;
  cursor: ${props => !props.disabled && 'pointer'};
`;

const IconContainer = styled.div`
  transition: transform 200ms ease-in-out;
  transform: ${props => props.isOpen && 'rotate(180deg)'};
`;

const MenuContainer = styled.ul`
  border-radius: ${props => props.theme.space[1]}px;
  box-shadow: 0 2px 2px rgba(${props => props.theme.colors.greyLight}, 0.3);
  align-items: flex-start;
  background-color: ${props => props.theme.colors.greyMedium};
  border: 1px solid ${props => props.theme.colors.greyLight};
  display: ${props => (props.isOpen ? 'block' : 'none')};
  flex-flow: column;
  justify-content: center;
  list-style: none;
  margin: 0;
  outline: 0;
  overflow-y: auto;
  padding: ${props => props.theme.space[1]}px 0;
  position: absolute;
  right: ${props => props.menuAlignment === MENU_ALIGNMENT.RIGHT && 0};
  left: ${props => props.menuAlignment === MENU_ALIGNMENT.LEFT && 0};
  width: max-content;
  z-index: 10;
`;

class DropDown extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        icon: PropTypes.object,
        text: PropTypes.string,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
        component: PropTypes.any,
        isDivider: PropTypes.bool,
      }),
    ).isRequired,
    onChange: PropTypes.func,
    component: PropTypes.node.isRequired,
    showArrow: PropTypes.bool,
    arrowColor: PropTypes.string,
    disabled: PropTypes.bool,
    menuAlignment: PropTypes.string,
  };

  static defaultProps = {
    showArrow: true,
    arrowColor: COLORS_VALUES[COLORS.WHITE],
    onChange: undefined,
    disabled: false,
    menuAlignment: 'LEFT',
  };

  state = {
    isOpen: false,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.hideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.hideMenu);
  }

  showMenu = () => {
    const { disabled } = this.props;
    this.setState(prevState => ({
      isOpen: !disabled && !prevState.isOpen,
    }));
  };

  hideMenu = event => {
    const { isOpen } = this.state;

    if (this.containerRef && !this.containerRef.contains(event.target) && isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  };

  renderList = () => {
    const { items, onChange } = this.props;
    return items.map((item, index) => (
      <Item
        key={item.text || index}
        icon={item.icon}
        image={item.image}
        text={item.text}
        onClick={item.onClick || onChange}
        disabled={item.disabled}
        component={item.component}
        isDivider={item.isDivider}
      />
    ));
  };

  render() {
    const { component, showArrow, arrowColor, disabled, menuAlignment } = this.props;
    const { isOpen } = this.state;

    return (
      <DropDownContainer
        onClick={this.showMenu}
        ref={div => {
          this.containerRef = div;
        }}
        onKeyDown={() => {}}
      >
        <ViewContainer>
          {component}
          {!disabled && showArrow && (
            <IconContainer isOpen={isOpen}>
              <FontAwesomeIcon icon={faChevronDown} size="xs" color={arrowColor} />{' '}
            </IconContainer>
          )}
        </ViewContainer>
        <MenuContainer isOpen={isOpen} menuAlignment={menuAlignment}>
          {this.renderList()}
        </MenuContainer>
      </DropDownContainer>
    );
  }
}
DropDown.displayName = 'DropDown';

export { MENU_ALIGNMENT };
export default DropDown;
