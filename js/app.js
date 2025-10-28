// js/app.js
class MapExplorerApp {
    constructor() {
        this.mapManager = null;
        this.geolocationManager = null;
        this.uiManager = null;
        this.initApp();
    }

    initApp() {
        // Aguarda o DOM carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.startApp();
            });
        } else {
            this.startApp();
        }
    }

    startApp() {
        try {
            // Inicializa componentes
            this.mapManager = new MapManager();
            this.geolocationManager = new GeolocationManager(this.mapManager);
            this.uiManager = new UIManager(this.mapManager);

            // Torna acessível globalmente para eventos HTML
            window.mapManager = this.mapManager;

            console.log('MapExplorer App inicializado com sucesso!');
            
            // Mostra notificação de boas-vindas
            setTimeout(() => {
                this.uiManager.showNotification('MapExplorer carregado com sucesso!', 'success');
            }, 1000);

        } catch (error) {
            console.error('Erro ao inicializar aplicação:', error);
            alert('Erro ao carregar o mapa. Verifique o console para detalhes.');
        }
    }
}

// Inicializa a aplicação
const app = new MapExplorerApp();