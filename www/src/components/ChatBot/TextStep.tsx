import React, { Component, useState, useEffect } from "react"
import PropTypes from "prop-types"
import Bubble from "./Bubble"
import Image from "./Image"
import ImageContainer from "./ImageContainer"
import { Loading } from "react-simple-chatbot"
import TextStepContainer from "./TextStepContainer"

const TextStep = (props) => {
  // console.log(props)
  const [result, setResult] = useState()

  useEffect(() => {
    fetch(
      `http://localhost:5000/ask/restaurant/${
        props.previousStep.value !== undefined ? props.previousStep.value : "Hi"
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        // console.log(data.reply)
        setResult(data.reply)
      })
      .catch((error) => console.error)
  }, [])

  useEffect(() => {
    if (result) {
      props.triggerNextStep({ trigger: props.step.trigger, value: result })
    }
  }, [result])

  // useEffect(() => {
  //   const { delay } = props

  //   setTimeout(() => {
  //     setLoading(false)
  //   }, delay)
  // }, [loading])

  // useEffect(() => {
  //   const { step, triggerNextStep } = props

  //   if (!step.rendered) {
  //     triggerNextStep()
  //   }
  // })

  // componentDidMount() {
  //   const { step, speak, previousValue, triggerNextStep } = this.props
  //   const { component, delay, waitAction } = step
  //   const isComponentWatingUser = component && waitAction

  //   setTimeout(() => {
  //     this.setState({ loading: false }, () => {
  //       if (!isComponentWatingUser && !step.rendered) {
  //         triggerNextStep()
  //       }
  //       speak(step, previousValue)
  //     })
  //   }, delay)
  // }

  const renderMessage = () => {
    const {
      previousStep: { value: previousValue },
      step,
    } = props
    const { message } = step
    if (message) return message
    return previousValue
    // return message ? message.replace(/{previousValue}/g, previousValue) : ""
  }

  const {
    isFirst,
    isLast,
    avatarStyle,
    bubbleStyle,
    hideBotAvatar,
    hideUserAvatar,
    user,
    userAvatar,
    botAvatar,
  } = props

  const showAvatar = user ? !hideUserAvatar : !hideBotAvatar
  const avatar = user ? userAvatar : botAvatar

  if (!result) return null

  return (
    <TextStepContainer
      className={`rsc-ts ${user ? "rsc-ts-user" : "rsc-ts-bot"}`}
      user={user}
    >
      <ImageContainer className="rsc-ts-image-container" user={user}>
        {isFirst && showAvatar && (
          <Image
            className="rsc-ts-image"
            style={avatarStyle}
            showAvatar={showAvatar}
            user={user}
            src={avatar}
            alt="avatar"
          />
        )}
      </ImageContainer>
      <Bubble
        className="rsc-ts-bubble"
        style={bubbleStyle}
        user={user}
        showAvatar={showAvatar}
        isFirst={isFirst}
        isLast={isLast}
      >
        {renderMessage() ? result : "Hi how can I help you?"}
      </Bubble>
    </TextStepContainer>
  )
}

TextStep.propTypes = {
  avatarStyle: PropTypes.objectOf(PropTypes.any),
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  bubbleStyle: PropTypes.objectOf(PropTypes.any),
  hideUserAvatar: PropTypes.bool,
  previousStep: PropTypes.objectOf(PropTypes.any),
  step: PropTypes.objectOf(PropTypes.any),
  steps: PropTypes.objectOf(PropTypes.any),
  triggerNextStep: PropTypes.func,
  user: PropTypes.bool,
  userAvatar: PropTypes.string,
  botAvatar: PropTypes.string,
}

TextStep.defaultProps = {
  avatarStyle: {},
  previousStep: {},
  steps: {},
  isFirst: true,
  isLast: false,
  bubbleStyle: {},
  hideBotAvatar: false,
  hideUserAvatar: false,
  user: false,
  userAvatar:
    "data:image/svg+xml,%3csvg viewBox='-208.5 21 100 100' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ccircle cx='-158.5' cy='71' fill='%23F5EEE5' r='50'/%3e%3cdefs%3e%3ccircle cx='-158.5' cy='71' id='a' r='50'/%3e%3c/defs%3e%3cclipPath id='b'%3e%3cuse overflow='visible' xlink:href='%23a'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23b)' d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' fill='%23E6C19C'/%3e%3cg clip-path='url(%23b)'%3e%3cdefs%3e%3cpath d='M-108.5 121v-14s-21.2-4.9-28-6.7c-2.5-.7-7-3.3-7-12V82h-30v6.3c0 8.7-4.5 11.3-7 12-6.8 1.9-28.1 7.3-28.1 6.7v14h100.1z' id='c'/%3e%3c/defs%3e%3cclipPath id='d'%3e%3cuse overflow='visible' xlink:href='%23c'/%3e%3c/clipPath%3e%3cpath clip-path='url(%23d)' d='M-158.5 100.1c12.7 0 23-18.6 23-34.4 0-16.2-10.3-24.7-23-24.7s-23 8.5-23 24.7c0 15.8 10.3 34.4 23 34.4z' fill='%23D4B08C'/%3e%3c/g%3e%3cpath d='M-158.5 96c12.7 0 23-16.3 23-31 0-15.1-10.3-23-23-23s-23 7.9-23 23c0 14.7 10.3 31 23 31z' fill='%23F2CEA5'/%3e%3c/svg%3e",
  botAvatar:
    "data:image/svg+xml,%3csvg version='1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath d='M303 70a47 47 0 1 0-70 40v84h46v-84c14-8 24-23 24-40z' fill='%2393c7ef'/%3e%3cpath d='M256 23v171h23v-84a47 47 0 0 0-23-87z' fill='%235a8bb0'/%3e%3cpath fill='%2393c7ef' d='M0 240h248v124H0z'/%3e%3cpath fill='%235a8bb0' d='M264 240h248v124H264z'/%3e%3cpath fill='%2393c7ef' d='M186 365h140v124H186z'/%3e%3cpath fill='%235a8bb0' d='M256 365h70v124h-70z'/%3e%3cpath fill='%23cce9f9' d='M47 163h419v279H47z'/%3e%3cpath fill='%2393c7ef' d='M256 163h209v279H256z'/%3e%3cpath d='M194 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%233c5d76'/%3e%3cpath d='M380 272a31 31 0 0 1-62 0c0-18 14-32 31-32s31 14 31 32z' fill='%231e2e3b'/%3e%3cpath d='M186 349a70 70 0 1 0 140 0H186z' fill='%233c5d76'/%3e%3cpath d='M256 349v70c39 0 70-31 70-70h-70z' fill='%231e2e3b'/%3e%3c/svg%3e",
}

export default TextStep
