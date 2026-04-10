
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.sidebar__nav .nav__item');
    const contentArea = document.getElementById('content-area');

    // Função para carregar conteúdo dinamicamente
    async function loadPage(pageName) {
        try {
            // Tenta carregar o arquivo .html correspondente
            const response = await fetch(`${pageName}.html`);
            if (!response.ok) throw new Error('Erro ao carregar a página');
            
            const html = await response.text();
            contentArea.innerHTML = html;
        } catch (error) {
            console.error('Erro:', error);
            contentArea.innerHTML = `
                <div style="padding: 40px; text-align: center;">
                    <h2 style="color: #62748E;">Página em desenvolvimento</h2>
                    <p style="color: #45556C; margin-top: 10px;">A seção "${pageName}" ainda não foi criada.</p>
                </div>
            `;
        }
    }

    // Adiciona evento de clique em cada item do menu
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove classe ativa de todos e adiciona no clicado
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Pega o nome da página do atributo data-page
            const page = item.getAttribute('data-page');
            loadPage(page);
        });
    });

    // Carrega o Dashboard por padrão ao iniciar
    loadPage('dashboard');
});
