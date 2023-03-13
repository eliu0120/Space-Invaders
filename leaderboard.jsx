import React from 'react';
import './styles.css';

function Leaderboard() {
  return (
    <div className="container">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Player 1</td>
            <td>10000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Player 2</td>
            <td>9000</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Player 3</td>
            <td>8000</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Player 4</td>
            <td>7000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
