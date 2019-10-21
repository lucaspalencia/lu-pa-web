import React, { useState, useEffect } from 'react';
import { getEvent, getGroups, getPlayoffMatches } from './services/services';
import './App.css';

const EVENT_ID = process.env.REACT_APP_EVENT_ID

function App() {
  const [event, setEvent] = useState({name: '', wonTeamName: ''});
  const [groups, setGroups] = useState([]);
  const [playoffMatches, setPlayoffMatches] = useState([]);

  useEffect(() => {
    const loadEvent = async () => {
      const event = await getEvent(EVENT_ID);
      setEvent(event);
    };

    const loadGroups = async () => {
      const groups = await getGroups(EVENT_ID);
      setGroups(groups);
    };

    const loadPlayoffMatches = async () => {
      const playoffMatches = await getPlayoffMatches(EVENT_ID);
      setPlayoffMatches(playoffMatches);
    };

    loadEvent();
    loadGroups();
    loadPlayoffMatches();
  }, []);

  return (
    <div className="App container">
      <h1 className="center">{ event.name }</h1>
      <div className="row">
        {groups.map(group => (
          <div key={group.id} className="col s12 m6">
            <h2 className="center">{group.name}</h2>
            <table className="highlight centered">
              <thead>
                <tr>
                    <th>Time</th>
                    <th>Pontos</th>
                    <th>Rounds</th>
                </tr>
              </thead>
              <tbody>
                {group.teams.map(team => (
                  <tr key={team.id}>
                    <td>{team.name}</td>
                    <td>{team.points}</td>
                    <td>{team.rounds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div className="row">
        <h3 className="center">Partidas de Playoffs</h3>
        <div className="col s12">
          <table className="highlight centered">
            <thead>
              <tr>
                  <th>Time</th>
                  <th>Pontos</th>
                  <th></th>
                  <th>Pontos</th>
                  <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {playoffMatches.map(match => (
                <tr key={match.id}>
                  <td>{match.team1}</td>
                  <td>{match.team1Score}</td>
                  <td>X</td>
                  <td>{match.team2Score}</td>
                  <td>{match.team2}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="center winner">Grande Campeão: {event.wonTeamName}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
