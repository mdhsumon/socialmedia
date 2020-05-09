import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from "./Header"
import { Navigator } from "./Navigator"
import { PostFeed } from "./pages/PostFeed"
import Profile from "./pages/Profile"
import PublicProfile from "./pages/PublicProfile"
import { ChatBar } from "./chat/ChatBar"

export const MainApp = () => {

  const bodyMargin = () => {
    const contentWith = 1200 // document.getElementsByClassName("main-body")[0].offsetWidth
    return (window.innerWidth - contentWith) / 2
  }

  const [margin, setMargin] = React.useState(bodyMargin())

  window.addEventListener('resize', () => { setMargin(bodyMargin()) })

  return (
    <div className="body">
        <Header />
        <div className="main-body" style={{ marginLeft: margin }}>
          <Navigator />
          <div className="content-body">
            <Router>
              <Route path="/user/:username" component={PublicProfile} />
              <Route path="/profile" component={Profile} />
              <Route path="/feeds" component={PostFeed} />
            </Router>
          </div> 
          <ChatBar />
        </div>
    </div>
  )
}