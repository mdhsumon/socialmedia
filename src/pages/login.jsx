import React from "react";
import { getAccessToken } from "../services/userService";

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pass: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLoginForm = this.handleLoginForm.bind(this)
    }
    handleChange = event => {
        const name = event.target.name
        this.setState({[name]: event.target.value})
    }
    handleLoginForm = event => {
        event.preventDefault()
        getAccessToken(this.state, data => {
            console.log(data)
        })
    }
    render(){
        return(
            <div className="login-page">
                <div className="login-form">
                    <form onSubmit={this.handleLoginForm}>
                        <div className="input user">
                            <input className="input-field" type="text" placeholder="Email/username" name="email" onChange= {this.handleChange} />
                        </div>
                        <div className="input password">
                            <input className="input-field" type="password" placeholder="Password here" name="pass" onChange= {this.handleChange} />
                        </div>
                        <button>Login</button>
                    </form>
                    <div className="new-account">Don't have account? Simply <a href="/signup">signup</a> here.</div>
                </div>
            </div>
        )
    }
}
