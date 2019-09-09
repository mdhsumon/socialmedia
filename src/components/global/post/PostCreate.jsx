import React from "react";

export class PostCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: ''
        }
    }

    handleForm = event => {
        event.preventDefault()
        console.log(this.props)
    }

    render() {
        return (
            <div className="post-create">
                <form action="" className="post-create-form" onSubmit={this.handleForm}>
                    <div className="post-create-tab">
                        <div className="tab-item message">Message </div>
                        <div className="tab-item photo">Photo </div>
                        <div className="tab-item video">Video</div>
                    </div>
                    <div className="post-create-body">
                        <textarea name="" placeholder="Write here what your mind says..." />
                    </div>
                    <div className="post-create-actions">
                        <button>Post now</button>
                        <span className="post-visibility">p</span>
                    </div>
                </form>
            </div>
        )
    }
}