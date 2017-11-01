import { React, PropTypes, cx } from "app/bootstrap"; // eslint-disable-line
import Md3dRotation from '../vendors/react-icons/lib/md/3d-rotation';

class IconPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (<div><Md3dRotation size={24} color='tomato' /></div>)
  }
}

export default IconPage;
