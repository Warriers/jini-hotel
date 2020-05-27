import React, { useState, useEffect } from "react"
import ChatBot, { Loading } from "react-simple-chatbot"
import PropTypes from "prop-types"
import TextStep from "./TextStep"
import { ThemeProvider } from "styled-components"

const theme = {
  background: "#f5f8fb",
  fontFamily: "Work Sans",
  headerBgColor: "#28282a",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#dc004e",
  botFontColor: "#fff",
  // userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
}

const customStyle = {
  background: "initial",
  borderRadius: "initial",
  boxShadow: "initial",
  display: "initial",
  justifyContent: "initial",
  margin: "initial",
  padding: "initial",
}

const JiniBot = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{position: "fixed", zIndex: 9999}}>
        <ChatBot
          placeholder={`Enter your query`}
          floating
          headerTitle={`JiniBot`}
          customStyle={customStyle}
          customDelay={0}
          userDelay={0}
          steps={[
            // {
            //   id: "1",
            //   asMessage: true,
            //   component: (<div>
            //     Test
            //   </div>),
            //   trigger: "2",
            // },
            {
              id: "1",
              component: <TextStep />,
              trigger: "2",
            },
            {
              id: "2",
              user: true,
              trigger: "1",
            },
          ]}
        />
      </div>
    </ThemeProvider>
  )
}

export default JiniBot
