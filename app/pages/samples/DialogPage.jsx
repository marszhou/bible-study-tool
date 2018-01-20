import React, { Component } from 'react'
import MessageDialog from '../../components/dialog/MessageDialog'

class DialogPage extends Component {
  state = {
    openDialog1: false,
    openDialog2: true,
    openDialog3: false,
    openDialog4: false
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

        <MessageDialog
          title="Light or darkness"
          content="Which side you will choose?"
          open={this.state.openDialog1}
          onClose={()=> this.setState({openDialog1: false})}
          x={50}
          backgroundColor={"rgba(255, 0, 0, 0.2)"}
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

        <MessageDialog
          modal={false}
          title="Light or darkness"
          content="Which side you will choose?"
          open={this.state.openDialog2}
          width={600}
          height={600}
          onClose={()=> this.setState({openDialog2: false})}
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

        <MessageDialog
          modal
          title='对话框嵌套'
          open={this.state.openDialog3}
          onClose={()=> this.setState({openDialog3: false})}
        >
          <MessageDialog
            modal
            y={400}
            title="Light or darkness"
            content="Which side you will choose?"
            open={this.state.openDialog4}
            onClose={()=> this.setState({openDialog4: false})}
          />
          <button
            onClick={() =>
              this.setState({
                openDialog4: true,
              })
            }
          >
            show message dialog
          </button>
        </MessageDialog>
        <button
          onClick={() =>
            this.setState({
              openDialog3: true
            })
          }
        >
          show message dialog3
        </button>
      </div>
    )
  }
}

export default DialogPage
