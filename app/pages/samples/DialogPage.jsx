import React, { Component } from 'react'
import Dialog from '../../components/dialog/Dialog'

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

        <Dialog
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

        <Dialog
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

        <Dialog
          modal
          title='对话框嵌套'
          open={this.state.openDialog3}
          onClose={()=> this.setState({openDialog3: false})}
        >
          <Dialog
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
          onClose={()=> this.setState({openDialog5: false})}
          backgroundColor={"rgba(255, 0, 0, 0.2)"}
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
          onClose={()=> this.setState({openDialog6: false})}
          backgroundColor={"rgba(255, 0, 0, 0.2)"}
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
          onClose={()=> this.setState({openDialog7: false})}
          backgroundColor={"rgba(255, 0, 0, 0.2)"}
          noClose
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
      </div>
    )
  }
}

export default DialogPage
