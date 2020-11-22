import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLORS, COLORS_VALUES } from 'components/theme/colors';

const Element = styled('div')`
  padding: ${props => props.theme.space[2]}px;
  color: ${COLORS_VALUES[COLORS.DISABLED]};
  font-size: 14px;
  background-color: ${COLORS_VALUES[COLORS.GREY_LIGHT]};
  border: 1px solid ${COLORS_VALUES[COLORS.GREY_DARK]};
  border-radius: ${props => props.theme.space[1]}px;
  outline: none;
  min-height: 150px
  max-height: 1000px;
  overflow-y: auto;

  &:empty {
    &:before {
      content: attr(placeholder);
      display: block; /* For Firefox */
      color: ${COLORS_VALUES[COLORS.PLACEHOLDER_GREY]};
    }
  }

  &:lang(ar) {
    text-align: right;
  }
`;

class ContentEditable extends Component {
  constructor(props) {
    super(props);

    this.elem = createRef();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.elem.current.innerText;
  }

  componentDidUpdate() {
    const { html } = this.props;

    if (html !== this.elem.current.innerText) {
      this.elem.current.innerText = html;
    }
  }

  onChange = e => {
    const { onChange } = this.props;
    const value = this.elem.current.innerText;

    if (onChange) {
      onChange(e, value);
    }
  };

  onPaste = e => {
    const { onPaste } = this.props;

    e.preventDefault();

    const text = e.clipboardData.getData('text');

    document.execCommand('insertText', false, text);

    if (onPaste) {
      onPaste(e);
    }
  };

  render() {
    const { html, editable, placeholder } = this.props;

    return (
      <Element
        ref={this.elem}
        dangerouslySetInnerHTML={{ __html: html }}
        contentEditable={editable}
        onInput={this.onChange}
        onPaste={this.onPaste}
        placeholder={placeholder}
      />
    );
  }
}
ContentEditable.displayName = 'ContentEditable';

ContentEditable.propTypes = {
  html: PropTypes.node,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  onPaste: PropTypes.func,
  placeholder: PropTypes.string,
};

ContentEditable.defaultProps = {
  html: undefined,
  editable: true,
  onChange: () => {},
  onPaste: () => {},
  placeholder: 'اضف تعليق',
};

export default ContentEditable;
