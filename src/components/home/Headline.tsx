/* ==========================================================================
   IL TITOLO

   Un titolo e basta: una scatola, un peso, nessuno strato sotto.

   Qui c'era una seconda copia della frase in grigio, che veniva scoperta da
   una lama. L'intenzione era che la frase facesse quello che dice — dalla
   materia al dato — ma il risultato leggeva come un'ombra portata, cioe'
   come l'effetto piu' vecchio e piu' brutto che si possa mettere su del
   testo. Un'idea giusta che si vede male e' un'idea sbagliata: tolta.

   Il passaggio dalla materia al dato adesso lo mostra la grafica accanto,
   che e' il posto dove ha senso mostrarlo — su un oggetto, non su delle
   lettere.

   LA LARGHEZZA. Il carattere e' variabile e qui e' spinto a 112 su 100:
   alla scala del manifesto un grottesco largo tiene la riga, un grottesco
   normale ingrandito sembra solo ingrandito.
   ========================================================================== */

/* LA PAROLA PIU' LUNGA DEVE STARE IN UNA RIGA.

   A 76 pixel «Memory» sta su un telefono; «përgjigjet» (albanese) e
   «Меморија» (macedone) no, e una parola che non sta in riga esce dallo
   schermo e fa scorrere la pagina di lato. Il corpo si calcola quindi
   sulla parola piu' lunga della frase: resta quello del manifesto finche'
   c'e' spazio, e scende quanto basta solo dove serve.

   0,66 e' la larghezza media di un carattere minuscolo di questo
   grottesco, extra-nero e allargato a 112, in frazioni del corpo: misurata,
   con un margine. 2rem sono i due margini laterali della pagina. */
const CHAR = 0.66;

/* Sugli schermi grandi il titolo si ferma a 112 pixel invece di 132: su
   due righe a tutta larghezza lascia spazio al film nella prima
   schermata. */
const MAX = "min(var(--text-hero), 7rem)";

export function Headline({ text }: { text: string }) {
  const longest = Math.max(...text.split(/\s+/).map((w) => w.length));
  return (
    <h1
      className="font-display text-hero font-extrabold text-balance text-max"
      style={{
        fontVariationSettings: '"wdth" 112',
        /* Il titolo non si sillaba mai: «memo-ria» su un manifesto e' un
           errore, non un a capo. Se una parola non sta, scende il corpo
           (vedi sopra), non si spezza la parola. */
        hyphens: "manual",
        fontSize: `min(${MAX}, calc((100vw - 2rem) / ${(longest * CHAR).toFixed(2)}))`,
      }}
    >
      {text}
    </h1>
  );
}
