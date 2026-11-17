#!/bin/bash
# ==========================================================================
#   PREPARAZIONE DEI FILM DELLA CAMPAGNA
#
#   Gli originali stanno su Higgsfield (progetto «Paloryn — Record +
#   Enterprise»): MP4 da 25-30 MB l'uno, a piena risoluzione. In pagina
#   sarebbero troppo pesanti. Qui vengono ridotti alla misura in cui
#   compaiono — 1280 di larghezza il film in testata, 720 gli scenari — con
#   la riproduzione che parte prima che il file sia scaricato tutto
#   (`faststart`), e per ognuno si salva un fotogramma di anteprima in WebP.
#
#   Il risultato va in public/video/, e src/lib/films.ts sa quale file
#   esiste in quale lingua.
#
#   Uso:  scripts/build-films.sh <cartella-con-gli-originali>
#   Nella cartella, gli originali con il nome che hanno qui sotto (prima
#   colonna + .mp4). L'identificativo Higgsfield e' accanto, per ritrovarli.
# ==========================================================================
set -euo pipefail
SRC=${1:?"Uso: scripts/build-films.sh <cartella-con-gli-originali>"}
OUT=public/video
mkdir -p "$OUT"

# nome          larghezza  secondo-anteprima  originale Higgsfield
while read -r name w t id; do
  [ -z "$name" ] && continue
  in="$SRC/$name.mp4"
  [ -s "$in" ] || { echo "manca $in ($id)"; continue; }
  ffmpeg -nostdin -v error -y -i "$in" -vf "scale=$w:-2:flags=lanczos" \
    -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -profile:v high \
    -c:a aac -b:a 96k -ac 2 -movflags +faststart "$OUT/$name.mp4"
  if [ "$t" != "-" ]; then
    ffmpeg -nostdin -v error -y -ss "$t" -i "$OUT/$name.mp4" -frames:v 1 -c:v libwebp -quality 70 "$OUT/$name.webp"
  fi
  echo "$name  $(du -h "$OUT/$name.mp4" | cut -f1)"
done <<'LISTA'
film-en      1280 -   ab36fb59-a6a3-4c55-8b43-51958e213560
film-it      1280 -   beafa90b-104f-408b-a957-990dc854e7c1
film-sq      1280 -   fe4c0048-d54e-445c-8c7c-1c1541c124e8
film-sr      1280 -   ae538ea6-5e55-48f4-ae46-248898b201bc
film-mk      1280 -   25c3be25-a395-4997-adda-f65ca98234d4
atti-en      720  1.3 bf048539-5570-48ce-9a49-14d9616f2d07
atti-it      720  1.3 d3d4eea9-98cb-413f-9ffe-2751c1cb3657
atti-sq      720  1.3 9b8bf32a-ac61-4596-991d-c6cde5b1e7a5
atti-sr      720  1.3 7d9972d1-ef34-44fa-9e0b-b5c229e17bf8
atti-mk      720  1.3 0964f792-0a5a-40e8-bea9-8558e0904f88
fiume-en     720  5.2 49ddda45-e984-48a0-a45d-2324421d0bab
fiume-it     720  5.2 2f5eee19-a365-4210-893d-2ad0c0987ac1
fiume-sq     720  5.2 25b7e8b6-ced3-4366-90f7-fb76b67efecd
fiume-sr     720  5.2 24ce3a0f-6ab3-4b18-acd3-d5c7f46d039a
reti-en      720  2.2 623622e5-272f-438f-adbe-c4a2b02a052e
reti-it      720  2.2 4d2c1c84-7eda-47f2-a769-e4bcfffb52be
viadotto-en  720  2.6 1a0f4c9b-d45d-4349-9004-c3e8e56fab16
viadotto-it  720  2.6 96fc624c-5edb-4101-b85b-b1d2c669fd39
LISTA

# Anteprima del film in testata: un fotogramma senza scritte, valido per
# tutte e cinque le lingue.
ffmpeg -nostdin -v error -y -ss 9.5 -i "$OUT/film-en.mp4" -frames:v 1 -c:v libwebp -quality 74 "$OUT/film-poster.webp"
