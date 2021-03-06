import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Search from '../../components/common/Search';

class EventsIndex extends React.Component {

  constructor() {
    super();
    this.state = {
      events: [],
      sort: 'name|asc'
    };
  }

  componentDidMount() {
    axios.get('/api/events')
      .then(res => this.setState({ events: res.data }));
  }

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  }

  filteredEvents = (events) => {
    const re = new RegExp(this.state.search, 'i');
    return events.filter(event =>  {
      return re.test(event.name);
    });
  }

  handleSort = (e) => {
    this.setState({ sort: e.target.value });
  }

  sortedEvents = (events) => {
    const [ prop, dir ] = this.state.sort.split('|');
    return _.orderBy(events, prop, dir);
  }

  sortedAndFilteredEvents = () => {
    const filtered = this.filteredEvents(this.state.events);
    return this.sortedEvents(filtered);
  }

  render() {
    return (



      <section>
        <section>
          <div className="columns">
            <div className="filters column">
              <input className="input" placeholder="Search our events..." onChange={this.handleSearch} />
            </div>
            <div className="control column">
              <div className="select is-fullwidth">
                <select onChange={this.handleSort}>
                  <option value="name|asc">Filter by...</option>
                  <option value="name|asc">Name (A-Z)</option>
                  <option value="name|desc">Name (Z-A)</option>
                  <option value="type|asc">Event type</option>
                </select>
              </div>
            </div>
          </div>

          <hr />

          <div className="columns is-multiline">
            {this.sortedAndFilteredEvents().map(event =>
              <div key={event._id} className="column is-one-third-desktop is-half-tablet">
                <Link to={`/events/${event._id}`}>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img src={event.image} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="content">
                        <h2 className="title">{event.name}</h2>
                        <h5 className="subtitle">{event.date}</h5>
                        <h5 className="subtitle">Event type: {event.type}</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <Search />
        </section>
      </section>

    );
  }
}

export default EventsIndex;
