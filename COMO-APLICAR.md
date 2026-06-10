# Podium CSS Upgrade — Cómo aplicar

## Paso 1 — Reemplaza el CSS en App.tsx

En `src/App.tsx`, busca la línea:
```
const CSS = `
```
Y reemplaza TODO el contenido entre las comillas inversas (backticks) con el CSS del archivo `css-upgrade.ts` (el contenido entre los backticks del `export const CSS`).

La línea de cierre sigue siendo:
```
`;
```

## Paso 2 — Ajuste JSX (pequeño, para las barras de color en el feed)

Las nuevas feed cards tienen una barra de color a la izquierda según el tipo.
Necesitas añadir la clase correcta según el tipo de card.

### En `FeedCard` (cards de log), busca el div raíz y asegúrate de que tenga:
```jsx
<div className="feed-card type-log">
```

### En `FeedCard` para streaks (el que tiene `streak-card`):
```jsx
<div className="feed-card streak-card type-streak">
```

### En `FeedCard` para disputes:
```jsx
<div className="feed-card dispute-card-feed type-dispute">
```

### En `BetFeedCard`:
```jsx
<div className="feed-card type-bet">
```

Si prefieres NO tocar el JSX, borra estas 4 líneas del CSS y las barras simplemente no aparecerán (todo lo demás funciona igual):
```css
.feed-card.type-log::before{background:rgba(240,168,50,.6)}
.feed-card.type-streak::before{background:rgba(232,98,58,.7)}
.feed-card.type-bet::before{background:rgba(110,181,255,.6)}
.feed-card.type-dispute::before{background:rgba(242,102,122,.6)}
```

## Paso 3 — Deploy

```bash
git add src/App.tsx
git commit -m "feat: premium visual upgrade — nav pill, glow system, depth"
git push
```
Vercel deployará automáticamente.

---

## Qué cambia (resumen visual)

| Elemento | Antes | Después |
|---|---|---|
| **Nav bar** | Barra fija pegada al borde | Píldora flotante con glassmorphism y glow en tab activo |
| **Fondo app** | Negro plano | Cálido con luz ambiental amber y grain sutil |
| **Número hero** | 52px plano | 72px con text-shadow glow |
| **FAB "Apuntar"** | Amber simple | Amber con glow fuerte + animación hover |
| **Botón primario** | Flat | Glow + lift en hover |
| **Cards feed** | Flat s1 | Barra color izquierda + hover border |
| **Streak card** | Gradiente leve | Número 48px con fire glow |
| **Podio #1** | Glow sutil | Glow pulsante dorado animado |
| **Podio #2** | Muted | Silver glow |
| **Podio #3** | Muted | Bronze glow |
| **Sheet/modal** | Fondo s1 | Glassmorphism real (rgba + blur) |
| **Inputs focus** | Border amber | Border + ring glow |
| **Reacciones** | Flat mine | Mine con glow + scale en click |
| **Avatar btn (topbar)** | Sin sombra | Box-shadow amber |
| **Today banner** | Gradiente simple | Radial glow + línea de luz superior |
