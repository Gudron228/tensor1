document.addEventListener('DOMContentLoaded', function() {

    fetchTopArtists();

    getTopTracks();
  
    function fetchTopArtists() {
        const url = "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=f3250daf7f9e9c9b43b2a8181f2bd7ca&format=json&limit=12";
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const artists = data?.artists?.artist;
                if (artists) {
                    showTopArtists(artists);
                }
            })
            .catch(error => {
                console.error('Ошибка при загрузке исполнителей:', error);
            });
        
    }

    function getTopTracks() {
        
        const url = "https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=f3250daf7f9e9c9b43b2a8181f2bd7ca&format=json&limit=18";

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tracks = data?.tracks?.track;
                if (tracks) {
                    showTopTracks(tracks);
                }
            })
            .catch(error => {
                console.error('Ошибка при загрузке треков:', error);
            });
    }

    function showTopArtists(artists) {
        const container = document.querySelector('.popular-musicmacker-list');
        container.innerHTML = '';
        
        artists.forEach(artist => {
            const artistElement = document.createElement('li');
            artistElement.className = 'popular-musicmacker';
            
            const imageUrl = artist.image?.find(img => img.size === 'medium')?.['#text'] || 
                            'img/artists/kanyewest.png';
            
            artistElement.innerHTML = `
                <a class="musicmaker-link" href="${artist.url}" target="_blank">
                    <img src="${imageUrl}" alt="${artist.name}" onerror="this.src='img/artists/default.png'">
                </a>
                <h3 class="musicmaker-name">${artist.name}</h3>
                <ul class="musicmaker-genre-list">
                    ${artist.tags ? 
                        artist.tags.tag.slice(0, 3).map(tag => 
                            `<li class="musicmaker-genre">${tag.name}</li>`
                        ).join('') : 
                        '<li class="musicmaker-genre">Разные жанры</li>'}
                </ul>
            `;
            
            container.appendChild(artistElement);
        });
    }

     function showTopTracks(tracks) {
        const container = document.querySelector('.popular-tracks-list');
        container.innerHTML = ''; 
        
        tracks.forEach(track => {
            const trackElement = document.createElement('li');
            trackElement.className = 'popular-track';
            
            const imageUrl = track.image?.find(img => img.size === 'large')?.['#text'] || 
                            'img/tracks/afterlike.png';
            
            console.log(imageUrl)

            trackElement.innerHTML = `
                <a class="track-link" href="${track.url}" target="_blank">
                    <img src="${imageUrl}" alt="${track.name}" onerror="this.src='img/tracks/default.png'">
                </a>
                <div class="track-info">
                    <h3 class="track-name">${track.name}</h3>
                    <h4 class="artist-name">${track.artist.name}</h4>
                    <ul class="musical-genre-list">
                        ${track.tags ? 
                            track.tags.tag.slice(0, 3).map(tag => 
                                `<li class="musical-genre">${tag.name}</li>`
                            ).join('') : 
                            '<li class="musical-genre">Разные жанры</li>'}
                    </ul>
                </div>
            `;
            
            container.appendChild(trackElement);
        });
    }

}  )