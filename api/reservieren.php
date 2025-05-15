<?php
require_once('../system/config.php');
header('Content-Type: text/plain; charset=UTF-8');

// Eingabedaten holen
$checkin = $_POST['checkin'] ?? '';
$checkout = $_POST['checkout'] ?? '';
$username = $_POST['username'] ?? 'Unbekannt';

// Grundcheck
if (!$checkin || !$checkout) {
    echo "Bitte Check-in und Check-out Datum angeben.";
    exit;
}

// Datumskonvertierung für Sicherheit
$ci = date('Y-m-d', strtotime($checkin));
$co = date('Y-m-d', strtotime($checkout));

// Prüfen ob Zeitraum schon belegt ist
$stmt = $pdo->prepare("SELECT * FROM reservationen WHERE 
    (checkin <= :co AND checkout >= :ci)
");
$stmt->execute([
    ':ci' => $ci,
    ':co' => $co
]);
$exists = $stmt->fetch();

if ($exists) {
    $belegtVon = date('d.m.y', strtotime($exists['checkin']));
    $belegtBis = date('d.m.y', strtotime($exists['checkout']));
    echo "Die Wohnung ist vom $belegtVon bis $belegtBis leider schon von einer anderen Person reserviert.";
    exit;
}


// Wenn frei → speichern
$insert = $pdo->prepare("INSERT INTO reservationen (username, checkin, checkout) 
                         VALUES (:username, :ci, :co)");
$insert->execute([
    ':username' => $username,
    ':ci' => $ci,
    ':co' => $co
]);

echo "Deine Reservationsanfrage wird bearbeitet, wir melden uns.";
