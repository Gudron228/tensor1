import React, { useState, useEffect, useCallback } from 'react';

interface Artist {
  name: string;
  url: string;
  image: { '#text': string; size: string }[];
  listeners?: number;
}

interface Album {
    name: string;
    artist: { name: string };
    url: string;
    image: { '#text': string; size: string }[];

}

interface Track {
    name: string;
    artist: { name: string };
    url: string;
    image: { '#text': string; size: string }[];
}

export const Search = () => {
    const API_KEY = 'f3250daf7f9e9c9b43b2a8181f2bd7ca';
    const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
    
    const [searchQuery, setSearchQuery] = useState('never gonna give you up');
    const [artists, setArtists] = useState<Artist[]>([]);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const clearSearch = () => {
        const input = document.querySelector('.search-input') as HTMLInputElement;
        if (input) {
        input.value = '';
        }
       
    };

    const formatNumber = (num: any) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const performSearch = useCallback(async (query) => {
        if (!query) return;
        
        setIsLoading(true);
        setError(null);

        setAlbums([]);
        setArtists([]);
        setTracks([]);

        try {
        await Promise.all([
            searchArtists(query),
            searchAlbums(query),
            searchTracks(query)
        ]);
        } catch (err: any) {
        setError(err.message);
        } finally {
        setIsLoading(false);
        }
    }, []);

    const searchArtists = async (query : any) => {
        try {
        const url = `${BASE_URL}?method=artist.search&artist=${query}&api_key=${API_KEY}&format=json&limit=8`;
        const response = await fetch(url);
        const data = await response.json();
        setArtists(data?.results?.artistmatches?.artist || []);
        } catch (err) {
        console.error('Error searching artists:', err);
        setArtists([]);
        }
    };

    const searchAlbums = async (query: any) => {
        try {
        const url = `${BASE_URL}?method=album.search&album=${query}&api_key=${API_KEY}&format=json&limit=8`;
        const response = await fetch(url);
        const data = await response.json();
        setAlbums(data?.results?.albummatches?.album || []);
        } catch (err) {
        console.error('Error searching albums:', err);
        setAlbums([]);
        }
    };

    const searchTracks = async (query : any) => {
        try {
        const url = `${BASE_URL}?method=track.search&track=${query}&api_key=${API_KEY}&format=json&limit=8`;
        const response = await fetch(url);
        const data = await response.json();
        setTracks(data?.results?.trackmatches?.track || []);
        } catch (err) {
        console.error('Error searching tracks:', err);
        setTracks([]);
        }
    };

    const getImage = (images: any[], fallback: string) => {
        return images?.find(img => img.size === 'medium')?.['#text'] || fallback;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        performSearch(searchQuery);
    };

    useEffect(() => {
        performSearch(searchQuery);
    }, [performSearch]);

    return (
        <main className="page-main">
        <header className="search-main-header">
            <h1 className="search-main">Search results for "{searchQuery}"</h1>
            <ul className="search-results-list">
                <li className="search-results-item"><a className="search-results-link search-link-current" href="#">Top Results</a></li>
                <li className="search-results-item"><a className="search-results-link" href="#">Artists</a></li>
                <li className="search-results-item"><a className="search-results-link" href="#">Albums</a></li>
                <li className="search-results-item"><a className="search-results-link" href="#">Tracks</a></li>
            </ul>
        </header>
        <section className="search-results">
            <form id="searchForm" onSubmit={handleSubmit}>
                <input type="text" className="search-input" placeholder="" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type="button" className="clear-button" onClick={clearSearch}><img src="/img/icons/clear_field.png" /><span className="visually-hidden">Очистить</span></button>
                <button type="submit" className="search-button"><img src="/img/icons/search_dark.png" /><span className="visually-hidden">Поиск</span></button>
            </form>

            {isLoading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            <section className="search-artists">
                <h2>Artists</h2>
                <ul className="top-artists-list">
                    {artists.map(artist =>
                        <li className="top-artists-item" key={artist.name}><img className="top-artists-image" src={getImage(artist.image, '/img/default.png')} alt={artist.name}/><a className="top-artists-link" href={artist.url}>{artist.name}</a><span className="artist-listeners">{formatNumber(artist.listeners || 0)} listeners</span></li>
                    )} 
                </ul>
                <a className="more-link" href="#">More artists<img className="more-link-image" src="/img/icons/arrow_small_right.png" /></a>
            </section>
            <section className="search-albums">
                <h2>Albums</h2>
                <ul className="top-albums-list">
                    {albums.map(album =>
                        <li className="top-albums-item" key={album.name}><img className="top-albums-image" src={getImage(album.image, '/img/default.png')} alt={album.name} /><a className="top-albums-link" href={album.url}>{album.name}</a><span className="albummaker-name">{album.artist}</span></li>
                    )}
                </ul>
                <a className="more-link" href="#">More albums<img className="more-link-image" src="/img/icons/arrow_small_right.png" /></a>
            </section>
            <section className="search-tracks">
                <h2>Tracks</h2>
                <ul className="top-tracks-list">
                    {tracks.map(track => 
                        <li className="top-tracks-item" key={track.name}>
                        <ul className="track-info-list">
                            <li className="track-info-item">
                                <a className="play-button" href={track.url}><img className="play-button-image" src="/img/icons/play_dark.png" /></a>
                            </li>
                            <li className="track-info-item">
                                <img className="track-info-image" src={getImage(track.image, '/img/default.png')} alt={track.name}/>
                            </li>
                            <li className="track-info-item"><p className="track-info-name">{track.name}</p></li>
                            <li className="track-info-item"><p className="track-artist-name">{track.artist}</p></li>
                        </ul>
                    </li>
                    )}
                    
                    
                </ul>
                <a className="more-link" href="#">More tracks<img className="more-link-image" src="/img/icons/arrow_small_right.png" /></a>
            </section>
        </section>

    </main>
    );
}