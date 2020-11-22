import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../theme/colors';
import { FONT_TYPES } from '../../theme/fonts';
import EmptyState from '..';

Enzyme.configure({ adapter: new Adapter() });

const { GREY_LIGHT, BRANDING_ORANGE, BRANDING_GREY } = COLORS;
const { SUPER_TITLE, TITLE, BODY, CAPTION } = FONT_TYPES;

const emptyStateCheckProps = (
  wrapper,
  text = '',
  textCaption = undefined,
  icon = faArrowUp,
  textSize = SUPER_TITLE,
  textCaptionSize = TITLE,
  iconSize = '8x',
  iconColor = GREY_LIGHT,
  textColor = GREY_LIGHT,
  children = undefined,
  spin = false,
) => {
  expect(wrapper.exists()).toBe(true);
  expect(wrapper.props().text).toEqual(text);
  expect(wrapper.props().textCaption).toEqual(textCaption);
  expect(wrapper.props().icon).toEqual(icon);
  expect(wrapper.props().textSize).toEqual(textSize);
  expect(wrapper.props().textCaptionSize).toEqual(textCaptionSize);
  expect(wrapper.props().iconSize).toEqual(iconSize);
  expect(wrapper.props().iconColor).toEqual(iconColor);
  expect(wrapper.props().textColor).toEqual(textColor);
  if (children) {
    expect(wrapper.containsAllMatchingElements([children])).toEqual(true);
  }
  expect(wrapper.props().spin).toEqual(spin);
};

describe('EmptyState component', () => {
  test('renders', () => {
    const wrapper = mount(<EmptyState icon={faArrowUp} />);
    emptyStateCheckProps(wrapper);
  });

  test('EmptyState props change', () => {
    const wrapper = mount(
      <EmptyState icon={faArrowDown}>
        <div>Child</div>
      </EmptyState>,
    );

    wrapper.setProps({
      text: 'HelloHeader',
      textCaption: 'HelloCaption',
      textSize: BODY,
      textCaptionSize: CAPTION,
      iconSize: 'lg',
      iconColor: BRANDING_ORANGE,
      textColor: BRANDING_GREY,
      spin: true,
    });

    emptyStateCheckProps(
      wrapper,
      'HelloHeader',
      'HelloCaption',
      faArrowDown,
      BODY,
      CAPTION,
      'lg',
      BRANDING_ORANGE,
      BRANDING_GREY,
      <div>Child</div>,
      true,
    );
  });
});
