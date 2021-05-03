<?php
include_once("database.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $_POST['email'];
$password = $_POST['password'];
$contact = $_POST['contact'];
$address = $_POST['address'];

$email = stripcslashes($email);
$password = stripcslashes($password);
$contact = stripcslashes($contact);
$address = stripcslashes($address);

//$sql = "SELECT * FROM account where email='$email' and password='$pwd'";
$sql = "INSERT INTO account (email, password, contact, address)
        VALUES ('$email','$password','$contact','$address')";

$result = $mysqli->query($sql);

if ($result === TRUE) {
  echo "New record created successfully";
} else {
  http_response_code(404);
  echo "Error: " . $sql . "<br>" . $result->error;
}

$mysqli->close();
?>
