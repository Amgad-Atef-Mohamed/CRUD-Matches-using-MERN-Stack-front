import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import ScrollToTop from 'react-scroll-up';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from 'components/theme/colors';
import Button from 'components/Buttons';

const { PRIMARY } = COLORS;
const LayoutContainer = styled.div`
  min-height: 100vh;
  width: 100%;
`;

const ContentContainer = styled(Flex)`
  width: 100%;
  background-color: ${props => props.theme.colors.greyMedium};
`;

const FlexContainer = styled(Flex)`
  flex-direction: row-reverse;
  min-height: 100vh;
`;

const Layout = props => {
  const { children } = props;

  return (
    <LayoutContainer>
      <FlexContainer>
        <ScrollToTop showUnder={160}>
          <Button
            z-index={99999}
            ml={1}
            mr={1}
            color={PRIMARY}
            icon={faArrowUp}
            iconWidth="sm"
            xMargin={3}
            isLoading={false}
            reverse
          >
            <div />
          </Button>
        </ScrollToTop>
        <ContentContainer>{children}</ContentContainer>
      </FlexContainer>
    </LayoutContainer>
  );
};

Layout.propTypes = {
  user: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.shape({
      hash: PropTypes.string,
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
};

Layout.defaultProps = {
  user: undefined,
};

export default Layout;
