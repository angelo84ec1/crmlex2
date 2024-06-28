<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Email Subject</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        h1 {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
        }

        p {
            font-size: 16px;
            color: #666;
            margin-bottom: 10px;
        }

        .highlight {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>CRM </h1>
        <p><strong>Dear, {{$user}}</strong></p>
        <p>{{$description}}</p>
        <p><strong>Best Regards,</strong></p>
        <p>CRM</p>
    </div>
</body>
</html>
