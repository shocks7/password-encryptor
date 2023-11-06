<?php

$servername = 'localhost';
$username = 'admin';
$password = 'smart';
$dbname = 'encrypted_passwords';

$data = json_decode(file_get_contents("php://input"));

if ($data && isset($data->password)) {
    $encrypted_password = $data->password;

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die('Erro na conexão com o banco de dados: ' . $conn->connect_error);
    }

    $sql = "INSERT INTO passwords (encrypted_passwords) VALUES ('$encrypted_password')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('status' => 'Senha criptografada e salva com sucesso.'));
    } else {
        echo json_encode(array('error' => 'Erro ao salvar a senha no banco de dados: ' . $conn->error));
    }

    $conn->close();
} else {
    echo json_encode(array('error' => 'Dados inválidos recebidos.'));
}
