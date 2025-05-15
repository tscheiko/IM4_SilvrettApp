<?php

require_once('../system/config.php');

header('Content-Type: text/plain; charset=UTF-8');

$loginInfo = $_POST['loginInfo'] ?? '';
$password = $_POST['password'] ?? '';

// check if username or email is in database
$stmt = $pdo->prepare("SELECT * FROM benutzer WHERE email = :loginInfo OR username = :loginInfo");
$stmt->execute([
    ':loginInfo' => $loginInfo
]);
$user = $stmt->fetch();

if ($user){

    // passwort prüfen
    if (password_verify($password, $user['password'])) {
        // Erfolg + Username zurückgeben
        echo "Login erfolgreich:" . $user['username'];

        // session starten
        session_start();
        $_SESSION['user_id'] = $user['ID'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];

    } else {
        echo "Passwort ist nicht korrekt";
    }

} else {
    echo "Benutzername oder E-Mail nicht korrekt.";
}
