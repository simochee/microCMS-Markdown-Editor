import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { poweredBy } from 'hono/powered-by'

const app = new Hono<{
    Bindings: {
        GYAZO_ACCESS_TOKEN: string
        GYAZO_COLLECTION_ID: string
    }
}>()

app.use('*', poweredBy())

app.post('/api/gyazo/images', async (c) => {
    const blob = await c.req.blob();
    const form = new FormData();

    console.log(c.env.GYAZO_ACCESS_TOKEN, c.env.GYAZO_COLLECTION_ID)

    form.append('access_token', c.env.GYAZO_ACCESS_TOKEN);
    form.append('collection_id', c.env.GYAZO_COLLECTION_ID);
    form.append('imagedata', blob, 'image.png');
    form.append('app', 'simochee.net');

    const uploaded = await fetch('https://upload.gyazo.com/api/upload', {
        method: 'post',
        body: form,
    });

    if (!uploaded.ok) {
        const data = await uploaded.text();
        const status = (() => {
            switch (uploaded.status) {
                case 400:
                case 401:
                case 403:
                    return uploaded.status;
                default:
                    return 500;
            }
        })();

        return c.json({
            error: data
        }, status)
    }
    
    const { permalink_url, url: imageUrl } = await uploaded.json();

    const url = new URL('https://api.gyazo.com/api/oembed');
    url.searchParams.set('url', permalink_url);

    const oembed = await fetch(url);

    if (!oembed.ok) {
        const data = await oembed.text();
        const status = (() => {
            switch (oembed.status) {
                case 400:
                case 401:
                case 403:
                    return oembed.status;
                default:
                    return 500;
            }
        })();

        return c.json({
            error: data
        }, status)
    }
    
    const { width, height } = await oembed.json()

    return c.json({
        imageUrl,
        width,
        height
    })
});

export const onRequest = handle(app)