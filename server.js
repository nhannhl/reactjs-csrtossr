// import fs from 'node:fs/promises'
// import express from 'express'

// const isProduction = process.env.NODE_ENV === 'production'
// const port = process.env.PORT || 3000
// const base = process.env.BASE || '/'

// const templateHtml = isProduction
//   ? await fs.readFile('./dist/client/index.html', 'utf-8')
//   : ''
// const ssrManifest = isProduction
//   ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
//   : undefined

// const app = express()

// let vite
// if (!isProduction) {
//   const { createServer } = await import('vite')
//   vite = await createServer({
//     server: { middlewareMode: true },
//     appType: 'custom',
//     base
//   })
//   app.use(vite.middlewares)
// } else {
//   const compression = (await import('compression')).default
//   const sirv = (await import('sirv')).default
//   app.use(compression())
//   app.use(base, sirv('./dist/client', { extensions: [] }))
// }

// app.use('*', async (req, res) => {
//   try {
//     const url = req.originalUrl.replace(base, '')

//     let template
//     let render
//     if (!isProduction) {
//       template = await fs.readFile('./index.html', 'utf-8')
//       template = await vite.transformIndexHtml(url, template)
//       render = (await vite.ssrLoadModule('/src/main-server.jsx')).render
//     } else {
//       template = templateHtml
//       render = (await import('./dist/server/main-server.js')).render
//     }

//     const rendered = await render(url, ssrManifest)

//     const html = template
//       .replace(`<!--app-head-->`, rendered.head ?? '')
//       .replace(`<!--app-html-->`, rendered.html ?? '')

//     res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
//   } catch (e) {
//     vite?.ssrFixStacktrace(e)
//     console.log(e.stack)
//     res.status(500).end(e.stack)
//   }
// })

// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`)
// })

import express from 'express';
import { createServer as createViteServer } from 'vite';
// import { render } from './src/main-server'

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      let template = await vite.transformIndexHtml(url, `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vite SSR</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/src/main-client.jsx"></script>
          </body>
        </html>
      `);

      // const { html, preloadedState } = render(url, {});
      const { html, preloadedState } = (await vite.ssrLoadModule('/src/main-server.jsx')).render(url, {});

      template = template.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div><script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`
      );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
}

createServer();