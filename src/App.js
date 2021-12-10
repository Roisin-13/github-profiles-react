import React from 'react';
import axios from 'axios';
import './App.css';


const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="login">{profile.login}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: "" };
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(response.data);
    this.setState({ userName: "" })
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  //  constructor(props){
  //    super(props)
  //    this.state = {
  //      profiles: testData
  //    };
  //  }
  state = {
    profiles: [],
  };

  addProfile = (profileData) => {
    this.setState(prevState => ({ profiles: [...prevState.profiles, profileData] }));
  };

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}



export default App;
