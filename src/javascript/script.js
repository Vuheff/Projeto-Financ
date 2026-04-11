document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.sidebar__nav .nav__item');
    const contentArea = document.getElementById('content-area');

  
    async function loadPage(pageName) {
        try {
            const response = await fetch(`${pageName}.html`);
            if (!response.ok) throw new Error('Erro ao carregar a página');
            
            const html = await response.text();
            contentArea.innerHTML = html;
            console.log(`Página ${pageName} carregada!`);
        } catch (error) {
            console.error('Erro:', error);
            contentArea.innerHTML = `
                <div class="error-container">
                    <h2>Página em desenvolvimento</h2>
                    <p>A seção "${pageName}" ainda não foi criada.</p>
                </div>
            `;
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            const page = item.getAttribute('data-page');
            loadPage(page);
        });
    });

    // Carrega o Dashboard por padrão
    loadPage('dashboard');

    // --- NOVA LÓGICA PARA O MODAL (ADICIONADA) ---
    document.addEventListener('click', (event) => {
        // 1. Abrir o Modal (Botão + Nova Transação)
        if (event.target.closest('.botão-transação')) {
            const modal = document.getElementById('modal-overlay');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        // 2. Fechar o Modal (Botão X)
        if (event.target.closest('#close-modal')) {
            fecharModal();
        }

        // 3. Fechar o Modal (Clicar no fundo escuro)
        if (event.target.id === 'modal-overlay') {
            fecharModal();
        }

        // 4. Alternar entre Receita e Despesa
        const typeBtn = event.target.closest('.type-btn');
        if (typeBtn) {
            document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
            typeBtn.classList.add('active');
        }
    });

    function fecharModal() {
        const modal = document.getElementById('modal-overlay');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});
