<!DOCTYPE html>
<html>
<head>
    <title>Xác thực tài khoản</title>
</head>
<body>
    <h2>Xin chào {{ $user->name }},</h2>
    
    <p>Bạn đã đăng ký tài khoản trên hệ thống của chúng tôi.</p>

    @if ($role === 'user')
        <p>Bạn là Người dùng, hãy sử dụng mã OTP sau để xác thực tài khoản của bạn:</p>
    @elseif ($role === 'shop_owner')
        <p>Bạn là Chủ cửa hàng, hãy sử dụng mã OTP sau để xác thực tài khoản của bạn:</p>
    @endif

    <h3>Mã OTP: <strong>{{ $otp }}</strong></h3>

    <p>Mã OTP này sẽ hết hạn sau 2 phút.</p>
    <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
</body>
</html>
