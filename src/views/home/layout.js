import React from 'react'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('componentDidMount', "HOMESCREEN")
  }

  render() {
    return (
      <div></div>
    )
  }
}
export default HomeScreen
