import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { createGlobalStyle } from 'styled-components';
import ROUTES from 'routes';
import Layout from 'components/Layout';
import Splash from 'components/Splash';
import Loading from 'components/Loading';
import Logo from 'static/images/logo.png';
import { englishFont, arabicFont } from '../static/fonts';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: english-font;
    src: url(${englishFont});
  }
  @font-face {
    font-family: arabic-font;
    src: url(${arabicFont});
  }

  input, textarea, select, button {
    font-family: 'english-font';

    :lang(ar) {
      font-family: 'arabic-font';
    }
  }

  body {
    font-family: 'english-font';
    background-color: ${props => props.theme.colors.greyDark};
    margin: 0;

    :lang(ar) {
      font-family: 'arabic-font';
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid ${props => props.theme.colors.greyDark};
    -webkit-text-fill-color: ${props => props.theme.colors.brandingOrange};
    -webkit-box-shadow: 0 0 0px 1000px ${props => props.theme.colors.greyLight} inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  textarea {
    resize: none;
  }
`;

const RequestsContainer = Loadable({
  loader: () => import('./Matches'),
  loading: Loading,
});

class App extends Component {
  static propTypes = {
    history: PropTypes.shape({}).isRequired,
    user: PropTypes.shape({}),
  };

  static defaultProps = {
    user: undefined,
  };

  state = {
    isLoading: false,
  };

  render() {
    const { history } = this.props;
    const { isLoading } = this.state;
    const { REQUESTS } = ROUTES;

    let content;

    if (isLoading) {
      content = <Splash logoUrl={Logo} />;
    } else {
      content = (
        <Layout history={history}>
          <Switch>
            <Route exact path={REQUESTS} component={RequestsContainer} />
            <Redirect to={REQUESTS} />
          </Switch>
        </Layout>
      );
    }
    return (
      <>
        <GlobalStyle />
        {content}
      </>
    );
  }
}

export default App;
