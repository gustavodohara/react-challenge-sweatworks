import React from 'react'

class App extends React.Component {

  state = {
    title: 'Welcome'
  }
  
  componentDidMount() {

  }

  render() {
    const { title } = this.state

    return (
      <div>
        <h1>{title}</h1>
      </div>
    )
  }
}

export default App
