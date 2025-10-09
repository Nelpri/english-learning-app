// Sistema de sincronización entre dispositivos
class SyncSystem {
    constructor() {
        this.syncEnabled = false;
        this.lastSyncTime = null;
        this.syncInterval = null;
        this.isOnline = navigator.onLine;

        this.init();
    }

    init() {
        console.log("🔄 Inicializando sistema de sincronización...");

        // Detectar cambios de conexión
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log("🌐 Conexión restaurada");
            this.autoSync();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log("📴 Conexión perdida");
        });

        // Cargar configuración de sincronización
        this.loadSyncSettings();

        // Configurar sincronización automática si está habilitada
        if (this.syncEnabled) {
            this.startAutoSync();
        }

        console.log("✅ Sistema de sincronización inicializado");
    }

    loadSyncSettings() {
        try {
            const syncSettings = localStorage.getItem('syncSettings');
            if (syncSettings) {
                const settings = JSON.parse(syncSettings);
                this.syncEnabled = settings.enabled || false;
                this.lastSyncTime = settings.lastSyncTime || null;
            }
        } catch (error) {
            console.error("❌ Error al cargar configuración de sincronización:", error);
        }
    }

    saveSyncSettings() {
        try {
            const settings = {
                enabled: this.syncEnabled,
                lastSyncTime: this.lastSyncTime
            };
            localStorage.setItem('syncSettings', JSON.stringify(settings));
        } catch (error) {
            console.error("❌ Error al guardar configuración de sincronización:", error);
        }
    }

    enableSync() {
        this.syncEnabled = true;
        this.saveSyncSettings();
        this.startAutoSync();
        console.log("🔄 Sincronización habilitada");
    }

    disableSync() {
        this.syncEnabled = false;
        this.stopAutoSync();
        this.saveSyncSettings();
        console.log("🔄 Sincronización deshabilitada");
    }

    startAutoSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }

        // Sincronizar cada 5 minutos si está online
        this.syncInterval = setInterval(() => {
            if (this.isOnline && this.syncEnabled) {
                this.autoSync();
            }
        }, 5 * 60 * 1000); // 5 minutos

        console.log("⏰ Sincronización automática iniciada");
    }

    stopAutoSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
        console.log("⏰ Sincronización automática detenida");
    }

    async autoSync() {
        if (!this.isOnline || !this.syncEnabled) {
            return;
        }

        try {
            console.log("🔄 Iniciando sincronización automática...");
            await this.syncData();
            console.log("✅ Sincronización automática completada");
        } catch (error) {
            console.error("❌ Error en sincronización automática:", error);
        }
    }

    async syncData() {
        if (!this.isOnline) {
            throw new Error("Sin conexión a internet");
        }

        // Simular llamada a API (por ahora usa localStorage como "nube")
        const syncData = this.prepareSyncData();

        try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000));

            // "Enviar" datos a la "nube"
            const cloudData = await this.simulateCloudSync(syncData);

            // Aplicar cambios desde la nube
            await this.applyCloudChanges(cloudData);

            // Actualizar timestamp de última sincronización
            this.lastSyncTime = new Date().toISOString();
            this.saveSyncSettings();

            return { success: true, timestamp: this.lastSyncTime };

        } catch (error) {
            console.error("❌ Error durante sincronización:", error);
            throw error;
        }
    }

    prepareSyncData() {
        // Preparar datos para sincronizar
        const syncData = {
            timestamp: new Date().toISOString(),
            deviceId: this.getDeviceId(),
            userData: {},
            progressData: {},
            settingsData: {}
        };

        // Datos del usuario
        if (window.appState) {
            syncData.userData = {
                currentXP: window.appState.currentXP,
                currentLevel: window.appState.currentLevel,
                currentLesson: window.appState.currentLesson
            };
        }

        // Datos de progreso
        try {
            syncData.progressData = {
                lessonProgress: JSON.parse(localStorage.getItem('lessonProgress') || '{}'),
                vocabularyProgress: JSON.parse(localStorage.getItem('vocabularyProgress') || '{}'),
                practiceHistory: JSON.parse(localStorage.getItem('practiceHistory') || '[]'),
                achievements: JSON.parse(localStorage.getItem('achievements') || '[]')
            };
        } catch (error) {
            console.error("❌ Error al preparar datos de progreso:", error);
        }

        // Configuración
        try {
            syncData.settingsData = {
                englishLearningSettings: JSON.parse(localStorage.getItem('englishLearningSettings') || '{}'),
                syncSettings: JSON.parse(localStorage.getItem('syncSettings') || '{}')
            };
        } catch (error) {
            console.error("❌ Error al preparar datos de configuración:", error);
        }

        return syncData;
    }

    async simulateCloudSync(localData) {
        // Simular sincronización con "nube" usando localStorage con prefijo cloud_
        const cloudKey = `cloud_${this.getDeviceId()}`;

        try {
            // Obtener datos existentes en la "nube"
            const existingCloudData = JSON.parse(localStorage.getItem(cloudKey) || 'null');

            let mergedData;

            if (!existingCloudData) {
                // Primera sincronización
                mergedData = {
                    ...localData,
                    version: 1
                };
            } else {
                // Fusionar datos locales con datos de la nube
                mergedData = this.mergeSyncData(existingCloudData, localData);
                mergedData.version = (existingCloudData.version || 1) + 1;
            }

            // "Guardar" en la nube
            localStorage.setItem(cloudKey, JSON.stringify(mergedData));

            // Simular respuesta de la nube
            return {
                success: true,
                data: mergedData,
                conflicts: [],
                timestamp: new Date().toISOString()
            };

        } catch (error) {
            throw new Error(`Error en sincronización con nube: ${error.message}`);
        }
    }

    mergeSyncData(cloudData, localData) {
        // Lógica simple de fusión: el dato más reciente gana
        const merged = { ...cloudData };

        // Comparar timestamps
        const cloudTime = new Date(cloudData.timestamp);
        const localTime = new Date(localData.timestamp);

        if (localTime > cloudTime) {
            // Datos locales son más recientes
            merged.userData = { ...merged.userData, ...localData.userData };
            merged.progressData = { ...merged.progressData, ...localData.progressData };
            merged.settingsData = { ...merged.settingsData, ...localData.settingsData };
            merged.timestamp = localData.timestamp;
        }

        return merged;
    }

    async applyCloudChanges(cloudResponse) {
        if (!cloudResponse.success || !cloudResponse.data) {
            return;
        }

        const cloudData = cloudResponse.data;

        try {
            // Aplicar cambios del usuario
            if (cloudData.userData && window.appState) {
                // Solo actualizar si los datos de la nube son más recientes
                const cloudTime = new Date(cloudData.timestamp);
                const lastSyncTime = this.lastSyncTime ? new Date(this.lastSyncTime) : new Date(0);

                if (cloudTime > lastSyncTime) {
                    Object.assign(window.appState, cloudData.userData);
                    console.log("🔄 Datos de usuario actualizados desde la nube");
                }
            }

            // Aplicar cambios de progreso
            if (cloudData.progressData) {
                const cloudTime = new Date(cloudData.timestamp);
                const lastSyncTime = this.lastSyncTime ? new Date(this.lastSyncTime) : new Date(0);

                if (cloudTime > lastSyncTime) {
                    if (cloudData.progressData.lessonProgress) {
                        localStorage.setItem('lessonProgress', JSON.stringify(cloudData.progressData.lessonProgress));
                    }
                    if (cloudData.progressData.vocabularyProgress) {
                        localStorage.setItem('vocabularyProgress', JSON.stringify(cloudData.progressData.vocabularyProgress));
                    }
                    if (cloudData.progressData.practiceHistory) {
                        localStorage.setItem('practiceHistory', JSON.stringify(cloudData.progressData.practiceHistory));
                    }
                    if (cloudData.progressData.achievements) {
                        localStorage.setItem('achievements', JSON.stringify(cloudData.progressData.achievements));
                    }
                    console.log("🔄 Datos de progreso actualizados desde la nube");
                }
            }

            // Aplicar cambios de configuración
            if (cloudData.settingsData) {
                const cloudTime = new Date(cloudData.timestamp);
                const lastSyncTime = this.lastSyncTime ? new Date(this.lastSyncTime) : new Date(0);

                if (cloudTime > lastSyncTime) {
                    if (cloudData.settingsData.englishLearningSettings) {
                        localStorage.setItem('englishLearningSettings', JSON.stringify(cloudData.settingsData.englishLearningSettings));
                    }
                    console.log("🔄 Configuración actualizada desde la nube");
                }
            }

            // Actualizar UI si es necesario
            if (typeof updateUI === 'function') {
                updateUI();
            }

        } catch (error) {
            console.error("❌ Error al aplicar cambios desde la nube:", error);
        }
    }

    getDeviceId() {
        // Generar un ID único para este dispositivo
        let deviceId = localStorage.getItem('deviceId');
        if (!deviceId) {
            deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('deviceId', deviceId);
        }
        return deviceId;
    }

    getSyncStatus() {
        return {
            enabled: this.syncEnabled,
            online: this.isOnline,
            lastSyncTime: this.lastSyncTime,
            deviceId: this.getDeviceId()
        };
    }

    async manualSync() {
        try {
            console.log("🔄 Iniciando sincronización manual...");
            const result = await this.syncData();

            if (result.success) {
                showNotification('Sincronización completada correctamente', 'success');
                return result;
            } else {
                throw new Error('Sincronización fallida');
            }

        } catch (error) {
            console.error("❌ Error en sincronización manual:", error);
            showNotification('Error durante la sincronización', 'error');
            throw error;
        }
    }

    createSyncUI() {
        const syncContainer = document.createElement('div');
        syncContainer.id = 'syncContainer';
        syncContainer.innerHTML = `
            <div class="sync-status">
                <div class="sync-indicator ${this.isOnline ? 'online' : 'offline'}">
                    <i class="fas ${this.isOnline ? 'fa-wifi' : 'fa-wifi-slash'}"></i>
                    <span>${this.isOnline ? 'En línea' : 'Sin conexión'}</span>
                </div>
                <div class="sync-controls">
                    <button class="btn btn-secondary" onclick="syncSystem.manualSync()">
                        <i class="fas fa-sync-alt"></i> Sincronizar ahora
                    </button>
                    <button class="btn btn-secondary" onclick="syncSystem.toggleAutoSync()">
                        <i class="fas ${this.syncEnabled ? 'fa-toggle-on' : 'fa-toggle-off'}"></i>
                        ${this.syncEnabled ? 'Desactivar' : 'Activar'} auto-sync
                    </button>
                </div>
            </div>
            <div class="sync-info">
                <p><strong>Última sincronización:</strong> ${this.lastSyncTime ? new Date(this.lastSyncTime).toLocaleString() : 'Nunca'}</p>
                <p><strong>ID del dispositivo:</strong> ${this.getDeviceId().substring(0, 12)}...</p>
            </div>
        `;

        return syncContainer;
    }

    toggleAutoSync() {
        if (this.syncEnabled) {
            this.disableSync();
            showNotification('Sincronización automática desactivada', 'info');
        } else {
            this.enableSync();
            showNotification('Sincronización automática activada', 'success');
        }

        // Actualizar UI si existe
        this.updateSyncUI();
    }

    updateSyncUI() {
        const syncContainer = document.getElementById('syncContainer');
        if (syncContainer) {
            const newUI = this.createSyncUI();
            syncContainer.innerHTML = newUI.innerHTML;
        }
    }
}

// Instancia global del sistema de sincronización
window.syncSystem = new SyncSystem();

// Funciones globales para acceso desde HTML
window.enableSync = () => window.syncSystem.enableSync();
window.disableSync = () => window.syncSystem.disableSync();
window.manualSync = () => window.syncSystem.manualSync();
window.getSyncStatus = () => window.syncSystem.getSyncStatus();