import React from 'react';
import logo from './logo.svg';
import './App.css';

//import React, { Component } from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      showIndex:'',
      itemsToShow: 1,
      expanded: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.showMore = this.showMore.bind(this);
  }

  handleClick(value) {
    this.setState({ showIndex:value });
    console.log(`${value} clicked`);
  }
  showMore() {
   
    this.state.itemsToShow === 1 ? (
      this.setState({ itemsToShow:3, expanded: true })
    ) : (
      this.setState({ itemsToShow: 1, expanded: false })
    )
  }
  componentDidMount() {
    // when component mounted, start a GET request
    // to specified URL
    fetch('https://run.mocky.io/v3/a446cd0a-9cff-4d15-95c2-5777482f3c08')
      // when we get a response map the body to json
      .then(response => response.json())
      // and update the state data to said json
      .then(data => {
        console.log(data, " data state");
        let members = data.members;
        this.setState({ members:members });
      }
      )
    console.log(this.state, "state");
  }

  renderTodos() {
    return this.state.members.map((member, index) => {
        return (< li className='list-group-member'
          key={member.id}  onClick={ () => this.handleClick(index)}>Name : { member.real_name }  
         { this.state.showIndex=== index ?  <ul key={index}>
          <h4>List {index + 1}</h4>
          <h6>List {member.tz}</h6>
         
          {member.activity_periods.slice(0, this.state.itemsToShow).map((time,index) => (
            <li key={index}>
              <div>Start Time: {time.start_time}</div>
    
              <div>End Time: {time.end_time}</div>
              
            </li>
          ))}

<a className="btn btn-primary" onClick={this.showMore}>
  {this.state.expanded ? (
    <span>Show less</span>
  ) : (
    <span>Show more</span>
  )}
</a>

        </ul>
        : null }
        </li >
        )
      })
  }
  render() {
    return (< ul id="todo" > {
      this.renderTodos()
    } </ul>
    )
  }

  
}


export default App;