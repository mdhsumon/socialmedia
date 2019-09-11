import React from "react"
import { Redirect } from "react-router-dom"
import { getAccessToken } from "../services/userService"

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginStatus: false,
            email: '',
            pass: '',
            formValidation: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLoginForm = this.handleLoginForm.bind(this)
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleLoginForm = event => {
        event.preventDefault()
        const formData = {email: this.state.email, pass: this.state.pass}
        getAccessToken(formData, data => {
            if(data.loggedInStatus) {
                //this.setState({loginStatus: true})
                localStorage.setItem('user-token', data.accessToken)
                //console.log('rdirect')
                //return <Redirect to='/' />
                this.props.history.push('/')
            }
            else {
                //this.setState({loginStatus: false})
                this.setState({formValidation: "Login failed!"})
            }
        })
    }
    render(){
        return(
            <div className="login-page">
                <div className="login-form">
                    <form onSubmit={this.handleLoginForm}>
                        <div className="error-message">{this.state.formValidation}</div>
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
