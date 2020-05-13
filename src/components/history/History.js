import React from "react";

function History() {
  return (
    <div style={{ marginTop: "60px" }}>
      <h1>Travel History</h1>
      <ol class="list-group">
        <li class="list-group-item">
          New <span class="badge">12</span>
        </li>
        <li class="list-group-item">
          Deleted <span class="badge">5</span>
        </li>
        <li class="list-group-item">
          Warnings <span class="badge">3</span>
        </li>
      </ol>
    </div>
  );
}

export default History;
