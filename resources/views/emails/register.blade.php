<!DOCTYPE html>
<html>

<head>
    <title>Email Confirmation</title>
</head>

<body>
    <h1>Hello {{$user->name}} </h1>
    <p>Please verify your email address</p>
    <a href="{{ env('CLIENT_SITE_URL') }}/email-verify/{{$confirm_code}}"> Please Click Here</a>
</body>

</html>
