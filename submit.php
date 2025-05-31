<?php
$host = 'MySQL-8.4';
$dbname = 'form_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $number = trim($_POST['number']);
    $gender = $_POST['gender'] ?? '';

    $errors = [];

    if (!preg_match('/^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ\']+$/u', $name)) {
        $errors[] = "Ім'я неправильне.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Невірна електронна адреса.";
    }

    if (!preg_match('/^\d{10}$/', $number)) {
        $errors[] = "Номер повинен мати 10 цифр.";
    }

    if ($gender !== 'male' && $gender !== 'female') {
        $errors[] = "Стать не вибрана.";
    }

    if (!empty($errors)) {
        echo implode("\n", $errors);
        exit;
    }
    
    $stmt = $pdo->prepare("INSERT INTO submissions (name, email, number, gender) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $number, $gender]);

    echo "Дані успішно надіслані.";
} catch (PDOException $e) {
    echo "Помилка бази даних: " . $e->getMessage();
}
?>