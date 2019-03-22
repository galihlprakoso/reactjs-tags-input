import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const propTypes = {
  tags:PropTypes.array,
  placeholder:PropTypes.string,
  customContainerStyle:PropTypes.object,
  customInputContainerStyle:PropTypes.object,
  tagBackgroundColor:PropTypes.string,
  tagTextColor:PropTypes.string,
  tagTextSize:PropTypes.number,
  tagTextFamily:PropTypes.string,
  inputBackgroundColor:PropTypes.string,
  inputTextColor:PropTypes.string,
  inputTextSize:PropTypes.number,
  inputTextFamily:PropTypes.string,
}

class TagsInput extends Component {
  state = {
    inputValue: '',
    isInputFocused: false
  }

  onChange = e => {
    const inputValue = e.target.value

    if (inputValue.includes(',')) {
      this.addToTags(inputValue)
    } else {
      this.setState({inputValue})
    }
  }

  addToTags = inputValue => {
    const { tags } = this.props
    const tag = inputValue.replace(/^[a-z0-9]+$/i, '').replace(',', '')
    if (tag) {
      tags.push(tag)
      this.setState({inputValue: ''})
    }
    this.input.focus()
  }

  removeFromTags = index => {
    const { tags } = this.props
    tags.splice(index, 1)
    this.setState({tags})
    this.input.focus()
  }

  onClickToFocus = () => {
    this.input.focus()
  }

  onInputFocus = () => {
    this.setState({isInputFocused: true})
  }

  onInputBlur = () => {
    this.setState({isInputFocused: false})
  }

  render() {
    const { inputValue, isInputFocused } = this.state
    const { 
      tags,
      placeholder,
      customContainerStyle,
      customInputContainerStyle,
      tagBackgroundColor,
      tagTextColor,
      tagTextSize,
      tagTextFamily,
      inputBackgroundColor,
      inputTextColor,
      inputTextSize,
      inputTextFamily            
    } = this.props
    return (
      <div
        onClick={this.onClickToFocus}
        className='tagsInputContainer'
        style={customContainerStyle}
      >
        {(!isInputFocused && tags.length === 0) &&
          <label>{placeholder}</label>
        }

        {tags.map((tag, index) =>
          <span
            style={{
              backgroundColor: tagBackgroundColor,
              color: tagTextColor,
              fontSize: tagTextSize,
              fontFamily: tagTextFamily
            }}
          >
            {tag}
            <a
              style={{
                color: tagTextColor
              }}
              onClick={() => {
                this.removeFromTags(index)
              }}
            >
                x
            </a>
          </span>
        )}
        <input
          style={[customInputContainerStyle, {
            backgroundColor: inputBackgroundColor,
            color: inputTextColor,
            fontSize: inputTextSize,
            fontFamily: inputTextFamily
          }]}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          ref={(input) => { this.input = input }}
          value={inputValue}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

TagsInput.propTypes = propTypes

export default TagsInput
