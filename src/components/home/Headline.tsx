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

export function Headline({ text }: { text: string }) {
  return (
    <h1
      className="font-display text-hero font-extrabold text-balance text-max"
      style={{ fontVariationSettings: '"wdth" 112' }}
    >
      {text}
    </h1>
  );
}
