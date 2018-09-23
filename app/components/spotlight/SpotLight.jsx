import React, { Component } from 'react'
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Dropdown,
  Modal,
  Image,
  Search
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as spotLightActions from '../../actions/spotLight'
import { spotLightSelectors } from 'app/reducers';

const source = [
  {
    title: 'Hilpert, Lockman and Runolfsson',
    description: 'Versatile discrete success',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg',
    price: '$99.81'
  },
  {
    title: 'Treutel Group',
    description: 'Down-sized mobile capacity',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/peachananr/128.jpg',
    price: '$98.29'
  },
  {
    title: 'Rutherford - Rodriguez',
    description: 'Reduced optimizing adapter',
    image:
      'https://s3.amazonaws.com/uifaces/faces/twitter/alecarpentier/128.jpg',
    price: '$34.52'
  },
  {
    title: 'Koelpin, Luettgen and Sporer',
    description: 'Public-key 3rd generation hierarchy',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/designervzm/128.jpg',
    price: '$35.92'
  },
  {
    title: 'Schumm LLC',
    description: 'Self-enabling next generation website',
    image:
      'https://s3.amazonaws.com/uifaces/faces/twitter/sergeyalmone/128.jpg',
    price: '$68.15'
  }
]

class SpotLight extends Component {
  state = {
    open: true
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () =>
    this.setState({ results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        results: _.filter(source, isMatch)
      })
    }, 300)
  }

  handleClose = () => this.props.spotLightHide()

  render() {
    const { isLoading, value, results } = this.state
    const { open } = this.props
    return (
      <Modal
        open={open}
        closeOnEscape
        onClose={this.handleClose}
        closeOnDimmerClick
        size='tiny'
      >
        <Modal.Header>快速跳转</Modal.Header>
        <Modal.Content>
          <Search
            autoFocus
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
          />
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(state => ({
  open: spotLightSelectors.getSpotLightShow(state)
}), {...spotLightActions})(SpotLight)
