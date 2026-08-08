# Fotografie da lavorare

Metti qui gli originali, poi lancia dalla radice del progetto:

    node scripts/build-photos.mjs photos-sorgente

Lo script ritaglia dove serve, ridimensiona, genera AVIF, WebP e JPEG in
`public/img/archilives/` e scrive a schermo il peso di ognuno.

## File attesi

| nome file | chi è | cosa fa lo script |
|---|---|---|
| `martino` | Martino Castellana, CTO | **taglia** la fascia alta a tutta larghezza e la porta in orizzontale |
| `full-4` | Pierluigi Vantaggiato | ridimensiona a 1400px |
| `full-6` | Linda Perrone | ridimensiona a 1400px |
| `2`, `7`, `8`, `9` | carosello | ridimensiona a 900px |

L'estensione non conta: `martino.jpg`, `martino.png`, `martino.jpeg` vanno
tutte bene. L'orientamento EXIF viene rispettato, quindi una foto scattata
col telefono in verticale non esce ruotata.

**HEIC non è supportato.** Se la foto arriva da iPhone in `.heic`,
esportala prima in JPEG.

## Il taglio su Martino

L'originale è verticale e mal inquadrato: il soggetto sta nel terzo
sinistro, sotto c'è mezzo metro di pavimento vuoto, sopra una fascia di
parete morta.

Il taglio è già deciso e scritto in `scripts/build-photos.mjs`: prende la
fascia dall'11% al 68% dell'altezza, a tutta larghezza. Tiene la testa a
circa un sesto dall'alto, chiude all'altezza della coscia, e soprattutto
**tiene lo schermo con il portale d'archivio** — che è la cosa più preziosa
dell'inquadratura, perché mostra il prodotto in funzione.

Se il taglio non ti convince, i quattro numeri stanno tutti su una riga
dello script: si cambiano lì, si rilancia, e si vede il risultato.

## Se un file manca

Non succede niente di brutto: lo script lo salta e la fotografia
semplicemente non compare in pagina. Nessun riquadro vuoto, nessun
segnaposto da spegnere a mano.
