import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item">
          <Link to="/albums">ALBUMS</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/artists">ARTISTS</Link>
        </h4>
      </section>
      <hr />
      <section>
        <h4 className="text-muted">PLAYLISTS</h4>
        <hr />
        <ul className="list-unstyled">
        {props.allPlayList.map((playlist) =>
          <li className="playlist-item menu-item" key={playlist.name}>
            <Link to={"/playlist/" + playlist.id}>{playlist.name}</Link>
          </li>
        )}
        </ul>
        <h4>
          <Link className="btn btn-primary btn-block" to="/new-playlist">
            <span className="glyphicon glyphicon-plus"></span> PLAYLIST
          </Link>
        </h4>
        <hr />
        <h4 className="menu-item"><a href="https://github.com/sw-yx/FSA-juke-react/tree/part3-starting" target="_blank">Source (Github)</a></h4>
      </section>

    </sidebar>
  );
}

export default Sidebar;
