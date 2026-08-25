<?php
/* ==========================================================================
   RICEVITORE DEI MODULI PER HOSTING APACHE

   Il sito e' un'applicazione Next. Quando gira su Node, i moduli parlano
   con una rotta interna e questo file non serve. Quando invece viene
   pubblicato come cartella di file statici su un hosting Apache — ed e'
   quello che c'e' oggi su paloryn.com — quella rotta non esiste: la
   richiesta rispondeva 404 e nessun messaggio partiva.

   Questo file fa la stessa identica cosa in PHP, che sull'hosting c'e'
   gia'. Stessa richiesta in ingresso, stessa risposta in uscita: il modulo
   nel browser non sa quale dei due ha davanti.

   ---------------------------------------------------------------------
   INSTALLAZIONE, tre passaggi

   1. Copiare questo file nella radice del sito, accanto a index.html.
   2. Copiare `contact-config.php.esempio` come `contact-config.php`,
      sempre nella radice, e riempirlo con i valori della casella.
   3. Aprire https://paloryn.com/contact.php con il browser: risponde con
      un riepilogo di che cosa funziona e che cosa manca. Finche' non e'
      tutto verde, il modulo non spedira'.

   Il file di configurazione sta a parte apposta: contiene la password, e
   un file separato si puo' proteggere, sostituire e tenere fuori da
   qualunque copia del sito senza toccare il codice.

   ---------------------------------------------------------------------
   PERCHE' NON `mail()`

   La funzione `mail()` di PHP consegna al server locale, che quasi sempre
   non e' autorizzato a spedire a nome di @paloryn.com: il messaggio parte
   e finisce fra gli indesiderati, oppure sparisce. Qui invece si fa
   l'accesso al server di posta del dominio, esattamente come farebbe un
   programma di posta — quindi il messaggio risulta legittimo.

   Nessuna libreria da installare: il dialogo con il server di posta e'
   scritto qui sotto, sono una trentina di righe.
   ========================================================================== */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$config = __DIR__ . '/contact-config.php';
$C = is_readable($config) ? (require $config) : [];

function valore(array $C, string $chiave, string $predefinito = ''): string {
    $v = $C[$chiave] ?? getenv($chiave) ?: '';
    return is_string($v) ? trim($v) : $predefinito;
}

$HOST = valore($C, 'SMTP_HOST');
$PORT = (int) (valore($C, 'SMTP_PORT') ?: '465');
$USER = valore($C, 'SMTP_USER');
$PASS = valore($C, 'SMTP_PASS');
$TO   = valore($C, 'CONTACT_TO') ?: $USER;

/* --------------------------------------------------------------------------
   GET — la diagnosi.

   Aprire l'indirizzo con il browser dice se l'ambiente regge, senza
   spedire niente e senza mostrare un solo carattere della password.
   -------------------------------------------------------------------------- */
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    $socket = null;
    if ($HOST !== '') {
        $err = 0; $msg = '';
        $indirizzo = ($PORT === 465 ? 'ssl://' : 'tcp://') . $HOST . ':' . $PORT;
        $fp = @stream_socket_client($indirizzo, $err, $msg, 8);
        if ($fp) { $socket = true; fclose($fp); } else { $socket = $msg ?: 'non raggiungibile'; }
    }

    echo json_encode([
        'php'            => PHP_VERSION,
        'openssl'        => extension_loaded('openssl'),
        'configurazione' => is_readable($config) ? 'trovata' : 'MANCA contact-config.php',
        'valori'         => [
            'SMTP_HOST'  => $HOST !== '' ? $HOST : 'manca',
            'SMTP_PORT'  => $PORT,
            'SMTP_USER'  => $USER !== '' ? $USER : 'manca',
            'SMTP_PASS'  => $PASS !== '' ? strlen($PASS) . ' caratteri' : 'manca',
            'CONTACT_TO' => $TO !== '' ? $TO : 'manca',
        ],
        'collegamento'   => $socket === true ? 'riuscito' : ($socket ?? 'non provato'),
        'pronto'         => $HOST && $USER && $PASS && extension_loaded('openssl') && $socket === true,
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/* --------------------------------------------------------------------------
   Difesa dagli abusi, gli stessi tre strati della versione Node.
   -------------------------------------------------------------------------- */

/* 1. Freno per indirizzo di rete. Qui non c'e' memoria condivisa fra le
      richieste come in Node, quindi il conteggio sta in un file nella
      cartella temporanea: dieci invii all'ora per indirizzo. */
function troppi(string $ip): bool {
    $f = sys_get_temp_dir() . '/paloryn-moduli-' . md5($ip) . '.txt';
    $ora = time();
    $tempi = is_readable($f) ? array_filter(array_map('intval', explode(',', (string) file_get_contents($f)))) : [];
    $tempi = array_values(array_filter($tempi, fn($t) => $ora - $t < 3600));
    $tempi[] = $ora;
    @file_put_contents($f, implode(',', $tempi), LOCK_EX);
    return count($tempi) > 10;
}

$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'sconosciuto';
$ip = trim(explode(',', (string) $ip)[0]);

if (troppi($ip)) {
    http_response_code(429);
    echo json_encode(['error' => 'rate_limited']);
    exit;
}

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) {
    http_response_code(400);
    echo json_encode(['error' => 'bad_request']);
    exit;
}

/* 2 e 3. Le due trappole rispondono «va bene» senza spedire niente: dire a
   un programma automatico che e' stato riconosciuto significa solo
   aiutarlo a riprovare meglio. */
if (!empty($body['website'])) { echo json_encode(['ok' => true]); exit; }
if (isset($body['elapsed']) && is_numeric($body['elapsed']) && $body['elapsed'] < 3000) {
    echo json_encode(['ok' => true]); exit;
}

$campi = [];
foreach ((array) ($body['fields'] ?? []) as $riga) {
    if (!is_array($riga) || count($riga) < 2) continue;
    [$k, $v] = $riga;
    if (!is_string($k) || !is_string($v)) continue;
    $v = trim(mb_substr($v, 0, 4000));
    if ($v === '') continue;
    $campi[] = [mb_substr($k, 0, 120), $v];
}

if (!$campi) {
    http_response_code(400);
    echo json_encode(['error' => 'empty']);
    exit;
}

if ($HOST === '' || $USER === '' || $PASS === '') {
    /* Configurazione mancante: si dichiara, non si finge. */
    http_response_code(503);
    echo json_encode(['error' => 'not_configured']);
    exit;
}

/* L'indirizzo di chi scrive, se c'e', diventa il «rispondi a». Si riconosce
   dal contenuto e non dall'etichetta, che cambia con la lingua. */
$replyTo = '';
foreach ($campi as [, $v]) {
    if (filter_var($v, FILTER_VALIDATE_EMAIL)) { $replyTo = $v; break; }
}

/* Una riga per campo, nell'ordine del modulo: chi legge vede una scheda,
   non un blocco di testo. */
$largh = 0;
foreach ($campi as [$k]) { $largh = max($largh, mb_strlen($k)); }
$righe = [];
foreach ($campi as [$k, $v]) { $righe[] = str_pad($k, $largh) . '  ' . $v; }
$testo = implode("\n", $righe);

$oggetto = mb_substr((string) ($body['subject'] ?? 'Richiesta dal sito'), 0, 160);

/* --------------------------------------------------------------------------
   Il dialogo con il server di posta.

   Una riga per volta, e ogni riga aspetta la risposta. Se il server
   risponde qualcosa che non e' il codice atteso, ci si ferma li' invece di
   proseguire e dichiarare un successo che non c'e' stato.
   -------------------------------------------------------------------------- */
function smtp_leggi($fp): string {
    $out = '';
    while (($riga = fgets($fp, 515)) !== false) {
        $out .= $riga;
        /* Una risposta su piu' righe ha il trattino in quarta posizione;
           l'ultima ha lo spazio. */
        if (strlen($riga) < 4 || $riga[3] === ' ') break;
    }
    return $out;
}

function smtp_dì($fp, string $comando, string $atteso): bool {
    if ($comando !== '') fwrite($fp, $comando . "\r\n");
    $r = smtp_leggi($fp);
    return str_starts_with(ltrim($r), $atteso);
}

$indirizzo = ($PORT === 465 ? 'ssl://' : 'tcp://') . $HOST . ':' . $PORT;
$err = 0; $msg = '';
$fp = @stream_socket_client($indirizzo, $err, $msg, 15);

if (!$fp) {
    http_response_code(502);
    echo json_encode(['error' => 'smtp_unreachable']);
    exit;
}
stream_set_timeout($fp, 15);

$ok = smtp_dì($fp, '', '220')
   && smtp_dì($fp, 'EHLO paloryn.com', '250');

/* Sulla 587 la conversazione comincia in chiaro e si cifra dopo. */
if ($ok && $PORT !== 465) {
    $ok = smtp_dì($fp, 'STARTTLS', '220')
       && @stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)
       && smtp_dì($fp, 'EHLO paloryn.com', '250');
}

$ok = $ok
   && smtp_dì($fp, 'AUTH LOGIN', '334')
   && smtp_dì($fp, base64_encode($USER), '334')
   && smtp_dì($fp, base64_encode($PASS), '235')
   && smtp_dì($fp, 'MAIL FROM:<' . $USER . '>', '250')
   && smtp_dì($fp, 'RCPT TO:<' . $TO . '>', '250')
   && smtp_dì($fp, 'DATA', '354');

if (!$ok) {
    @fclose($fp);
    http_response_code(502);
    echo json_encode(['error' => 'smtp_refused']);
    exit;
}

/* Intestazioni e corpo. L'oggetto passa in codifica base64 perche' puo'
   contenere accenti, che nelle intestazioni non sono ammessi in chiaro. */
$intestazioni = [
    'From: Sito Paloryn <' . $USER . '>',
    'To: <' . $TO . '>',
    'Subject: =?UTF-8?B?' . base64_encode($oggetto) . '?=',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'Date: ' . date('r'),
];
if ($replyTo !== '') $intestazioni[] = 'Reply-To: <' . $replyTo . '>';

/* Un punto da solo a inizio riga chiuderebbe il messaggio in anticipo:
   si raddoppia, come vuole il protocollo. */
$corpo = preg_replace('/^\./m', '..', $testo);

fwrite($fp, implode("\r\n", $intestazioni) . "\r\n\r\n" . $corpo . "\r\n.\r\n");
$consegnato = str_starts_with(ltrim(smtp_leggi($fp)), '250');

smtp_dì($fp, 'QUIT', '221');
@fclose($fp);

if (!$consegnato) {
    http_response_code(502);
    echo json_encode(['error' => 'smtp_rejected']);
    exit;
}

echo json_encode(['ok' => true]);
