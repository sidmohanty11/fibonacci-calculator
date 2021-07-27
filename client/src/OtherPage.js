import { Component } from 'inferno';
import { Link } from 'inferno-router';

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
