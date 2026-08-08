/* ==========================================================================
   IL TITOLO CHE SI RISOLVE

   Il titolo dice «dalla materia al dato», quindi lo fa: la stessa frase sta
   due volte una sopra l'altra, in grigio la materia e in bianco il dato, e
   una lama ciano scopre il bianco da sinistra a destra.

   Non e' un effetto applicato a una frase: e' la frase che si dimostra da
   sola. Insieme alla conversione qui sotto forma l'unico movimento
   orchestrato del sito, in due tempi — prima si risolve la frase, poi si
   risolve il documento.

   NIENTE JAVASCRIPT. L'animazione parte da sola quando il foglio di stile
   viene applicato. Farla partire da un effetto di React voleva dire che il
   titolo compariva bianco, poi tornava grigio a idratazione avvenuta e si
   risolveva una seconda volta: un lampo che si vedeva benissimo. Qui non
   c'e' nessuno stato, nessun montaggio, nessun lampo.

   LE DUE FRASI DEVONO ANDARE A CAPO NELLO STESSO PUNTO. Sembra ovvio e non
   lo e': il titolo vero e' un h1, e la regola di base del sito gli applica
   il bilanciamento delle righe; lo strato grigio, che e' un semplice span,
   non lo riceverebbe e andrebbe a capo altrove — con il risultato che le
   due frasi si sfalsano e si legge una parola doppia. Per questo la classe
   tipografica e' una sola, scritta una volta e usata da entrambi.

   ACCESSIBILITA'. Il testo accessibile e' uno solo: lo strato grigio e'
   marcato come decorativo, quindi un lettore di schermo legge il titolo una
   volta sola. Il grigio usato e' quello medio della palette, che contro il
   fondo tiene il rapporto richiesto per il testo grande: anche fermando
   l'animazione a meta' non esiste un istante in cui il titolo sia
   illeggibile.

   VELOCITA'. Lo strato grigio e' dipinto al primo fotogramma, a piena
   opacita'. Il titolo e' l'elemento piu' grande della prima schermata,
   quindi e' lui a fissare la prima pittura utile: se comparisse in
   dissolvenza ritarderebbe la misura su cui si giudica la velocita' del
   sito.
   ========================================================================== */

/* Una sola dichiarazione tipografica per tutti e due gli strati: se cambia,
   cambia per entrambi, e le righe non possono sfalsarsi. */
const TYPE = "block font-display text-hero font-bold text-balance";

export function Headline({ text }: { text: string }) {
  return (
    <div className="hd-run relative">
      {/* LA MATERIA — grigia, dipinta subito, mai letta ad alta voce */}
      <span aria-hidden="true" className={`hd-ghost ${TYPE} text-mute`}>
        {text}
      </span>

      {/* IL DATO — bianco, scoperto dalla lama. Sta esattamente sopra
          l'altro strato: stessa scatola, stessa larghezza, stesse righe. */}
      <h1 className={`hd-fill absolute inset-0 ${TYPE} text-max`}>{text}</h1>

      <span
        aria-hidden="true"
        className="hd-blade pointer-events-none absolute inset-y-0 w-0.5 bg-accent"
      />
    </div>
  );
}
