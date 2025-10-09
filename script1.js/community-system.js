// Sistema básico de comunidad de usuarios
class CommunitySystem {
    constructor() {
        this.communityData = {
            leaderboard: [],
            userAchievements: [],
            reviews: [],
            sharedProgress: []
        };

        this.currentUser = null;
        this.init();
    }

    init() {
        console.log("👥 Inicializando sistema de comunidad...");
        this.loadCommunityData();
        this.currentUser = this.getCurrentUser();
        console.log("✅ Sistema de comunidad inicializado");
    }

    getCurrentUser() {
        try {
            // Obtener usuario actual del sistema de autenticación
            if (window.appState && window.appState.currentUser) {
                return window.appState.currentUser;
            }

            // Fallback: usuario guest
            return {
                id: 'guest_' + Date.now(),
                name: 'Usuario',
                email: 'guest@example.com',
                level: 1,
                xp: 0
            };
        } catch (error) {
            console.error("❌ Error al obtener usuario actual:", error);
            return null;
        }
    }

    loadCommunityData() {
        try {
            // Cargar datos de comunidad desde localStorage (simulando una base de datos compartida)
            const storedData = localStorage.getItem('communityData');
            if (storedData) {
                this.communityData = { ...this.communityData, ...JSON.parse(storedData) };
            }
            console.log("✅ Datos de comunidad cargados");
        } catch (error) {
            console.error("❌ Error al cargar datos de comunidad:", error);
        }
    }

    saveCommunityData() {
        try {
            localStorage.setItem('communityData', JSON.stringify(this.communityData));
            console.log("💾 Datos de comunidad guardados");
        } catch (error) {
            console.error("❌ Error al guardar datos de comunidad:", error);
        }
    }

    // Sistema de leaderboard/ranking
    updateLeaderboard() {
        try {
            // Simular datos de otros usuarios (en producción vendrían de una API)
            const mockUsers = [
                { id: 'user1', name: 'Ana García', level: 5, xp: 1250, achievements: 12 },
                { id: 'user2', name: 'Carlos López', level: 4, xp: 980, achievements: 9 },
                { id: 'user3', name: 'María Rodríguez', level: 6, xp: 1450, achievements: 15 },
                { id: 'user4', name: 'Juan Pérez', level: 3, xp: 750, achievements: 7 },
                { id: 'user5', name: 'Laura Martínez', level: 4, xp: 1020, achievements: 11 }
            ];

            // Agregar usuario actual si existe
            if (this.currentUser) {
                const currentUserData = {
                    id: this.currentUser.id,
                    name: this.currentUser.name || 'Tú',
                    level: window.appState?.currentLevel || 1,
                    xp: window.appState?.currentXP || 0,
                    achievements: this.getUserAchievementsCount(),
                    isCurrentUser: true
                };
                mockUsers.push(currentUserData);
            }

            // Ordenar por XP descendente
            this.communityData.leaderboard = mockUsers.sort((a, b) => b.xp - a.xp);

            this.saveCommunityData();
            console.log("🏆 Leaderboard actualizado");

        } catch (error) {
            console.error("❌ Error al actualizar leaderboard:", error);
        }
    }

    getUserAchievementsCount() {
        try {
            // Contar logros desbloqueados
            if (window.ACHIEVEMENTS_SYSTEM && window.ACHIEVEMENTS_SYSTEM.achievements) {
                return window.ACHIEVEMENTS_SYSTEM.achievements.filter(a => a.unlocked).length;
            }
            return 0;
        } catch (error) {
            return 0;
        }
    }

    // Sistema de reseñas y comentarios
    addReview(content, rating = 5) {
        try {
            if (!this.currentUser) {
                showNotification('Debes iniciar sesión para dejar reseñas', 'warning');
                return false;
            }

            const review = {
                id: 'review_' + Date.now(),
                userId: this.currentUser.id,
                userName: this.currentUser.name,
                content: content,
                rating: rating,
                timestamp: new Date().toISOString(),
                likes: 0,
                helpful: 0
            };

            this.communityData.reviews.unshift(review);
            this.saveCommunityData();

            showNotification('¡Reseña publicada!', 'success');
            console.log("📝 Reseña agregada:", review);
            return true;

        } catch (error) {
            console.error("❌ Error al agregar reseña:", error);
            showNotification('Error al publicar la reseña', 'error');
            return false;
        }
    }

    // Sistema de logros compartidos
    shareAchievement(achievementId) {
        try {
            if (!this.currentUser) return false;

            const achievement = window.ACHIEVEMENTS_SYSTEM?.achievements?.find(a => a.id === achievementId);
            if (!achievement || !achievement.unlocked) return false;

            const sharedAchievement = {
                id: 'shared_' + Date.now(),
                userId: this.currentUser.id,
                userName: this.currentUser.name,
                achievementId: achievementId,
                achievementTitle: achievement.title,
                achievementDescription: achievement.description,
                timestamp: new Date().toISOString(),
                likes: 0
            };

            this.communityData.sharedProgress.push(sharedAchievement);
            this.saveCommunityData();

            showNotification(`¡Logro "${achievement.title}" compartido!`, 'success');
            console.log("🎉 Logro compartido:", sharedAchievement);
            return true;

        } catch (error) {
            console.error("❌ Error al compartir logro:", error);
            return false;
        }
    }

    // Sistema de consejos y motivación
    getMotivationalTips() {
        const tips = [
            "¡Sigue practicando! La consistencia es la clave del éxito.",
            "Cada palabra nueva es un paso más hacia la fluidez.",
            "No te desanimes por los errores, son parte del aprendizaje.",
            "Practica diariamente, aunque sea solo 10 minutos.",
            "Comparte tus logros con la comunidad para motivar a otros.",
            "El aprendizaje de idiomas es un viaje, disfruta el proceso.",
            "Celebra cada lección completada, ¡eres increíble!",
            "Recuerda por qué empezaste, tu motivación te llevará lejos."
        ];

        return tips[Math.floor(Math.random() * tips.length)];
    }

    // Crear UI de comunidad
    createCommunityUI() {
        const communityContainer = document.createElement('div');
        communityContainer.className = 'community-container';

        communityContainer.innerHTML = `
            <h2><i class="fas fa-users"></i> Comunidad</h2>

            <!-- Mensaje motivacional -->
            <div class="motivational-banner">
                <div class="motivational-content">
                    <i class="fas fa-lightbulb"></i>
                    <p id="motivationalTip">${this.getMotivationalTips()}</p>
                    <button class="btn btn-secondary" onclick="communitySystem.refreshMotivationalTip()">
                        <i class="fas fa-sync-alt"></i> Otro consejo
                    </button>
                </div>
            </div>

            <!-- Leaderboard -->
            <div class="community-section">
                <h3><i class="fas fa-trophy"></i> Ranking de la Comunidad</h3>
                <div id="leaderboardContainer">
                    <!-- El leaderboard se cargará aquí -->
                </div>
            </div>

            <!-- Logros compartidos -->
            <div class="community-section">
                <h3><i class="fas fa-star"></i> Logros Recientes</h3>
                <div id="sharedAchievementsContainer">
                    <!-- Los logros compartidos se cargarán aquí -->
                </div>
            </div>

            <!-- Reseñas -->
            <div class="community-section">
                <h3><i class="fas fa-comments"></i> Reseñas de Usuarios</h3>
                <div id="reviewsContainer">
                    <!-- Las reseñas se cargarán aquí -->
                </div>

                <!-- Formulario para agregar reseña -->
                <div class="add-review-section">
                    <h4>Comparte tu opinión</h4>
                    <div class="review-form">
                        <div class="rating-stars">
                            <span>Calificación:</span>
                            <div class="stars" id="ratingStars">
                                ${[1,2,3,4,5].map(i => `<i class="far fa-star" data-rating="${i}"></i>`).join('')}
                            </div>
                        </div>
                        <textarea id="reviewContent" placeholder="¿Qué te parece la aplicación? Comparte tu experiencia..." rows="3"></textarea>
                        <button class="btn btn-primary" onclick="communitySystem.submitReview()">
                            <i class="fas fa-paper-plane"></i> Publicar Reseña
                        </button>
                    </div>
                </div>
            </div>
        `;

        return communityContainer;
    }

    refreshMotivationalTip() {
        const tipElement = document.getElementById('motivationalTip');
        if (tipElement) {
            tipElement.textContent = this.getMotivationalTips();
        }
    }

    createLeaderboardUI() {
        this.updateLeaderboard();

        const leaderboardHTML = this.communityData.leaderboard.map((user, index) => `
            <div class="leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}">
                <div class="rank">${index + 1}</div>
                <div class="user-info">
                    <div class="user-name">${user.name} ${user.isCurrentUser ? '(Tú)' : ''}</div>
                    <div class="user-stats">
                        Nivel ${user.level} • ${user.xp} XP • ${user.achievements} logros
                    </div>
                </div>
                <div class="user-score">${user.xp}</div>
            </div>
        `).join('');

        return `<div class="leaderboard">${leaderboardHTML}</div>`;
    }

    createSharedAchievementsUI() {
        if (this.communityData.sharedProgress.length === 0) {
            return '<p class="no-content">No hay logros compartidos aún. ¡Sé el primero en compartir tus logros!</p>';
        }

        const achievementsHTML = this.communityData.sharedProgress.slice(0, 5).map(achievement => `
            <div class="shared-achievement-card">
                <div class="achievement-header">
                    <strong>${achievement.userName}</strong> desbloqueó un logro
                    <span class="timestamp">${this.formatTimestamp(achievement.timestamp)}</span>
                </div>
                <div class="achievement-content">
                    <i class="fas fa-trophy achievement-icon"></i>
                    <div class="achievement-details">
                        <h4>${achievement.achievementTitle}</h4>
                        <p>${achievement.achievementDescription}</p>
                    </div>
                </div>
                <div class="achievement-actions">
                    <button class="like-btn" onclick="communitySystem.likeAchievement('${achievement.id}')">
                        <i class="fas fa-heart"></i> ${achievement.likes}
                    </button>
                </div>
            </div>
        `).join('');

        return `<div class="shared-achievements">${achievementsHTML}</div>`;
    }

    createReviewsUI() {
        if (this.communityData.reviews.length === 0) {
            return '<p class="no-content">No hay reseñas aún. ¡Sé el primero en compartir tu opinión!</p>';
        }

        const reviewsHTML = this.communityData.reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <strong>${review.userName}</strong>
                    <div class="review-rating">
                        ${this.createStarRating(review.rating)}
                    </div>
                    <span class="timestamp">${this.formatTimestamp(review.timestamp)}</span>
                </div>
                <div class="review-content">
                    <p>${review.content}</p>
                </div>
                <div class="review-actions">
                    <button class="helpful-btn" onclick="communitySystem.markHelpful('${review.id}')">
                        <i class="fas fa-thumbs-up"></i> Útil (${review.helpful})
                    </button>
                </div>
            </div>
        `).join('');

        return `<div class="reviews-list">${reviewsHTML}</div>`;
    }

    createStarRating(rating) {
        return [1,2,3,4,5].map(i =>
            `<i class="${i <= rating ? 'fas' : 'far'} fa-star"></i>`
        ).join('');
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours < 1) {
            return 'Hace menos de una hora';
        } else if (diffHours < 24) {
            return `Hace ${Math.floor(diffHours)} horas`;
        } else {
            return date.toLocaleDateString();
        }
    }

    submitReview() {
        const content = document.getElementById('reviewContent')?.value?.trim();
        const rating = this.getSelectedRating();

        if (!content) {
            showNotification('Por favor escribe tu reseña', 'warning');
            return;
        }

        if (this.addReview(content, rating)) {
            // Limpiar formulario
            document.getElementById('reviewContent').value = '';
            this.resetRatingStars();

            // Actualizar UI
            this.refreshCommunityUI();
        }
    }

    getSelectedRating() {
        // Obtener rating seleccionado de las estrellas
        const stars = document.querySelectorAll('#ratingStars i');
        let rating = 5; // Default

        stars.forEach((star, index) => {
            if (star.classList.contains('fas')) {
                rating = index + 1;
            }
        });

        return rating;
    }

    resetRatingStars() {
        const stars = document.querySelectorAll('#ratingStars i');
        stars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
    }

    likeAchievement(achievementId) {
        const achievement = this.communityData.sharedProgress.find(a => a.id === achievementId);
        if (achievement) {
            achievement.likes++;
            this.saveCommunityData();
            this.refreshCommunityUI();
        }
    }

    markHelpful(reviewId) {
        const review = this.communityData.reviews.find(r => r.id === reviewId);
        if (review) {
            review.helpful++;
            this.saveCommunityData();
            this.refreshCommunityUI();
        }
    }

    refreshCommunityUI() {
        // Actualizar leaderboard
        const leaderboardContainer = document.getElementById('leaderboardContainer');
        if (leaderboardContainer) {
            leaderboardContainer.innerHTML = this.createLeaderboardUI();
        }

        // Actualizar logros compartidos
        const achievementsContainer = document.getElementById('sharedAchievementsContainer');
        if (achievementsContainer) {
            achievementsContainer.innerHTML = this.createSharedAchievementsUI();
        }

        // Actualizar reseñas
        const reviewsContainer = document.getElementById('reviewsContainer');
        if (reviewsContainer) {
            reviewsContainer.innerHTML = this.createReviewsUI();
        }
    }

    showCommunity() {
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = '';
            mainContent.appendChild(this.createCommunityUI());

            // Configurar event listeners para las estrellas de rating
            this.setupRatingStars();

            // Cargar datos iniciales
            this.refreshCommunityUI();
        }
    }

    setupRatingStars() {
        const stars = document.querySelectorAll('#ratingStars i');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                // Reset all stars
                stars.forEach(s => {
                    s.classList.remove('fas');
                    s.classList.add('far');
                });

                // Fill stars up to clicked one
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.remove('far');
                    stars[i].classList.add('fas');
                }
            });
        });
    }
}

// Instancia global del sistema de comunidad
window.communitySystem = new CommunitySystem();

// Funciones globales para acceso desde HTML
window.showCommunity = () => window.communitySystem.showCommunity();