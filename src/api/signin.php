<?php
include_once("database.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$username = $_POST['email'];
$password = $_POST['password'];
$email = stripcslashes($username);
$pwd = stripcslashes($password);

  $sql = "SELECT * FROM account where email='$email' and password='$pwd'";

  $result = $mysqli->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  $rows = array();
  while($row = $result->fetch_assoc()) {
    $rows[] = $row;
  }
  echo json_encode($rows);
} else {
  http_response_code(404);
  echo json_encode(array("error" => "Access denied."));
}
$mysqli->close();
?>
