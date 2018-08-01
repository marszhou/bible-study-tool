import React, { Component } from 'react'
import Dialog from '../../components/dialog/Dialog'

class DialogPage extends Component {
  state = {
    openDialog1: false,
    openDialog2: true,
    openDialog3: false,
    openDialog4: false,
    openDialog8: false,
    chosen: ''
  }

  handleClose = e => {
    console.log(e)
  }

  render() {
    return (
      <div>
        <dialog ref={el => (this.dialog = el)} onClose={this.handleClose}>
          111<button onClick={() => this.dialog.close()}>close</button>
        </dialog>
        <button onClick={() => this.dialog.showModal()}>open</button>

        <Dialog
          title="Light or darkness"
          content="Which side you will choose?"
          open={this.state.openDialog1}
          onClose={() => this.setState({ openDialog1: false })}
          x={50}
          backgroundColor={'rgba(255, 0, 0, 0.2)'}
        />
        <button
          onClick={() =>
            this.setState({
              openDialog1: true
            })
          }
        >
          show modal message dialog
        </button>

        <Dialog
          modal={false}
          title="Light or darkness"
          content="Which side you will choose?"
          open={this.state.openDialog2}
          width={600}
          height={600}
          onClose={() => this.setState({ openDialog2: false })}
        />
        <button
          onClick={() =>
            this.setState({
              openDialog2: true
            })
          }
        >
          show message dialog
        </button>

        <Dialog
          modal
          title="对话框嵌套"
          open={this.state.openDialog3}
          onClose={() => this.setState({ openDialog3: false })}
        >
          <Dialog
            modal
            y={400}
            title="Light or darkness"
            content="Which side you will choose?"
            open={this.state.openDialog4}
            onClose={() => this.setState({ openDialog4: false })}
          />
          <button
            onClick={() =>
              this.setState({
                openDialog4: true
              })
            }
          >
            show message dialog
          </button>
        </Dialog>
        <button
          onClick={() =>
            this.setState({
              openDialog3: true
            })
          }
        >
          show message dialog3
        </button>

        <Dialog
          content="Which side you will choose?"
          open={this.state.openDialog5}
          onClose={() => this.setState({ openDialog5: false })}
          backgroundColor={'rgba(255, 0, 0, 0.2)'}
        />
        <button
          onClick={() =>
            this.setState({
              openDialog5: true
            })
          }
        >
          dialog without title
        </button>

        <Dialog
          title="Light or darkness"
          content="Which side you will choose?"
          open={this.state.openDialog6}
          onClose={() => this.setState({ openDialog6: false })}
          backgroundColor={'rgba(255, 0, 0, 0.2)'}
          noButton
        />
        <button
          onClick={() =>
            this.setState({
              openDialog6: true
            })
          }
        >
          dialog without button
        </button>

        <Dialog
          title="Light or darkness"
          content="Which side you will choose?"
          open={this.state.openDialog7}
          onClose={({ btn }) => {
            const state = { openDialog7: false }
            if (btn) {
              state.openDialog8 = true
              state.chosen = btn
            }
            this.setState(state)
          }}
          backgroundColor={'rgba(255, 0, 0, 0.2)'}
          noClose
          closeButtons={['光明']}
          cancelButtons={['黑暗']}
        />
        <button
          onClick={() =>
            this.setState({
              openDialog7: true
            })
          }
        >
          dialog without close
        </button>

        <Dialog
          title="你选择了"
          open={this.state.openDialog8}
          onClose={() => this.setState({ openDialog8: false })}
          backgroundColor={'rgba(255, 0, 0, 0.2)'}
          noClose
          cancelButtons={[]}
        >
          <h1>{this.state.chosen}</h1>
        </Dialog>

        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>


        <Dialog
          title="Light or darkness"
          content="Which side you will choose?"
          open={this.state.openDialog9}
          onClose={({ btn }) => {
            const state = { openDialog9: false }
            this.setState(state)
          }}
          backgroundColor={'rgba(255, 0, 0, 0.2)'}
          noClose
          closeButtons={['光明']}
          cancelButtons={['黑暗']}
          closeWhenClickOutside={false}
        />
        <button
          onClick={() =>
            this.setState({
              openDialog9: true
            })
          }
        >
          disallow click outside
        </button>
      </div>
    )
  }
}

export default DialogPage
