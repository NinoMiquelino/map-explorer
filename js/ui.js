// js/ui.js
class UIManager {
    constructor(mapManager) {
        this.mapManager = mapManager;
        this.initUI();
    }

    initUI() {
        this.setupMobileMenu();
        this.setupSearch();
        this.setupMarkerControls();
        this.setupStatistics();
        this.setupGeolocationFeedback();
    }

    setupMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Fecha menu ao clicar em um link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');

        const performSearch = () => {
            const query = searchInput.value.trim();
            if (query) {
                this.mapManager.searchLocation(query);
            }
        };

        searchBtn.addEventListener('click', performSearch);
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    setupMarkerControls() {
        const addMarkerBtn = document.getElementById('add-marker-btn');
        const clearMarkersBtn = document.getElementById('clear-markers-btn');

        addMarkerBtn.addEventListener('click', () => {
            const center = this.mapManager.map.getCenter();
            this.mapManager.addMarker(center.lat, center.lng, 'Marcador Manual');
        });

        clearMarkersBtn.addEventListener('click', () => {
            if (this.mapManager.markers.length > 0) {
                if (confirm('Tem certeza que deseja remover todos os marcadores?')) {
                    this.mapManager.clearAllMarkers();
                }
            }
        });
    }

    setupStatistics() {
        // Atualiza estatísticas periodicamente
        setInterval(() => {
            this.updateStatistics();
        }, 5000);
    }

    updateStatistics() {
        // Simula algumas estatísticas (em um projeto real, isso viria de dados reais)
        const markersCount = this.mapManager.markers.length;
        const distanceTraveled = (markersCount * 0.5).toFixed(1);
        const areasMarked = Math.floor(markersCount / 3);

        document.getElementById('distance-traveled').textContent = `${distanceTraveled} km`;
        document.getElementById('areas-marked').textContent = areasMarked;
    }

    // Método para mostrar notificações
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Remove após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
        setupGeolocationFeedback() {
        const geolocationBtn = document.getElementById('geolocation-btn');
        
        geolocationBtn.addEventListener('click', () => {
            // Feedback visual imediato
            this.showNotification('Buscando sua localização...', 'info');
        });
    }
}