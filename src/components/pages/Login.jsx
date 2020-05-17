import React from "react"
import { Link } from "react-router-dom"
import { getAccessToken } from "../../services/userService"

export class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loginStatus: false,
            formValidation: '',
            buttonLoading: false
        }
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleLoginForm = event => {
        event.preventDefault()
        const formData = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({buttonLoading: true})
        getAccessToken(formData, token => {
            if(token) {
                if(token.status) {
                    // Set local storage data
                    localStorage.setItem('data', JSON.stringify({ id: token._id, accessToken: token.accessToken }))
                    window.location.href = '/feeds'
                }
                else {
                    this.setState({
                        buttonLoading: false,
                        formValidation: "Username or password"
                    })
                }
            }
            else {
                alert("Network error!")
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
                        <button className={this.state.buttonLoading ? "button-loading" : ""}>Login</button>
                    </form>
                    <div className="new-account">Don't have account? Simply <Link to="/signup">signup</Link> here.</div>
                </div>
            </div>
        )
    }
}
