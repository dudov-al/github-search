import React, { useState } from "react";

import Table from "./Table"

const Profile = () => {
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");

  const [repositories, setRepositories] = useState([]);
  const onChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const profile = await fetch(`https://api.github.com/users/${username}`);
    const profileJson = await profile.json();

    const repositories = await fetch(profileJson.repos_url);
    const repoJson = await repositories.json();

    if (profileJson) {
      setData(profileJson);
      setRepositories(repoJson);
    }
  };
  return (
    <>
      <div style={{ padding: 100 }}>
        <div className="ui search">
          <div className="ui icon input">
            <input
              className="promt"
              placeholder="search"
              type="text"
              value={username}
              onChange={onChangeHandler}
            />
            <i className="search icon"></i>
          </div>
          <button
            className="ui github button"
            onClick={submitHandler}
            type="submit"
          >
            <i className="github icon"></i>
            Find
          </button>
          <Table data={data} repositories={repositories} />
        </div>

        
      </div>
      
    </>
  );
};
export default Profile;
