import React from "react";
import "./style.scss";

class Form extends React.Component {
  state= {
    title: ''
  }

  onTypingEnter = (e) => {
    if (e.key === 'Enter') {
      this.onClickEnrollButton()
    }
  }

  onChangeInput = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  onClickEnrollButton = () => {
    const title = this.state.title;
    this.setState({
      title: ''
    })
    this.props.enroll(title)
  }

  render() {
    return (
        <>
        <input class="Form-input" onChange={this.onChangeInput} onKeyPress={this.onTypingEnter}  value={this.state.title}/>
        <button class="Form-Button" onClick={this.onClickEnrollButton}>등록</button>
      </>
    )
  }
}

export default Form;
