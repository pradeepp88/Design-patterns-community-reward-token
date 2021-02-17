import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class Points extends Component {
    
    state = { 
        username: "",
        points: null
     }

    render() { 
        return ( 
            <>
            <p>Hey {this.props.location.state.user.username}, Your Balance is {this.props.location.state.user.points}</p>
            </>
         );
    }
}
 
export default withRouter(Points);