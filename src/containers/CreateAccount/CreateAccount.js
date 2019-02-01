import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewUser } from '../../helpers/requests';
import { updateError } from '../../actions';

class CreateAccount extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            accountCreated: false
        }
    }

    handleChange = (e) => {
        let { name, value} = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        // check to make sure state has a name, email, and password
        this.props.updateError('');
        let user = this.state;
        try {
            await createNewUser(user);
            this.setState({
                name: '',
                email: '',
                password: '',
                accountCreated: true
            });
        } catch(error) {
            this.props.updateError(error.message)
        }
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input name='name' value={this.state.name} id='name' onChange={this.handleChange}/>
                <label htmlFor='email'>E-mail</label>
                <input name='email' value={this.state.email} id='email' onChange={this.handleChange}/>
                <label htmlFor='password'>Password</label>
                <input name='password' value={this.state.password} id='password' onChange={this.handleChange}/>
                { (this.props.errorStatus !== '') && <p>{this.props.errorStatus}</p>}
                <button>Create Account</button>
            </form>
        )
    }
}

export const mapStateToProps = (state) => ({
    errorStatus: state.errorStatus
});

export const mapDispatchToProps = (dispatch) => ({
    updateError: (message) => dispatch(updateError(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);