import React from "react"
import { Header } from "./components/Header"
import { Navigator } from "./components/Navigator"
import { MainBody } from "./components/MainBody"
import { ChatBar } from "./components/chat/ChatBar"

export const MainApp = () => {
  return (
    <div className="body">
        <Header />
        <div className="main-body">
          <Navigator />
          <div className="content-body">
            <MainBody />
          </div> 
          <ChatBar />
        </div>
    </div>
  )
}
