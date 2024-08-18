import React from "react"
import { Link } from "react-router-dom"
import { isUserExist, userRegister } from "../../services/userService"

export class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            fullNameMessage: '',
            fullNameHtmlClass: '',

            gender: '',
            genderMessage: '',

            username: '',
            usernameMessage: '',
            usernameHtmlClass: '',
            usernameChecking: false,

            email: '',
            emailMessage: '',
            emailHtmlClass: '',
            emailChecking: false,

            password: '',
            confirmPassword: '',
            passwordMessage: '',
            passwordHtmlClass: '',

            confirmPasswordMessage: '',
            confirmPasswordHtmlClass: '',

            formValidation: false,
            validationMessage: '',

            isWelcomeScreen: false,
            counter: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = event => {
        const currentValue = event.target.value,
        currentLength = currentValue.length,
        inputSuccessClass = "input-success",
        inputErrorClass = "input-error"
        switch(event.target.name){
            case "gender":
                this.setState({
                    gender: event.target.value
                })
                break

            case "fullName":
                const fullNameRegex = /[a-zA-Z]/
                if(currentLength <= 0 && event.type === 'blur') {
                    this.setState({
                        fullNameMessage: "Name is required",
                        fullNameHtmlClass: inputErrorClass
                    })
                }
                else if(currentLength > 0 && !fullNameRegex.test(currentValue)) {
                    this.setState({
                        fullNameMessage: "Name must be in A-Z or a-z",
                        fullNameHtmlClass: inputErrorClass
                    }) 
                }
                else {
                    this.setState({
                        fullNameMessage: "",
                        [event.target.name]: event.target.value
                    })
                }
                break

            case "username":
                const minUserLength = 5, maxUserLength = 20, userRegex = /^[a-z](?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+([a-z0-9])$/
                if(currentLength > 0 && currentLength < minUserLength && event.type === 'blur') {
                    this.setState({
                        usernameMessage: `Minimum ${minUserLength} characters required`,
                        usernameHtmlClass: inputErrorClass
                    })
                }
                else if(currentLength > 0 && !userRegex.test(currentValue)) {
                    this.setState({
                        usernameMessage: "Invalid username: Only a-z, 0-9, _, and . are allowed",
                        usernameHtmlClass: inputErrorClass
                    })
                }
                else if(currentLength > maxUserLength) {
                    this.setState({
                        usernameMessage: `Maximum ${maxUserLength} characters allowed`,
                        usernameHtmlClass: inputErrorClass
                    })
                }
                else if(currentLength >= minUserLength && event.type === 'blur') {
                    this.setState({
                        usernameChecking: true
                    })
                    isUserExist("username", currentValue, userRespose => {
                        this.setState({ usernameChecking: false })
                        if(userRespose) {
                            this.setState({
                                usernameChecking: false,
                                usernameMessage: "Username already exist",
                                usernameHtmlClass: inputErrorClass
                            })
                        }
                        else {
                            this.setState({
                                usernameMessage: "Username available!",
                                usernameHtmlClass: inputSuccessClass,
                                username: currentValue
                            }) 
                        }
                    })
                }
                else if(currentLength > 0) {
                    this.setState({
                        usernameMessage: ""
                    })
                }
                break

            case "email":
                    const emailRegex = /[\w-]+@([\w-]+\.)+[\w-]+/
                    if(currentLength < 1 && event.type === 'blur') {
                        this.setState({
                            emailMessage: "This field is required",
                            emailHtmlClass: inputErrorClass
                        })
                    }
                    else if(currentLength > 0 && !emailRegex.test(currentValue)) {
                        this.setState({
                            emailMessage: "Invalid email",
                            emailHtmlClass: inputErrorClass
                        })
                    }
                    else if(emailRegex.test(currentValue) && event.type === 'blur') {
                        this.setState({
                            emailChecking: true
                        })
                        isUserExist("email", currentValue, emailRespose => {
                            this.setState({ emailChecking: false })
                            if(emailRespose) {
                                this.setState({
                                    emailChecking: false,
                                    emailMessage: "Email already exist",
                                    emailHtmlClass: inputErrorClass
                                })
                            }
                            else {
                                this.setState({
                                    emailMessage: "Email available!",
                                    emailHtmlClass: inputSuccessClass,
                                    email: currentValue
                                }) 
                            }
                        })
                    }
                    else if(currentLength > 0) {
                        this.setState({
                            emailMessage: ""
                        })
                    }
                break

            case "password":
                const minPassLength = 6, maxPassLength = 20
                if(currentLength > 0 && currentLength < minPassLength && event.type === 'blur') {
                    this.setState({
                        passwordMessage: `Minimum ${minPassLength} characters required`,
                        passwordHtmlClass: inputErrorClass
                    })
                }
                else if(currentLength > maxPassLength) {
                    this.setState({
                        passwordMessage: `Maximum ${maxPassLength} characters allowed`,
                        passwordHtmlClass: inputErrorClass
                    })
                }
                else if(currentLength >= minPassLength) {
                    this.setState({
                        passwordMessage: "",
                        password: currentValue
                    })
                }
                break

            case "confirmPassword":
                if(this.state.password !== currentValue) {
                    this.setState({
                        confirmPasswordMessage: "Password did't match!",
                        confirmPasswordHtmlClass: inputErrorClass
                    })
                }
                else {
                    this.setState({
                        confirmPasswordMessage: "Password matched",
                        confirmPasswordHtmlClass: inputSuccessClass,
                        confirmPassword: currentValue
                    })
                }
                break

            default:
        }
    }

    userLoader = () => {
        if(this.state.usernameChecking)
        return <span className="loader-sm"></span>
    }

    emailLoader = () => {
        if(this.state.emailChecking)
        return <span className="loader-sm"></span>
    }

    handleSubmit = event => {
        event.preventDefault()
        const formData = {
           displayName: this.state.fullName,
           gender: this.state.gender,
           username: this.state.username,
           userEmail: this.state.email,
           userPass: this.state.password,
        }
        for(let data in formData) {
            if(formData[data] === "") {
                this.setState({formValidation: false})
                break
            }
            else {
                this.setState({
                    formValidation: true
                })
            }
        }
        if(this.formValidation || true) {
            userRegister(formData, response => {
                if(response.status) {
                    this.setState({ isWelcomeScreen: true })
                    let count = this.state.counter
                    setInterval(() => {
                        count <= 5 ? this.setState({ counter: count }) : window.location.href = '/login'
                        count++
                    }, 1000)
                }
            })
        }
        else {
            this.setState({
                validationMessage: "All fields are required"
            })
        }
    }

    render() {
        return(
            <div className="signup-page">
                <div className="signup-form">
                    <form onSubmit={this.handleSubmit}>
                        {this.validationMessage && (
                            <div className="validation-message">{this.state.validationMessage}</div>
                        )}
                        <div className="input">
                            {this.state.fullNameMessage !== "" && (
                                <div className={this.state.fullNameHtmlClass}>{this.state.fullNameMessage}</div>
                            )}
                            <input className="input-field" type="text" placeholder="Full name" name="fullName" onChange={this.handleChange} onBlur={this.handleChange} />
                        </div>
                        <div className="input">
                            <div className="error">{this.state.genderMessage}</div>
                            <div className="input-box-inline">
                                <div className="input-box radio">
                                    <input id="male" type="radio" value="male" name="gender" onChange={this.handleChange} />
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div className="input-box radio">
                                    <input id="female" type="radio" value="female" name="gender" onChange={this.handleChange} />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>
                        <div className="input username">
                            {this.state.usernameMessage !== "" && (
                                <div className={this.state.usernameHtmlClass}>{this.state.usernameMessage}</div>
                            )}
                            <input className="input-field" type="text" placeholder="Username" name="username" onChange={this.handleChange} onBlur={this.handleChange} />
                            {this.userLoader()}
                        </div>
                        <div className="input email">
                            {this.state.emailMessage !== "" && (
                                <div className={this.state.emailHtmlClass}>{this.state.emailMessage}</div>
                            )}
                            <input className="input-field" type="text" placeholder="Email" name="email" onChange={this.handleChange} onBlur={this.handleChange} />
                            {this.emailLoader()}
                        </div>
                        <div className="input">
                            {this.state.passwordMessage !== "" && (
                                <div className={this.state.passwordHtmlClass}>{this.state.passwordMessage}</div>
                            )}
                            <input className="input-field" type="password" placeholder="Password" name="password" onChange={this.handleChange} onBlur={this.handleChange} />
                        </div>
                        <div className="input">
                            {this.state.confirmPasswordMessage !== "" && (
                                <div className={this.state.confirmPasswordHtmlClass}>{this.state.confirmPasswordMessage}</div>
                            )}
                            <input className="input-field" type="password" placeholder="Confirm password" name="confirmPassword" onChange={this.handleChange} onBlur={this.handleChange} />
                        </div>
                        <button>Signup</button>
                    </form>
                    <div className="new-account">Already have an account? <Link to="/login">login</Link> here.</div>
                </div>
                {this.state.isWelcomeScreen && (
                    <div className="welcome-section">
                        <div className="welcome-message">Your registration was sucessfull!
                            <span>Welcome to social family.</span>
                            <span className="counter">{this.state.counter}</span>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
