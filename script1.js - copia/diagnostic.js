// Módulo de diagnóstico de nivel: lógica, evaluación y resultado

function showDiagnosticModal(onFinish) {
    document.getElementById('diagnosticModal').style.display = 'block';
    document.getElementById('authOverlay').style.display = 'block';
    // Reset resultado
    document.getElementById('diagnosticResult').style.display = 'none';
    if (typeof onFinish === 'function') {
        window._diagnosticOnFinish = onFinish;
    }
}

function hideDiagnosticModal() {
    document.getElementById('diagnosticModal').style.display = 'none';
    document.getElementById('authOverlay').style.display = 'none';
}

function evaluateDiagnostic(formData) {
    // Respuestas correctas del diagnóstico (según el HTML)
    const correctAnswers = {
        q1: 'a', // Gato
        q2: 'c', // Thanks
        q3: 'b', // reads
        q4: 'a', // What's
        q5: 'b', // children
        q6: 'b', // went
        q7: 'b', // been
        q8: 'c', // were
        q9: 'c', // lying
        q10: 'a', // attend
        q11: 'c', // was completed
        q12: 'b' // does
    };
    let score = 0;
    for (const key in correctAnswers) {
        if (formData[key] === correctAnswers[key]) score++;
    }
    // Asignar nivel MCER según score
    let mcer = 'A1';
    if (score >= 4 && score <= 6) mcer = 'A2';
    else if (score >= 7 && score <= 9) mcer = 'B1';
    else if (score >= 10 && score <= 11) mcer = 'B2';
    else if (score === 12) mcer = 'C1';
    // Guardar nivel en usuario
    const session = JSON.parse(localStorage.getItem('englishLearningSession') || 'null');
    if (session && session.email) {
        let users = JSON.parse(localStorage.getItem('englishLearningUsers') || '[]');
        users = users.map(u => u.email === session.email ? { ...u, mcer } : u);
        localStorage.setItem('englishLearningUsers', JSON.stringify(users));
    }
    showDiagnosticResult({ score, mcer });
    if (window._diagnosticOnFinish) window._diagnosticOnFinish({ score, mcer });
}

function showDiagnosticResult(result) {
    const resultDiv = document.getElementById('diagnosticResult');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<h3>¡Diagnóstico completado!</h3>
        <p>Respuestas correctas: <strong>${result.score}</strong> de 12</p>
        <p>Tu nivel estimado es: <strong>${result.mcer}</strong></p>`;
}

// Exponer funciones globalmente
window.showDiagnosticModal = showDiagnosticModal;
window.hideDiagnosticModal = hideDiagnosticModal;
window.evaluateDiagnostic = evaluateDiagnostic;
window.showDiagnosticResult = showDiagnosticResult;
