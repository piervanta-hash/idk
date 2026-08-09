# Immagine di laboratorio — prompt pronto

**Perché questo file esiste.** Avevi scelto di far generare l'immagine di
laboratorio. In questo ambiente non ho strumenti di generazione di immagini:
posso scrivere codice e disegnare vettoriali, non produrre fotografie. Quindi
in pagina, per adesso, c'è uno **schema disegnato** — scaffalature, scanner
planetario, braccio della camera, culla, cono di luce fredda — nello stesso
linguaggio di linee del resto del sito.

Non è un ripiego travestito: si vede a colpo d'occhio che è un disegno, quindi
non finge di essere una foto. Ma resta un segnaposto.

## Come sostituirlo

Il riquadro è in **16:9**, le stesse proporzioni del prompt qui sotto. Quando
hai il file:

1. Mettilo in `public/img/laboratorio.avif` (o `.webp`).
2. In `src/components/pages/LabPlate.tsx`, sostituisci l'`<svg>` con un
   `<Image>` di `next/image`, lasciando invariati `<figure>` e `<figcaption>`.

Non serve toccare altro: il resto della pagina è già dimensionato.

## Il prompt

```
Wide-angle photograph of a modern industrial document digitization laboratory.
Tall metal shelving units packed with archival boxes and bound registers
receding into deep perspective. Foreground: a planetary book scanner with an
overhead camera arm and a large document under controlled cold lighting. Cool
desaturated palette, near-monochrome, black and graphite tones, subtle
cyan-neutral light. Cinematic depth of field, high detail, architectural
photography style, no people, no text, no logos. 16:9.
```

## Una nota, prima di usarlo

Un'immagine generata resta un'immagine generata. Su un sito che dichiara
certificazioni, volumi e committenti con nome, una fotografia finta del vostro
laboratorio è l'unico elemento che un investitore o un ente non potrebbe
verificare — ed è anche quello più facile da smascherare.

Se la usate, va bene: è materiale illustrativo e non afferma nulla di falso sui
numeri. Ma una fotografia vera del vostro laboratorio, anche scattata col
telefono e trattata in bianco e nero, vale di più. La sostituzione costa dieci
minuti.
