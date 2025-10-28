// js/map.js
class MapManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.currentLayer = 'street';
        this.userLocation = null;
        this.initMap();
    }

    initMap() {
        // Inicializa o mapa centrado no Brasil
        this.map = L.map('map').setView([-15.7797, -47.9297], 4);

        // Camadas base
        this.layers = {
            street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }),
            satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: '© Esri, Maxar, Earthstar Geographics',
                maxZoom: 19
            }),
            topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenTopoMap contributors',
                maxZoom: 17
            })
        };

        // Adiciona camada padrão
        this.layers.street.addTo(this.map);

        // Eventos do mapa
        this.map.on('click', this.onMapClick.bind(this));
        this.setupLayerControls();
    }

    setupLayerControls() {
        // Controle de camadas
        const layerControl = document.querySelectorAll('input[name="map-layer"]');
        layerControl.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.switchLayer(e.target.value);
            });
        });
    }

    switchLayer(layerType) {
        // Remove todas as camadas
        Object.values(this.layers).forEach(layer => {
            this.map.removeLayer(layer);
        });

        // Adiciona nova camada
        this.layers[layerType].addTo(this.map);
        this.currentLayer = layerType;
    }

    onMapClick(e) {
        const { lat, lng } = e.latlng;
        
        // Adiciona marcador
        this.addMarker(lat, lng, `Localização: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        
        // Atualiza informações do local
        this.updateLocationInfo(lat, lng);
        
        // Busca reversa de endereço
        this.reverseGeocode(lat, lng);
    }

    addMarker(lat, lng, popupText = 'Novo Marcador') {
        const marker = L.marker([lat, lng])
            .addTo(this.map)
            .bindPopup(`
                <div class="p-2">
                    <h4 class="font-semibold text-gray-800">Marcador</h4>
                    <p class="text-sm text-gray-600">${popupText}</p>
                    <button 
                        onclick="mapManager.removeMarker(${this.markers.length})" 
                        class="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                    >
                        Remover
                    </button>
                </div>
            `)
            .openPopup();

        this.markers.push(marker);
        this.updateMarkersCount();
    }

    removeMarker(index) {
        if (this.markers[index]) {
            this.map.removeLayer(this.markers[index]);
            this.markers.splice(index, 1);
            this.updateMarkersCount();
        }
    }

    clearAllMarkers() {
        this.markers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markers = [];
        this.updateMarkersCount();
    }

    updateMarkersCount() {
        document.getElementById('markers-count').textContent = this.markers.length;
    }

    updateLocationInfo(lat, lng) {
        const infoDiv = document.getElementById('location-info');
        infoDiv.innerHTML = `
            <div class="space-y-2">
                <div class="flex justify-between">
                    <span class="font-medium">Latitude:</span>
                    <span>${lat.toFixed(6)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="font-medium">Longitude:</span>
                    <span>${lng.toFixed(6)}</span>
                </div>
                <div class="flex justify-between">
                    <span class="font-medium">Zoom:</span>
                    <span>${this.map.getZoom()}</span>
                </div>
            </div>
        `;
    }

    async reverseGeocode(lat, lng) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            
            if (data.address) {
                this.displayAddressInfo(data.address);
            }
        } catch (error) {
            console.error('Erro na geocodificação reversa:', error);
        }
    }

    displayAddressInfo(address) {
        const infoDiv = document.getElementById('location-info');
        const currentContent = infoDiv.innerHTML;
        
        let addressText = '<div class="mt-3 pt-3 border-t border-gray-200">';
        addressText += '<h4 class="font-medium text-gray-800 mb-2">Endereço:</h4>';
        
        if (address.road) addressText += `<p class="text-sm">Rua: ${address.road}</p>`;
        if (address.city || address.town) addressText += `<p class="text-sm">Cidade: ${address.city || address.town}</p>`;
        if (address.state) addressText += `<p class="text-sm">Estado: ${address.state}</p>`;
        if (address.country) addressText += `<p class="text-sm">País: ${address.country}</p>`;
        
        addressText += '</div>';
        
        infoDiv.innerHTML = currentContent + addressText;
    }

    // Busca por endereço
    async searchLocation(query) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
            const results = await response.json();
            
            if (results.length > 0) {
                const { lat, lon, display_name } = results[0];
                this.map.setView([lat, lon], 13);
                this.addMarker(lat, lon, display_name);
                
                // Mostra todos os resultados no painel
                this.displaySearchResults(results);
            } else {
                alert('Localização não encontrada!');
            }
        } catch (error) {
            console.error('Erro na busca:', error);
            alert('Erro ao buscar localização');
        }
    }

    displaySearchResults(results) {
        const infoDiv = document.getElementById('location-info');
        let resultsHTML = '<div class="mt-3 pt-3 border-t border-gray-200">';
        resultsHTML += '<h4 class="font-medium text-gray-800 mb-2">Resultados:</h4>';
        
        results.forEach((result, index) => {
            resultsHTML += `
                <div class="p-2 border-b border-gray-100 hover:bg-gray-50 cursor-pointer" 
                     onclick="mapManager.flyToLocation(${result.lat}, ${result.lon})">
                    <p class="text-sm text-gray-700">${result.display_name}</p>
                </div>
            `;
        });
        
        resultsHTML += '</div>';
        infoDiv.innerHTML += resultsHTML;
    }

    flyToLocation(lat, lng) {
        this.map.flyTo([lat, lng], 15);
        this.addMarker(lat, lng, 'Localização buscada');
    }
    // js/map.js - Adicionar este método à classe MapManager

// Método para exibir informações de localização de forma consistente
displayConsistentLocationInfo(lat, lng, additionalInfo = '') {
    const infoDiv = document.getElementById('location-info');
    
    let infoHTML = `
        <div class="space-y-3">
            <div class="flex items-center space-x-2 mb-3">
                <i class="fas fa-map-marker-alt text-blue-500"></i>
                <h3 class="font-semibold text-gray-800">Informações da Localização</h3>
            </div>
            
            <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="bg-gray-50 p-3 rounded-lg">
                    <div class="font-medium text-gray-700">Latitude</div>
                    <div class="text-gray-900 font-mono">${lat.toFixed(6)}</div>
                </div>
                <div class="bg-gray-50 p-3 rounded-lg">
                    <div class="font-medium text-gray-700">Longitude</div>
                    <div class="text-gray-900 font-mono">${lng.toFixed(6)}</div>
                </div>
            </div>
            
            <div class="bg-gray-50 p-3 rounded-lg">
                <div class="font-medium text-gray-700 mb-1">Zoom do Mapa</div>
                <div class="text-gray-900">${this.map.getZoom()}x</div>
            </div>
    `;
    
    // Adiciona informações extras se fornecidas
    if (additionalInfo) {
        infoHTML += additionalInfo;
    }
    
    infoHTML += `</div>`;
    
    infoDiv.innerHTML = infoHTML;
}

// Atualizar o método updateLocationInfo existente
updateLocationInfo(lat, lng) {
    this.displayConsistentLocationInfo(lat, lng);
}

// Atualizar o método reverseGeocode para usar o formato consistente
async reverseGeocode(lat, lng) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        
        if (data.address) {
            this.displayAddressInfo(data.address);
        }
    } catch (error) {
        console.error('Erro na geocodificação reversa:', error);
    }
}

// Atualizar displayAddressInfo para integrar com o formato consistente
displayAddressInfo(address) {
    const infoDiv = document.getElementById('location-info');
    const currentContent = infoDiv.innerHTML;
    
    let addressHTML = '<div class="bg-blue-50 p-3 rounded-lg mt-3">';
    addressHTML += '<div class="font-medium text-gray-800 mb-2">';
    addressHTML += '<i class="fas fa-home mr-2 text-blue-500"></i>';
    addressHTML += 'Endereço Encontrado';
    addressHTML += '</div>';
    addressHTML += '<div class="space-y-1 text-sm">';
    
    if (address.road) addressHTML += `<div class="flex justify-between"><span class="text-gray-600">Rua:</span><span class="font-medium">${address.road}</span></div>`;
    if (address.neighbourhood) addressHTML += `<div class="flex justify-between"><span class="text-gray-600">Bairro:</span><span class="font-medium">${address.neighbourhood}</span></div>`;
    if (address.city || address.town) addressHTML += `<div class="flex justify-between"><span class="text-gray-600">Cidade:</span><span class="font-medium">${address.city || address.town}</span></div>`;
    if (address.state) addressHTML += `<div class="flex justify-between"><span class="text-gray-600">Estado:</span><span class="font-medium">${address.state}</span></div>`;
    if (address.postcode) addressHTML += `<div class="flex justify-between"><span class="text-gray-600">CEP:</span><span class="font-medium">${address.postcode}</span></div>`;
    if (address.country) addressHTML += `<div class="flex justify-between"><span class="text-gray-600">País:</span><span class="font-medium">${address.country}</span></div>`;
    
    addressHTML += '</div></div>';
    
    infoDiv.innerHTML = currentContent + addressHTML;
}
}