import React from "react"
import { Link } from "react-router-dom"
import { getAccessToken, getUserSummery } from "../../services/userService"

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
        const formData = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({buttonLoading: true})
        getAccessToken(formData, data => {
            if(data) {
                if(data.loggedIn) {
                    getUserSummery(this.state.username, userData => {
                        localStorage.setItem('userData', JSON.stringify({
                            userInfo: userData,
                            userToken: data.accessToken
                        }))
                        //this.props.history.push('/feeds')
                        window.location.href = '/feeds'
                    })
                }
                else {
                    this.setState({
                        buttonLoading: false,
                        formValidation: "Login failed!"
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
