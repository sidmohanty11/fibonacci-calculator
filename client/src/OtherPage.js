import { Component } from 'react';
import { Link } from 'react-router-dom';

class OtherPage extends Component {
    render() {
        return (
            <div>
                I'm Some Other Page!
                <Link to="/">Go back home</Link>
            </div>
        )
    }
}

export default OtherPage;
