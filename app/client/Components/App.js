import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './common/Header';
import Footer from './common/Footer';
import PublicationPage from './publication/PublicationPage';
import PageNotFound from './PageNotFound'

class App extends React.Component {

  state = {
    title: 'Welcome'
  }
  
  componentDidMount() {

  }

  render() {
    const { title } = this.state;

    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/" exact component={PublicationPage} />
          <Route path="/4" component={PageNotFound} />
          <Route component={PageNotFound} />
        </Switch>

        <Footer/>
      </div>
    )
  }
}

export default App
