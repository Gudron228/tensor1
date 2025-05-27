document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'f3250daf7f9e9c9b43b2a8181f2bd7ca';
    const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
    
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.querySelector('.search-input');
    const searchHeader = document.querySelector('.search-main');
    
    performSearch('never gonna give you up');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            performSearch(query);
            searchHeader.textContent = `Search results for "${query}"`;
        }
    });
    
    function clearSearch() {
        searchInput.value = '';
        searchInput.focus();
    }
    
    function performSearch(query) {

        document.querySelectorAll('.top-artists-list, .top-albums-list, .top-tracks-list')
            .forEach(el => el.innerHTML = '<li class="loading">Loading...</li>');
        
        searchArtists(query);
        
        searchAlbums(query);
        
        searchTracks(query);
    }
    
    function searchArtists(query) {
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query}&api_key=${API_KEY}&format=json&limit=8`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const artists = data?.results?.artistmatches?.artist;
                if (artists && artists.length > 0) {
                    renderArtists(artists);
                } else {
                    document.querySelector('.top-artists-list').innerHTML = '<li class="no-results">No artists found</li>';
                }
            })
            .catch(error => {
                console.error('Error searching artists:', error);
                document.querySelector('.top-artists-list').innerHTML = '<li class="error">Error loading artists</li>';
            });
    }
    
    function searchAlbums(query) {
        const url = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${API_KEY}&format=json&limit=8`
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const albums = data?.results?.albummatches?.album;
                if (albums && albums.length > 0) {
                    renderAlbums(albums);
                } else {
                    document.querySelector('.top-albums-list').innerHTML = '<li class="no-results">No albums found</li>';
                }
            })
            .catch(error => {
                console.error('Error searching albums:', error);
                document.querySelector('.top-albums-list').innerHTML = '<li class="error">Error loading albums</li>';
            });
    }
    
    function searchTracks(query) {
         const url = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${API_KEY}&format=json&limit=8`
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tracks = data?.results?.trackmatches?.track;
                if (tracks && tracks.length > 0) {
                    renderTracks(tracks);
                } else {
                    document.querySelector('.top-tracks-list').innerHTML = '<li class="no-results">No tracks found</li>';
                }
            })
            .catch(error => {
                console.error('Error searching tracks:', error);
                document.querySelector('.top-tracks-list').innerHTML = '<li class="error">Error loading tracks</li>';
            });
    }

    
    
    function renderArtists(artists) {
        const container = document.querySelector('.top-artists-list');
        container.innerHTML = '';
        
        artists.forEach(artist => {
            const artistElement = document.createElement('li');
            artistElement.className = 'top-artists-item';
            
            const imageUrl = artist.image?.find(img => img.size === 'medium')?.['#text'] || 
                            'img/default.png';
            
            artistElement.innerHTML = `
                <img class="top-artists-image" src="${imageUrl}" alt="${artist.name}" onerror="this.src='img/default.png'">
                <a class="top-artists-link" href="${artist.url}" target="_blank">${artist.name}</a>
                <span class="artist-listeners">${formatNumber(artist.listeners || 0)} listeners</span>
            `;
            
            container.appendChild(artistElement);
        });
    }
    
    function renderAlbums(albums) {
        const container = document.querySelector('.top-albums-list');
        container.innerHTML = '';
        
        albums.forEach(album => {
            const albumElement = document.createElement('li');
            albumElement.className = 'top-albums-item';
            
            const imageUrl = album.image?.find(img => img.size === 'medium')?.['#text'] || 
                            'img/default.png';
            
            albumElement.innerHTML = `
                <img class="top-albums-image" src="${imageUrl}" alt="${album.name}" onerror="this.src='img/default.png'">
                <a class="top-albums-link" href="${album.url}" target="_blank">${album.name}</a>
                <span class="albummaker-name">${album.artist}</span>
            `;
            
            container.appendChild(albumElement);
        });
    }
    
    function renderTracks(tracks) {
        const container = document.querySelector('.top-tracks-list');
        container.innerHTML = '';
        
        tracks.forEach(track => {
            const trackElement = document.createElement('li');
            trackElement.className = 'top-tracks-item';
            
            const imageUrl = track.image?.find(img => img.size === 'medium')?.['#text'] || 
                            'img/default.png';
            
            const duration = track.duration ? formatDuration(track.duration) : '--:--';
            
            trackElement.innerHTML = `
                <ul class="track-info-list">
                    <li class="track-info-item">
                        <a class="play-button" href="${track.url}" target="_blank">
                            <img class="play-button-image" src="img/icons/play_dark.png">
                        </a>
                    </li>
                    <li class="track-info-item">
                        <img class="track-info-image" src="${imageUrl}" alt="${track.name}" onerror="this.src='img/default.png'">
                    </li>
                    <li class="track-info-item">
                        <p class="track-info-name">${track.name}</p>
                    </li>
                    <li class="track-info-item">
                        <p class="track-artist-name">${track.artist}</p>
                    </li>
                    <li class="track-info-item">
                        <span class="track-duration">${duration}</span>
                    </li>
                </ul>
            `;
            
            container.appendChild(trackElement);
        });
    }
    
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    function formatDuration(milliseconds) {
        if (!milliseconds || isNaN(milliseconds)) return '--:--';
        

        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    
    window.clearSearch = clearSearch;
});