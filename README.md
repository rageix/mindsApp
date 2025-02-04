# hobortApp

## Deploy to Vercel

From windows:

`ubuntu`

`cd /mnt/c/...path/hobortApp`

`nvm install 22`

`rm -rf node_modules`

`npm install`

`vercel build`

`vercel deploy --prebuilt`

If deploy looks good then promote it to production though the interface or cli

`vercel --prod`