<!DOCTYPE html>
<html>
<head>
    <title>Xác thực tài khoản</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            padding: 40px;
        }
        .container {
            background: white;
            max-width: 480px;
            margin: 0 auto;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            text-align: center;
            padding-bottom: 15px;
            border-bottom: 2px solid #ddd;
        }
        h2 {
            color: #333;
            margin-bottom: 10px;
        }
        p {
            color: #555;
            font-size: 16px;
            line-height: 1.5;
        }
        .otp-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin: 20px 0;
        }
        .otp-digit {
            font-size: 28px;
            font-weight: bold;
            color: white;
            background: linear-gradient(135deg, #ff416c, #ff4b2b);
            padding: 12px 18px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes fadeIn {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .footer {
            font-size: 14px;
            color: #777;
            margin-top: 20px;
        }
        .button {
            display: block;
            width: 100%;
            text-align: center;
            background: #007bff;
            color: white;
            padding: 12px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 6px;
            text-decoration: none;
            margin-top: 15px;
        }
        .button:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Xác thực tài khoản</h2>
        </div>

        <p>Xin chào <strong>{{ $user->name }}</strong>,</p>
        <p>Bạn đã đăng ký tài khoản trên hệ thống của chúng tôi.</p>

        @if ($role === 'user')
            <p>Bạn là <strong>Người dùng</strong>, hãy sử dụng mã OTP sau để xác thực tài khoản:</p>
        @elseif ($role === 'shop_owner')
            <p>Bạn là <strong>Chủ cửa hàng</strong>, hãy sử dụng mã OTP sau để xác thực tài khoản:</p>
        @endif

        <div class="otp-container">
            @foreach (str_split($otp) as $digit)
                <div class="otp-digit">{{ $digit }}</div>
            @endforeach
        </div>

        <p>Mã OTP này sẽ hết hạn sau <strong>2 phút</strong>. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>

        <a href="#" class="button">Xác thực ngay</a>

        <p class="footer">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.<br>Admin Hỗ trợ: LE_PHU_AN_@_SIUUU.COM</p>
    </div>
</body>
</html>
