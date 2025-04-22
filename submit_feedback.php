<?php
session_start(); // Добавляем сессии для передачи статуса

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        $_SESSION['form_error'] = "Пожалуйста, заполните все поля";
        header("Location: index.html#buy");
        exit();
    }

    // Подключение к БД
    $host = 'localhost';
    $dbname = 'feedback';
    $username = 'root';
    $password = '';

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare("INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $message]);

        $_SESSION['form_success'] = true; // Помечаем успешную отправку
        header("Location: index.html#buy");
        exit();
    } catch (PDOException $e) {
        $_SESSION['form_error'] = "Ошибка: " . $e->getMessage();
        header("Location: index.html#buy");
        exit();
    }
} else {
    header("Location: index.html");
    exit();
}
