<!DOCTYPE html>
<html>

<head>
    <title>Email Confirmation</title>
</head>
<?php

?>
<body>
    <h1>Hello {{$user->name}} </h1>
    <p>Password reset link. </p>
    <a href="{{ env('CLIENT_SITE_URL') }}/password-reset/{{$confirm_code}}"> Please Click Here</a>
</body>

</html>
