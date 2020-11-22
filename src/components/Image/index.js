import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  width,
  space,
  height,
  minHeight,
  minWidth,
  maxHeight,
  maxWidth,
  borderRadius,
} from 'styled-system';
import { Flex } from '@rebass/grid';
import Text from '../Text';
import { COLORS } from '../theme/colors';

const StyledImage = styled.img`
  ${width};
  ${height};
  ${space};
  ${minHeight};
  ${minWidth};
  ${maxHeight};
  ${maxWidth};
  ${borderRadius};

  object-fit: ${props => props.objectFit};
`;

const TextContainer = styled(Flex)`
  border-radius: 50%;
  width: ${props => props.radius}px;
  min-width: ${props => props.radius}px;
  height: ${props => props.radius}px;
  min-height: ${props => props.radius}px;
`;

const DisplayText = styled(Text)`
  font-size: ${props => props.fontSize}px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  ${space};
`;

class Image extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    name: PropTypes.string,
    radius: PropTypes.number,
    textColor: PropTypes.string,
    bgColor: PropTypes.string,
    borderRadiusProp: PropTypes.string,
    objectFit: PropTypes.string,
  };

  static defaultProps = {
    src: undefined,
    alt: undefined,
    name: '',
    radius: 40,
    textColor: COLORS.PRIMARY_BLUE,
    bgColor: COLORS.DISPLAY_NAME_BACKGROUND,
    borderRadiusProp: '50%',
    objectFit: 'cover',
  };

  constructor(props) {
    super(props);

    const { src } = props;

    this.state = {
      showImage: src,
      src,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.src !== state.src) {
      return {
        showImage: props.src,
        src: props.src,
      };
    }

    return null;
  };

  onError = () => {
    this.setState({
      showImage: false,
    });
  };

  render() {
    const {
      name,
      alt,
      radius,
      textColor,
      bgColor,
      objectFit,
      borderRadiusProp,
      ...filteredProps
    } = this.props;
    const { showImage, src } = this.state;
    let matches = [];
    let displayName;
    const fontSize = (radius / 2.5).toFixed();

    if (!showImage && name) {
      matches = name.match(/\b(\w)/g);
      if (matches) {
        if (matches.length === 1) {
          displayName = `${matches[0]}`;
        } else {
          displayName = `${matches[0]}${matches[1]}`;
        }
      }
    }

    return (
      <React.Fragment>
        <img src={src} onError={this.onError} style={{ display: 'none' }} alt="none" />
        {showImage ? (
          <StyledImage
            alt={alt || name}
            src={src}
            width={radius}
            height={radius}
            minWidth={radius}
            minHeight={radius}
            maxWidth={radius}
            maxHeight={radius}
            borderRadius={borderRadiusProp}
            objectFit={objectFit}
            {...filteredProps}
          />
        ) : (
          <TextContainer
            radius={radius}
            bg={bgColor}
            justifyContent="center"
            alignItems="center"
            {...filteredProps}
          >
            <DisplayText fontSize={fontSize} color={textColor}>
              {displayName}
            </DisplayText>
          </TextContainer>
        )}
      </React.Fragment>
    );
  }
}

export default Image;
