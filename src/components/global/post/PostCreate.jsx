import React from "react";

export class PostCreate extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleForm = event => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="post-create">
                <form className="post-create-form" onSubmit={this.handleForm}>
                    <div className="post-create-tab">
                        <div className="tab-item message">Message </div>
                        <div className="tab-item photo">Photo </div>
                        <div className="tab-item video">Video</div>
                    </div>
                    <div className="post-create-body">
                        <textarea name="content" placeholder="Write here what your mind says..." onChange={this.handleChange} />
                    </div>
                    <div className="post-create-actions">
                        <button>Post now</button>
                        <span className="post-visibility">
                            <select name="visibility" onChange={this.handleChange} >
                                <option value="public">p</option>
                                <option value="friends">f</option>
                                <option value="me">m</option>
                            </select>
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}