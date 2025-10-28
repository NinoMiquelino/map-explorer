// js/geolocation.js - Modificar a classe GeolocationManager
class GeolocationManager {
    constructor(mapManager) {
        this.mapManager = mapManager;
        this.watchId = null;
        this.setupGeolocation();
    }

    setupGeolocation() {
        const geolocationBtn = document.getElementById('geolocation-btn');
        geolocationBtn.addEventListener('click', () => {
            this.getCurrentLocation();
        });
    }

    getCurrentLocation() {
        if (!navigator.geolocation) {
            alert('Geolocalização não é suportada pelo seu navegador');
            return;
        }

        // Mostra loading
        const btn = document.getElementById('geolocation-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Buscando...</span>';
        btn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.handleLocationSuccess(position);
                btn.innerHTML = originalText;
                btn.disabled = false;
            },
            (error) => {
                this.handleLocationError(error);
                btn.innerHTML = originalText;
                btn.disabled = false;
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    }

    handleLocationSuccess(position) {
        const { latitude, longitude, accuracy } = position.coords;
        
        // Atualiza o mapa
        this.mapManager.map.setView([latitude, longitude], 15);
        
        // Atualiza informações do local (IGUAL ao clique no mapa)
        this.mapManager.updateLocationInfo(latitude, longitude);
        
        // Busca reversa de endereço para mostrar informações completas
        this.mapManager.reverseGeocode(latitude, longitude);
        
        // Adiciona marcador especial para localização do usuário
        const userMarker = L.marker([latitude, longitude])
            .addTo(this.mapManager.map)
            .bindPopup(`
                <div class="p-2 text-center">
                    <i class="fas fa-user-circle text-2xl text-blue-500 mb-2"></i>
                    <h4 class="font-semibold text-gray-800">Sua Localização</h4>
                    <p class="text-sm text-gray-600">Precisão: ${accuracy.toFixed(1)}m</p>
                    <p class="text-xs text-gray-500">${latitude.toFixed(6)}, ${longitude.toFixed(6)}</p>
                </div>
            `)
            .openPopup();

        // Adiciona círculo de precisão
        L.circle([latitude, longitude], {
            color: 'blue',
            fillColor: '#3388ff',
            fillOpacity: 0.2,
            radius: accuracy
        }).addTo(this.mapManager.map);

        this.mapManager.userLocation = { lat: latitude, lng: longitude };
        
        // Adiciona informações de precisão ao painel
        this.addAccuracyInfo(accuracy);
        
        // Inicia watch de posição
        this.startWatchingPosition();
    }

    handleLocationError(error) {
        let message = 'Erro desconhecido ao obter localização';
        
        switch(error.code) {
            case error.PERMISSION_DENIED:
                message = 'Permissão de localização negada';
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Informação de localização indisponível';
                break;
            case error.TIMEOUT:
                message = 'Tempo esgotado para obter localização';
                break;
        }
        
        // Mostra erro no painel de informações
        const infoDiv = document.getElementById('location-info');
        infoDiv.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-exclamation-triangle text-2xl text-red-500 mb-2"></i>
                <p class="text-red-600 font-medium">${message}</p>
                <p class="text-sm text-gray-600 mt-2">Verifique as permissões do navegador</p>
            </div>
        `;
    }

    addAccuracyInfo(accuracy) {
        const infoDiv = document.getElementById('location-info');
        const currentContent = infoDiv.innerHTML;
        
        const accuracyHTML = `
            <div class="mt-3 pt-3 border-t border-gray-200">
                <h4 class="font-medium text-gray-800 mb-2">
                    <i class="fas fa-crosshairs mr-1 text-blue-500"></i>
                    Precisão da Localização
                </h4>
                <div class="space-y-1">
                    <div class="flex justify-between">
                        <span class="text-sm text-gray-600">Raio de precisão:</span>
                        <span class="text-sm font-medium">${accuracy.toFixed(1)} metros</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full" 
                             style="width: ${Math.min(100, 100 - (accuracy / 100))}%">
                        </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">
                        Quanto menor o raio, mais precisa sua localização
                    </p>
                </div>
            </div>
        `;
        
        infoDiv.innerHTML = currentContent + accuracyHTML;
    }

    startWatchingPosition() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
        }

        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                console.log('Posição atualizada:', latitude, longitude);
                
                // Atualiza informações se o usuário quiser acompanhamento em tempo real
                this.updateLivePosition(latitude, longitude, accuracy);
            },
            (error) => {
                console.error('Erro ao acompanhar posição:', error);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 3000
            }
        );
    }

    updateLivePosition(lat, lng, accuracy) {
        // Opcional: Atualizar informações em tempo real
        // Pode ser implementado se desejar acompanhamento contínuo
        console.log('Posição em tempo real:', lat, lng, accuracy);
    }

    stopWatchingPosition() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }
}