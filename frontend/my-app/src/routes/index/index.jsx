import React from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';
import { ReactSession } from 'react-client-session';

console.log(ReactSession.get("admin"));

function Index() {
    return (
      <div className="Index">
        <main>
            <h1>Pasirinkite miestą</h1>
            <div className="cities">
                <NavLink to={"renginiai/klaipeda"}>Klaipeda</NavLink>
                <NavLink to={"renginiai/vilnius"}>Vilnius</NavLink>
                <NavLink to={"renginiai/kaunas"}>Kaunas</NavLink>
            </div>
        </main>
      </div>
    );
  }
  
  export default Index;