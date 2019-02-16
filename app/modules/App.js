// @flow
import * as React from 'react';
import Header from '../shared/Header/Header';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <Header/>
        {children}
      </React.Fragment>
    )
  }
}
