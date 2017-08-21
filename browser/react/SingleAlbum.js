import React from 'react'

export default class extends React.Component {
    render() {
        // console.log('this.props.selectedAlbum', this.props.selectedAlbum)
        // console.log('this.props.currentSong', this.props.currentSong)
        let renderSongs = this.props.selectedAlbum && this.props.selectedAlbum.songs.map((song, i) => {

            let cn = this.props.currentSong && song.id == this.props.currentSong.id ? 'active' : ''
            return <tr key={i} className={cn}>
                        <td>
                        {!this.props.currentSong || this.props.currentSong.id != song.id ? 
                            <button className="btn btn-default btn-xs" onClick={() => this.props.audioPlay(song)}>
                                <span className="glyphicon glyphicon-play"></span>
                            </button>
                            
                            : <button className="btn btn-default btn-xs" style={{display:'none'}}> <span className="glyphicon glyphicon-play"></span></button>}
                        </td>
                        <td>{song.name}</td>
                        <td>{song.artists.map(r => r.name).join(', ')}</td>
                        <td>{song.genre}</td>
                    </tr>
        })
        return !this.props.selectedAlbum ? <span /> : (<div className="album col-xs-10">
                                                            <div>
                                                                <h3>{this.props.selectedAlbum.name}</h3>
                                                                <img src={this.props.selectedAlbum.imageUrl} className="img-thumbnail" />
                                                            </div>
                                                            <table className='table'>
                                                                <thead>
                                                                <tr>
                                                                    <th></th>
                                                                    <th>Name</th>
                                                                    <th>Artists</th>
                                                                    <th>Genre</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {renderSongs}
                                                                </tbody>
                                                            </table>
                                                    </div>)
    }
}