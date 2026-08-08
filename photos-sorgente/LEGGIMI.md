# Fotografie da lavorare

Metti qui gli originali, poi lancia dalla radice del progetto:

    node scripts/build-photos.mjs photos-sorgente

Lo script ritaglia dove serve, ridimensiona, genera AVIF, WebP e JPEG in
`public/img/archilives/` e scrive a schermo il peso di ognuno.

## File attesi

| nome file | chi è | cosa fa lo script |
|---|---|---|
| `martino` | Martino Castellana, CTO | ridimensiona a 1400px (arriva già tagliata) |
| `full-4` | Pierluigi Vantaggiato | ridimensiona a 1400px |
| `full-6` | Linda Perrone | **taglia** per portarla in primo piano, poi ridimensiona |
| `2`, `7`, `8`, `9` | immagini della giornata | ridimensiona a 900px |

L'estensione non conta: `martino.jpg`, `martino.png`, `martino.jpeg` vanno
tutte bene. L'orientamento EXIF viene rispettato, quindi una foto scattata
col telefono in verticale non esce ruotata.

**HEIC non è supportato.** Se la foto arriva da iPhone in `.heic`,
esportala prima in JPEG.

## Da dove vengono gli originali

Solo `martino.jpg` è versionato qui: ce l'abbiamo solo noi.

Gli altri **non sono in git** — sono PNG da un paio di megabyte l'uno, e
sedici megabyte di originali in un repository restano lì per sempre. Li si
riscarica dall'articolo pubblico del programma:

    https://www.greece-italy.eu/archilives-info-day-in-lecce-between-theory-and-musical-performance/

I nomi `full-4`, `full-6`, `2`, `7`, `8`, `9` sono l'ordine in cui compaiono
nella galleria dell'articolo. Le versioni già lavorate stanno comunque in
`public/img/archilives/` e sono versionate: **il sito funziona anche senza
questa cartella**, che serve solo a rifare i tagli.

## Il taglio su Linda Perrone

L'originale riprende la sala da dietro: lei sta in fondo, alta un
centimetro. Accanto ai ritratti degli altri due sembrava la fotografia di
un'altra cosa.

Il taglio è scritto in `scripts/build-photos.mjs`: la porta in primo piano
e tiene dietro di lei il muro dell'evento, così resta chiaro dove siamo. Si
perde risoluzione e si guadagna una persona riconoscibile.

I quattro numeri del taglio stanno tutti su una riga dello script: si
cambiano lì, si rilancia, e si vede il risultato.

## Se un file manca

Non succede niente di brutto: lo script lo salta e la fotografia
semplicemente non compare in pagina. Nessun riquadro vuoto, nessun
segnaposto da spegnere a mano. Le versioni già in `public/` restano dove
sono.
