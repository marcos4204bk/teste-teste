# Power Buscas

MVP mobile-first de página única para teste de mercado no Facebook Ads. Desenvolvido com React + Vite + TailwindCSS, pronto para build estático em ambientes como cPanel/HostGator.

## Requisitos
- Node.js 18+
- npm

## Instalação
1. Instale dependências:
   ```bash
   npm install
   ```
2. Execute em desenvolvimento:
   ```bash
   npm run dev
   ```

## Build
Gerar pacote estático em `dist/`:
```bash
npm run build
```

## Deploy (cPanel / HostGator)
1. Execute o build para gerar a pasta `dist/`.
2. Faça upload do conteúdo de `dist/` para a pasta `public_html` (ou diretório raiz do site) via FTP ou gerenciador de arquivos do cPanel.
3. Certifique-se de que `index.html` esteja diretamente dentro de `public_html`.

## Notas
- O Facebook Pixel é carregado globalmente (ID: 1444712979358187) e eventos chave são disparados conforme interações descritas no código.
- O app é 100% frontend; formulários não possuem backend real.
