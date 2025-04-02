// Versión mejorada del sistema de pestañas
function initTabs() {
    document.body.addEventListener('click', function (e) {
        if (e.target.classList.contains('tab')) {
            const tab = e.target;
            const endpointBlock = tab.closest('.endpoint');
            const tabId = tab.getAttribute('data-tab');

            if (!endpointBlock || !tabId) return;

            // Desactivar todos los tabs del mismo bloque
            endpointBlock.querySelectorAll('.tab').forEach(t =>
                t.classList.remove('active')
            );
            endpointBlock.querySelectorAll('.tab-content').forEach(c =>
                c.classList.remove('active')
            );

            // Activar el tab seleccionado
            tab.classList.add('active');
            const content = document.getElementById(tabId);
            if (content) content.classList.add('active');
        }
    });

    // Activar el primer tab de cada endpoint por defecto
    document.querySelectorAll('.endpoint').forEach(ep => {
        const firstTab = ep.querySelector('.tab');
        if (firstTab) firstTab.classList.add('active');
        const firstContent = ep.querySelector('.tab-content');
        if (firstContent) firstContent.classList.add('active');
    });
}

// Inicialización
if (document.readyState !== 'loading') {
    initTabs();
} else {
    document.addEventListener('DOMContentLoaded', initTabs);
}