# Pulso RD

Datos del día a día dominicano, en un solo lugar: divisas, combustibles, peajes, simulador del examen teórico del INTRANT y transporte público del Gran Santo Domingo.

🔗 **Sitio en vivo:** https://nutriasuave.github.io/pulso-rd/

## Módulos

- **Divisas** — compara tasas de compra/venta de USD y EUR entre bancos y remesadoras, con calculadora en ambas direcciones.
- **Combustibles y peajes** — precios oficiales semanales de Industria y Comercio, calculadora de galones/monto, estimador de viaje (combustible + peajes de RD Vial).
- **Simulador INTRANT** — 25 preguntas de práctica para el examen teórico, basadas en el manual oficial del INTRANT y la Ley 63-17.
- **Transporte público** — rutas, tarifas y conexiones de Metro, Teleférico, Corredores y OMSA.

## Stack

HTML, CSS y JavaScript sin frameworks ni build step — se puede editar y previsualizar abriendo `index.html` directamente en el navegador. Incluye manifest y service worker para instalarse como app (PWA) en el celular.

## Estructura

```
index.html          página principal (todos los módulos)
manifest.json        metadata para instalación como PWA
sw.js                 service worker (cache básico, funciona offline)
favicon.svg           ícono del sitio
apple-touch-icon.png  ícono para iOS
icon-192.png / icon-512.png  íconos para Android/PWA
og-image.png          imagen de vista previa al compartir en redes/WhatsApp
robots.txt / sitemap.xml   SEO básico
```

## Actualizar datos

Los precios y tasas están en objetos de JavaScript dentro de `index.html` (`rates`, `fuels`, `tolls`). Se actualizan a mano por ahora — no hay scraping automático todavía. Verifica siempre contra la fuente oficial antes de confiar en un número para una transacción real:

- Divisas: cada banco/remesadora publica su tasa del día.
- Combustibles: boletín semanal de Industria y Comercio.
- Peajes: [RD Vial](https://rdvial.gob.do/).
- INTRANT: [manuales oficiales](https://ov.intrant.gob.do/assets/Documentos/).

## Licencia

MIT — ver [LICENSE](./LICENSE).

## Aviso

Proyecto personal e independiente, sin afiliación con el Gobierno dominicano, bancos ni RD Vial. Los datos son de referencia; verifica siempre con la fuente oficial antes de tomar una decisión financiera o legal.
