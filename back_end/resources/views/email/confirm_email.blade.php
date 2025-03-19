<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chào mừng bạn đến với hệ thống</title>
</head>
<body>
    <h2>Chào {{ $admin->name }}</h2>
    <p>Chúc mừng bạn đã đăng ký tài khoản quản trị viên trên hệ thống của chúng tôi. Bạn có thể đăng nhập và bắt đầu sử dụng hệ thống.</p>
    <p>Email của bạn: {{ $admin->email }}</p>
</body>
</html>
