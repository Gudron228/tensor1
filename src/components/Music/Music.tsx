import React, {useEffect, useState} from "react";

interface Artist {
  name: string;
  url: string;
  image: { '#text': string; size: string }[];
  tags?: { tag: { name: string }[] };
}

interface Track {
  name: string;
  artist: { name: string };
  url: string;
  image: { '#text': string; size: string }[];
  tags?: { tag: { name: string }[] };
}

export const Music = () => {
    const API_KEY = 'f3250daf7f9e9c9b43b2a8181f2bd7ca';
    const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
    const [artists, setArtists] = useState<Artist[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);

    useEffect(() => {
        fetchTopArtists();
        getTopTracks();
    }, []);

    const fetchTopArtists = async () => {
        try {
        const url = `${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=12`;
        const response = await fetch(url);
        const data = await response.json();
        setArtists(data?.artists?.artist || []);
        } catch (error) {
        console.error('Ошибка при загрузке исполнителей:', error);
        }
    };

    const getTopTracks = async () => {
        try {
        const url = `${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=18`;
        const response = await fetch(url);
        const data = await response.json();
        setTracks(data?.tracks?.track || []);
        } catch (error) {
        console.error('Ошибка при загрузке треков:', error);
        }
    };

    const getImage = (images: any[], fallback: string) => {
        return images?.find(img => img.size === 'medium')?.['#text'] || fallback;
    };

    return (
        <main className="page-main">
      <h1>Music</h1>
      <section className="popular-musicmaker-top">
        <h2 className="popular">Hot right now</h2>
        <ul className="popular-musicmacker-list">
            {artists.map(artist => (
            <li className="popular-musicmacker" key={artist.name}>
            <a className="musicmaker-link" href={artist.url}><img src={getImage(artist.image, '/img/default.png')} alt={artist.name}/></a>
            <h3 className="musicmaker-name">{artist.name}</h3>
            <ul className="musicmaker-genre-list">
                {artist.tags?.tag.slice(0,3).map(tag => (
                    <li className="musicmaker-genre">{tag.name}</li>
                )) || <li className="musicmaker-genre">Разные жанры</li>
                }
            </ul>
          </li>
            ))}
          
        </ul>
      </section>
      <section className="popular-tracks">
        <h2 className="popular">Popular tracks</h2>
        <ul className="popular-tracks-list">
            {tracks.map(track => (
            <li className="popular-track" key={track.name}>
            <a className="track-link" href={track.url}><img src={getImage(track.image, '/img/default.png')} alt={track.name}/></a>
            <div className="track-info">
            <h3 className="track-name">{track.name}</h3>
            <h4 className="artist-name">{track.artist.name}</h4>
            <ul className="musical-genre-list">
                {track.tags?.tag.slice(0,3).map(tag => (
                    <li className="musical-genre">{tag.name}</li>
                )) || <li className="musical-genre">Разные жанры</li>
                }
            </ul>
            </div>
          </li>
            ))}
        </ul>
      </section>
    </main>
    );
}