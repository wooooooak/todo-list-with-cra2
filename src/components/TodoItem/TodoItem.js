import React from "react";
import TimePicker from "rc-time-picker";
import moment from "moment";
import "rc-time-picker/assets/index.css";
import "./style.scss";
import { FaRegCircle, FaCheckCircle, FaEraser } from "react-icons/fa";

const format = "h:mm a";
const now = moment().hour(0).minute(0);

class TodoItem extends React.Component {
  state = {
    showTimeSetter: "none"
  };

  onClickTitle = () => {
    if (this.state.showTimeSetter === "none") {
      this.setState({
        showTimeSetter: "flex"
      });
    } else {
      this.setState({
        showTimeSetter: "none"
      });
    }
  };

  stylingByCheckStatus = (checkFlag) => {
    if (checkFlag) {
      return { textDecorationLine: "line-through", color: "grey" };
    } else {
      return null;
    }
  };

  showRestTime = (deadLine) => {
    const date = moment(deadLine, "YYYY-MM-DDTHH:mm:ss.SSS").add(9, "hour");
    console.log(date.fromNow());
    return date.fromNow();
    // console.log(moment(deadLine.slice(11, 19)), "");
  };

  render () {
    const { _id, title, check, onDelete, deadLine, onClickDone, onChangeDeadeLine } = this.props;
    return (
      <div>
        <div class="TodoItem-Wrapper" style={this.stylingByCheckStatus(check)}>
          <div class="TodoItem-Delete">
            <FaEraser onClick={() => onDelete(_id)} />
          </div>
          <p class="TodoItem-Title" onClick={this.onClickTitle}>
            {title}
          </p>
          <span class="TodoItem-DeadLine">{deadLine ? this.showRestTime(deadLine) : null}</span>
          {check ? (
            <div class="TodoItem-Icon" onClick={() => onClickDone(_id, check)}>
              <FaCheckCircle class="TodoItem-Check-Icon" />
            </div>
          ) : (
            <div class="TodoItem-Icon" onClick={() => onClickDone(_id, check)}>
              <FaRegCircle class="TodoItem-Check-Icon" />
            </div>
          )}
        </div>
        <div class="hidden" style={{ display: this.state.showTimeSetter }}>
          <TimePicker
            className="time-picker"
            showSecond={false}
            defaultValue={deadLine ? moment(deadLine) : now}
            onChange={(value) => {
              onChangeDeadeLine(_id, value);
            }}
            format={format}
            use12Hours
          />
        </div>
      </div>
    );
  }
}

export default TodoItem;
