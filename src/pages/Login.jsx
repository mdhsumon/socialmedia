import React from "react";
import {Link} from "react-router-dom";
import { getAccessToken, getUserInfo } from "../services/userService";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginStatus: false,
            formValidation: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginForm = this.handleLoginForm.bind(this);
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleLoginForm = event => {
        event.preventDefault();
        const formData = {
            username: this.state.username,
            password: this.state.password
        }
        getAccessToken(formData, data => {
            if(data.loggedInStatus) {
                getUserInfo(this.state.username, data.accessToken, userData => {
                    localStorage.setItem('userInfo', JSON.stringify(userData));
                });
                localStorage.setItem('userToken', data.accessToken);
                this.props.history.push('/');
            }
            else {
                this.setState({formValidation: "Login failed!"});
            }
        })
    }
    render() {
        return(
            <div className="login-page">
                <div className="login-form">
                    <form onSubmit={this.handleLoginForm}>
                        <div className="error-message">{this.state.formValidation}</div>
                        <div className="input user">
                            <input className="input-field" type="text" placeholder="Username" name="username" onChange={this.handleChange} />
                        </div>
                        <div className="input password">
                            <input className="input-field" type="password" placeholder="Password here" name="password" onChange={this.handleChange} />
                        </div>
                        <button>Login</button>
                    </form>
                    <div className="new-account">Don't have account? Simply <Link to="/signup">signup</Link> here.</div>
                </div>
            </div>
        )
    }
}
