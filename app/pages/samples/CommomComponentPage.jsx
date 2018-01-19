import React, { Component } from 'react'
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Segment,
  Divider,
  Loader,
  Step,
  Breadcrumb,
  Dropdown,
  Menu,
  Popup,
  Grid
} from 'semantic-ui-react'

class CommomComponentPage extends Component {
  state = {}

  handleOpen = () => this.setState({ active: true })
  handleClose = () => this.setState({ active: false })

  renderPageDimmer() {
    const { active } = this.state

    return (
      <div>
        <Button
          content="Show"
          icon="plus"
          labelPosition="left"
          onClick={this.handleOpen}
        />

        <Dimmer active={active} onClickOutside={this.handleClose} page blurring>
          <Header as="h2" icon inverted>
            <Icon name="heart" />
            Dimmed Message!
            <Header.Subheader>Dimmer sub-header</Header.Subheader>
          </Header>
        </Dimmer>
      </div>
    )
  }
  renderLoadingButton() {
    return (
      <div>
        <Button loading>Loading</Button>
        <Button basic loading>
          Loading
        </Button>
        <Button loading primary>
          Loading
        </Button>
        <Button loading secondary>
          Loading
        </Button>
      </div>
    )
  }

  renderDivider() {
    return (
      <Segment padded>
        <Button primary fluid>
          Login
        </Button>
        <Divider horizontal>Or</Divider>
        <Button secondary fluid>
          Sign Up Now
        </Button>
      </Segment>
    )
  }

  renderLoader() {
    return <Loader active inline />
  }

  renderStep() {
    return (
      <Step.Group ordered>
        <Step completed>
          <Step.Content>
            <Step.Title>Shipping</Step.Title>
            <Step.Description>Choose your shipping options</Step.Description>
          </Step.Content>
        </Step>

        <Step completed>
          <Step.Content>
            <Step.Title>Billing</Step.Title>
            <Step.Description>Enter billing information</Step.Description>
          </Step.Content>
        </Step>

        <Step active>
          <Step.Content>
            <Step.Title>Confirm Order</Step.Title>
          </Step.Content>
        </Step>
      </Step.Group>
    )
  }

  renderBreadcrumb() {
    return (
      <Segment>
        <Breadcrumb>
          <Breadcrumb.Section link>首页</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section link>马太福音</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>第一章</Breadcrumb.Section>
        </Breadcrumb>
      </Segment>
    )
  }

  renderMenu() {
    return (
      <div>
        <Menu attached="top">
          <Dropdown item icon="wrench" simple>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Icon name="dropdown" />
                <span className="text">New</span>

                <Dropdown.Menu>
                  <Dropdown.Item>Document</Dropdown.Item>
                  <Dropdown.Item>Image</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>Open</Dropdown.Item>
              <Dropdown.Item>Save...</Dropdown.Item>
              <Dropdown.Item>Edit Permissions</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Export</Dropdown.Header>
              <Dropdown.Item>Share</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Menu position="right">
            <div className="ui right aligned category search item">
              <div className="ui transparent icon input">
                <input
                  className="prompt"
                  type="text"
                  placeholder="Search animals..."
                />
                <i className="search link icon" />
              </div>
              <div className="results" />
            </div>
          </Menu.Menu>
        </Menu>

        <Segment attached="bottom">
          <img src="/assets/images/wireframe/paragraph.png" alt="" />
        </Segment>
      </div>
    )
  }

  renderSimpleDropdown() {
    const languageOptions = [
      { text: '中文', value: 'zh-cn' },
      { text: '英文', value: 'en-us' }
    ]
    return (
      <Dropdown
        button
        className="icon"
        floating
        labeled
        icon="world"
        options={languageOptions}
        search
        text="Select Language"
      />
    )
  }

  renderPopup() {
    return (
      <Popup trigger={<Button>Show flowing popup</Button>} flowing hoverable>
        <Grid centered divided columns={3}>
          <Grid.Column textAlign="center">
            <Header as="h4">Basic Plan</Header>
            <p>
              <b>2</b> projects, $10 a month
            </p>
            <Button>Choose</Button>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Header as="h4">Business Plan</Header>
            <p>
              <b>5</b> projects, $20 a month
            </p>
            <Button>Choose</Button>
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Header as="h4">Premium Plan</Header>
            <p>
              <b>8</b> projects, $25 a month
            </p>
            <Button>Choose</Button>
          </Grid.Column>
        </Grid>
      </Popup>
    )
  }

  renderLongContent() {
    return (
      <div>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
        <p>hello</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderPageDimmer()}
        {this.renderLoadingButton()}
        {this.renderDivider()}
        {this.renderLoader()}
        {this.renderStep()}
        {this.renderBreadcrumb()}
        {this.renderMenu()}
        {this.renderSimpleDropdown()}
        {this.renderPopup()}
        {this.renderLongContent()}
      </div>
    )
  }
}

export default CommomComponentPage
