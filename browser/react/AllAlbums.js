import React from 'react'

export default class extends React.Component {

                                // <img src="http://placeholdit.imgix.net/~text?txtsize=33&txt=ALBUMoneIMAGE&w=300&h=300" />
                                // 
    render() {
        let makeAlbums = this.props.albums.map(album => 
                        <div className="col-xs-4" key={album.name}>
                            <a className="thumbnail" href="#" onClick={() => this.props.handleClick(album)}>
                                <img src={album.imageUrl} width={300} height={300} />
                                <div className="caption">
                                <h5>
                                    <span>{album.name}</span>
                                </h5>
                                <small>{album.songs.length} songs</small>
                                </div>
                            </a>
                        </div>)
        
        return    (<div>
                        <h3>Albums</h3>
                        <div className="row">
                            {makeAlbums}
                        </div>
                    </div>)
    }
}