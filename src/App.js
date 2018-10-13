import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import Template from "./components/Template";
import DateInfo from "./components/DateInfo";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

class App extends Component {
  state = {
    selectedDate: new Date(),
    items: [],
    sortingState: "asc"
  };

  fetchData = async () => {
    const now = new Date();
    const result = await axios.get("http://localhost:8080/items", {
      params: {
        dateString: now.toDateString()
      }
    });
    this.setState({
      items: result.data
    });
  };

  componentDidMount () {
    this.fetchData();
  }

  findIndex = (arr, key, value) => {
    const index = arr.findIndex((item) => item[key] === value);
    return index;
  };

  onClickEnroll = async (title) => {
    const time = this.state.selectedDate;
    const now = new Date();
    time.setHours(now.getHours());
    time.setMinutes(now.getMinutes());
    time.setSeconds(now.getSeconds());
    try {
      const result = await axios({
        method: "post",
        url: "http://localhost:8080/item",
        data: {
          title: title,
          check: false,
          date: time.toISOString(),
          deadLine: null
        }
      });
      const newItems = this.state.items;
      newItems.push(result.data);
      this.setState({
        items: newItems
      });
    } catch (error) {
      alert(error);
    }
  };

  onDelete = async (_id) => {
    try {
      await axios({
        method: "delete",
        url: "http://localhost:8080/item",
        data: {
          _id
        }
      });
      const indexOfMatchedItem = this.findIndex(this.state.items, "_id", _id);
      const newItems = this.state.items;
      newItems.splice(indexOfMatchedItem, 1);
      this.setState({
        items: newItems
      });
    } catch (error) {
      alert(error);
    }
  };

  onChangeCurrentDate = async (difference) => {
    const date = this.state.selectedDate.getDate();
    const newDate = new Date(this.state.selectedDate.setDate(date + difference));
    const result = await axios("http://localhost:8080/items", {
      params: {
        dateString: newDate.toDateString()
      }
    });
    this.setState({
      selectedDate: newDate,
      items: result.data
    });
  };

  onClickDoneButton = async (_id, check) => {
    try {
      await axios({
        method: "put",
        url: "http://localhost:8080/item/check",
        data: {
          _id,
          check: !check
        }
      });
      const indexOfMatchedItem = this.findIndex(this.state.items, "_id", _id);
      const newItems = this.state.items;
      newItems[indexOfMatchedItem].check = !newItems[indexOfMatchedItem].check;
      this.setState({
        items: newItems
      });
    } catch (error) {
      alert(error);
    }
  };

  onChangeDeadLineDate = async (_id, deadLine) => {
    try {
      await axios({
        method: "put",
        url: "http://localhost:8080/item/deadLine",
        data: {
          _id,
          deadLine: deadLine
        }
      });
      const indexOfMatchedItem = this.findIndex(this.state.items, "_id", _id);
      const newItems = this.state.items;
      const newDeadLine = moment(deadLine, "YYYY-MM-DDTHH:mm:ss.SSS").add(0, "hour");
      newItems[indexOfMatchedItem].deadLine = newDeadLine.toISOString();
      this.setState({
        items: newItems
      });
    } catch (error) {
      alert(error);
    }
  };

  onClickSorting = () => {
    let newArr = this.state.items;
    newArr.sort((a, b) => {
      if (a.deadLine > b.deadLine) {
        return this.state.sortingState === "asc" ? -1 : 1;
      } else if (a.deadLine < b.deadLine) {
        return this.state.sortingState === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });
    this.setState({
      items: newArr,
      sortingState: this.state.sortingState === "asc" ? "desc" : "asc"
    });
  };

  render () {
    return (
      <Template
        dateInfo={<DateInfo date={this.state.selectedDate} onChangeDate={this.onChangeCurrentDate} />}
        form={<Form enroll={this.onClickEnroll} />}
        onClickSorting={this.onClickSorting}
      >
        <TodoList
          items={this.state.items}
          onDelete={this.onDelete}
          onClickDone={this.onClickDoneButton}
          onChangeDeadeLine={this.onChangeDeadLineDate}
        />
      </Template>
    );
  }
}

export default App;
