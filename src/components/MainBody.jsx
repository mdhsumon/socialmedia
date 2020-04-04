import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Header } from "./Header"
import { Navigator } from "./Navigator"
import { NewsFeed } from "./pages/NewsFeed"
import { Profile } from "./pages/Profile"
import { ChatBar } from "./chat/ChatBar"

export const MainBody = () => {
  return (
    <div className="body">
        <Header />
        <div className="main-body">
          <Navigator />
          <div className="content-body">
            <Router>
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/feeds" component={NewsFeed} />
            </Router>
          </div> 
          <ChatBar />
        </div>
    </div>
  )
}