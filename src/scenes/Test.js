import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Test extends Component {
  _handleClick = () => {
    this.props.dispatch({
      type: 'TEST_SAGA'
    })
  }

  render () {
    return (
      <div>
        <button onClick={this._handleClick} type='button'><i className='material-icons'>face</i> Click</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

// const mapDispatchToProps = {};

export default connect(mapStateToProps)(Test)
