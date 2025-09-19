// Sistema de interacciones mejorado para mejor UX

class InteractionSystem {
    constructor() {
        this.touchStartY = 0;
        this.touchStartX = 0;
        this.isScrolling = false;
        this.lastTouchTime = 0;
        this.doubleTapDelay = 300;
        this.longPressDelay = 500;
        this.longPressTimer = null;
        this.vibrationEnabled = 'vibrate' in navigator;
        
        this.initInteractionSystem();
    }

    // Inicializar sistema de interacciones
    initInteractionSystem() {
        try {
            this.setupTouchEvents();
            this.setupKeyboardEvents();
            this.setupHoverEvents();
            this.setupFocusEvents();
            this.setupScrollEvents();
            this.setupResizeEvents();
            
            console.log("🎯 Sistema de interacciones inicializado");
        } catch (error) {
            console.error("❌ Error al inicializar sistema de interacciones:", error);
        }
    }

    // Configurar eventos táctiles
    setupTouchEvents() {
        document.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            this.handleTouchMove(e);
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            this.handleTouchEnd(e);
        }, { passive: true });

        // Prevenir zoom en doble tap
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - this.lastTouchTime < this.doubleTapDelay) {
                e.preventDefault();
            }
            this.lastTouchTime = now;
        });
    }

    // Manejar inicio de toque
    handleTouchStart(e) {
        const touch = e.touches[0];
        this.touchStartY = touch.clientY;
        this.touchStartX = touch.clientX;
        this.isScrolling = false;

        // Configurar long press
        this.longPressTimer = setTimeout(() => {
            this.handleLongPress(e);
        }, this.longPressDelay);

        // Agregar clase de toque activo
        if (e.target.closest('.btn, .option-btn, .nav-tab')) {
            e.target.closest('.btn, .option-btn, .nav-tab').classList.add('touch-active');
        }
    }

    // Manejar movimiento de toque
    handleTouchMove(e) {
        const touch = e.touches[0];
        const deltaY = Math.abs(touch.clientY - this.touchStartY);
        const deltaX = Math.abs(touch.clientX - this.touchStartX);
        
        if (deltaY > 10 || deltaX > 10) {
            this.isScrolling = true;
            if (this.longPressTimer) {
                clearTimeout(this.longPressTimer);
                this.longPressTimer = null;
            }
        }
    }

    // Manejar fin de toque
    handleTouchEnd(e) {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }

        // Remover clase de toque activo
        document.querySelectorAll('.touch-active').forEach(el => {
            el.classList.remove('touch-active');
        });

        // Vibrar si es un toque válido
        if (!this.isScrolling && this.vibrationEnabled) {
            navigator.vibrate(50);
        }
    }

    // Manejar long press
    handleLongPress(e) {
        const target = e.target.closest('.btn, .option-btn, .nav-tab');
        if (target) {
            target.classList.add('long-press');
            this.vibrate([100, 50, 100]);
            
            // Mostrar tooltip o menú contextual
            this.showContextMenu(target, e);
        }
    }

    // Configurar eventos de teclado
    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });

        document.addEventListener('keyup', (e) => {
            this.handleKeyUp(e);
        });
    }

    // Manejar teclas presionadas
    handleKeyDown(e) {
        // Navegación con teclado
        if (e.key === 'Tab') {
            this.handleTabNavigation(e);
        }

        // Atajos de teclado
        if (e.ctrlKey || e.metaKey) {
            this.handleKeyboardShortcuts(e);
        }

        // Enter y Space para botones
        if (e.key === 'Enter' || e.key === ' ') {
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.classList.contains('btn') || activeElement.classList.contains('option-btn'))) {
                e.preventDefault();
                activeElement.click();
            }
        }

        // Escape para cerrar modales
        if (e.key === 'Escape') {
            this.handleEscapeKey(e);
        }
    }

    // Manejar teclas liberadas
    handleKeyUp(e) {
        // Remover clases de teclado activo
        document.querySelectorAll('.keyboard-active').forEach(el => {
            el.classList.remove('keyboard-active');
        });
    }

    // Manejar navegación con Tab
    handleTabNavigation(e) {
        const focusableElements = this.getFocusableElements();
        const currentIndex = focusableElements.indexOf(document.activeElement);
        
        if (e.shiftKey) {
            // Tab hacia atrás
            if (currentIndex > 0) {
                focusableElements[currentIndex - 1].focus();
            } else {
                focusableElements[focusableElements.length - 1].focus();
            }
        } else {
            // Tab hacia adelante
            if (currentIndex < focusableElements.length - 1) {
                focusableElements[currentIndex + 1].focus();
            } else {
                focusableElements[0].focus();
            }
        }
    }

    // Obtener elementos enfocables
    getFocusableElements() {
        const focusableSelectors = [
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])'
        ];
        
        return Array.from(document.querySelectorAll(focusableSelectors.join(', ')))
            .filter(el => el.offsetParent !== null);
    }

    // Manejar atajos de teclado
    handleKeyboardShortcuts(e) {
        switch (e.key) {
            case '1':
                this.switchToTab('learn');
                break;
            case '2':
                this.switchToTab('practice');
                break;
            case '3':
                this.switchToTab('vocabulary');
                break;
            case '4':
                this.switchToTab('apply');
                break;
            case '5':
                this.switchToTab('progress');
                break;
            case 'h':
                this.showHelp();
                break;
            case 's':
                this.toggleSettings();
                break;
        }
    }

    // Cambiar a pestaña
    switchToTab(tabName) {
        const tab = document.querySelector(`.nav-tab[data-tab="${tabName}"]`);
        if (tab) {
            tab.click();
            this.showNotification(`Cambiado a pestaña: ${tabName}`, 'info', 1000);
        }
    }

    // Manejar tecla Escape
    handleEscapeKey(e) {
        // Cerrar modales abiertos
        const openModal = document.querySelector('.modal:not(.d-none)');
        if (openModal) {
            openModal.style.display = 'none';
            return;
        }

        // Cerrar notificaciones
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.classList.remove('show');
        });
    }

    // Configurar eventos de hover
    setupHoverEvents() {
        // Solo en dispositivos que soportan hover
        if (window.matchMedia('(hover: hover)').matches) {
            document.addEventListener('mouseover', (e) => {
                this.handleHover(e);
            });

            document.addEventListener('mouseout', (e) => {
                this.handleHoverOut(e);
            });
        }
    }

    // Manejar hover
    handleHover(e) {
        const target = e.target.closest('.btn, .option-btn, .nav-tab, .card');
        if (target) {
            target.classList.add('hover-active');
        }
    }

    // Manejar hover out
    handleHoverOut(e) {
        const target = e.target.closest('.btn, .option-btn, .nav-tab, .card');
        if (target) {
            target.classList.remove('hover-active');
        }
    }

    // Configurar eventos de foco
    setupFocusEvents() {
        document.addEventListener('focusin', (e) => {
            this.handleFocusIn(e);
        });

        document.addEventListener('focusout', (e) => {
            this.handleFocusOut(e);
        });
    }

    // Manejar foco
    handleFocusIn(e) {
        const target = e.target.closest('.btn, .option-btn, .nav-tab');
        if (target) {
            target.classList.add('focus-active');
        }
    }

    // Manejar pérdida de foco
    handleFocusOut(e) {
        const target = e.target.closest('.btn, .option-btn, .nav-tab');
        if (target) {
            target.classList.remove('focus-active');
        }
    }

    // Configurar eventos de scroll
    setupScrollEvents() {
        let scrollTimer = null;
        
        window.addEventListener('scroll', () => {
            // Mostrar/ocultar header en scroll
            this.handleScrollHeader();
            
            // Lazy loading de imágenes
            this.handleLazyLoading();
            
            // Limpiar timer anterior
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            
            // Marcar como scrolleando
            document.body.classList.add('scrolling');
            
            // Limpiar clase después de parar
            scrollTimer = setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 150);
        }, { passive: true });
    }

    // Manejar scroll del header
    handleScrollHeader() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // Manejar lazy loading
    handleLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            if (this.isElementInViewport(img)) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            }
        });
    }

    // Verificar si elemento está en viewport
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Configurar eventos de redimensionamiento
    setupResizeEvents() {
        let resizeTimer = null;
        
        window.addEventListener('resize', () => {
            // Limpiar timer anterior
            if (resizeTimer) {
                clearTimeout(resizeTimer);
            }
            
            // Marcar como redimensionando
            document.body.classList.add('resizing');
            
            // Limpiar clase después de parar
            resizeTimer = setTimeout(() => {
                document.body.classList.remove('resizing');
                this.handleResize();
            }, 150);
        });
    }

    // Manejar redimensionamiento
    handleResize() {
        // Ajustar layout según tamaño de pantalla
        this.adjustLayout();
        
        // Recalcular posiciones de elementos flotantes
        this.repositionFloatingElements();
    }

    // Ajustar layout
    adjustLayout() {
        const width = window.innerWidth;
        
        // Ajustar grid según ancho
        const grids = document.querySelectorAll('.grid');
        grids.forEach(grid => {
            if (width < 768) {
                grid.classList.add('mobile-grid');
            } else {
                grid.classList.remove('mobile-grid');
            }
        });
    }

    // Reposicionar elementos flotantes
    repositionFloatingElements() {
        const floatingElements = document.querySelectorAll('.notification, .modal');
        floatingElements.forEach(el => {
            // Recalcular posición si es necesario
            if (el.style.position === 'fixed') {
                el.style.left = '50%';
                el.style.transform = 'translateX(-50%)';
            }
        });
    }

    // Mostrar menú contextual
    showContextMenu(target, e) {
        const contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.innerHTML = `
            <div class="context-menu-item" onclick="this.parentElement.remove()">
                <i class="fas fa-info-circle"></i> Información
            </div>
            <div class="context-menu-item" onclick="this.parentElement.remove()">
                <i class="fas fa-copy"></i> Copiar
            </div>
        `;
        
        contextMenu.style.cssText = `
            position: fixed;
            top: ${e.touches ? e.touches[0].clientY : e.clientY}px;
            left: ${e.touches ? e.touches[0].clientX : e.clientX}px;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            padding: 0.5rem 0;
        `;
        
        document.body.appendChild(contextMenu);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            if (contextMenu.parentNode) {
                contextMenu.remove();
            }
        }, 3000);
    }

    // Vibrar dispositivo
    vibrate(pattern) {
        if (this.vibrationEnabled) {
            navigator.vibrate(pattern);
        }
    }

    // Mostrar notificación
    showNotification(message, type = 'info', duration = 3000) {
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type, duration);
        }
    }

    // Mostrar ayuda
    showHelp() {
        const helpModal = document.createElement('div');
        helpModal.className = 'modal';
        helpModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Atajos de Teclado</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="help-content">
                    <h4>Navegación:</h4>
                    <ul>
                        <li><kbd>Ctrl + 1</kbd> - Aprender</li>
                        <li><kbd>Ctrl + 2</kbd> - Practicar</li>
                        <li><kbd>Ctrl + 3</kbd> - Vocabulario</li>
                        <li><kbd>Ctrl + 4</kbd> - Aplicar</li>
                        <li><kbd>Ctrl + 5</kbd> - Progreso</li>
                    </ul>
                    <h4>General:</h4>
                    <ul>
                        <li><kbd>Tab</kbd> - Navegar elementos</li>
                        <li><kbd>Enter</kbd> - Activar botón</li>
                        <li><kbd>Escape</kbd> - Cerrar modales</li>
                        <li><kbd>Ctrl + H</kbd> - Mostrar ayuda</li>
                    </ul>
                </div>
            </div>
        `;
        
        document.body.appendChild(helpModal);
    }

    // Alternar configuración
    toggleSettings() {
        this.showNotification('Configuración no disponible aún', 'info');
    }

    // Obtener estado del sistema
    getInteractionStatus() {
        return {
            vibrationEnabled: this.vibrationEnabled,
            touchSupported: 'ontouchstart' in window,
            hoverSupported: window.matchMedia('(hover: hover)').matches,
            keyboardSupported: true
        };
    }
}

// Instancia global del sistema de interacciones
const interactionSystem = new InteractionSystem();

// Exportar funciones globales
window.interactionSystem = interactionSystem;

console.log("✅ Sistema de interacciones cargado");
