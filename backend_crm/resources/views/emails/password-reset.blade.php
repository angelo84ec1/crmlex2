<!-- resources/views/emails/password-reset.blade.php -->

<!DOCTYPE html>
<html>

<head>
    <title>Resetear Contraseña CRM Lexcob S.A.</title>
</head>

<body>
    <h1>Presiona el Link para resetear</h1>
    <p>Está recibiendo este correo electrónico porque recibimos una solicitud de restablecimiento de contraseña para su cuenta.</p>
    <p><a href="{{'https://crmlex.hostluvi.com/#/resetPassword/' . $token . '/' . $user->email }}">Reset Password</a></p>
    <p>Si no solicitó un restablecimiento de contraseña, no es necesario realizar ninguna otra acción.</p>
</body>

</html>
