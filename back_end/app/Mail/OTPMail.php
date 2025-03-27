<?php
namespace App\Mail;
use Illuminate\Mail\Mailable;

class OTPMail extends Mailable
{
    public $otp;
    public $user;
    public $role;

    public function __construct($otp, $user, $role)
    {
        $this->otp = $otp;
        $this->user = $user;
        $this->role = $role;
    }

    public function build()
    {
        return $this->subject('Xác thực đăng ký tài khoản')
                    ->view('email.otpmail') 
                    ->with([
                        'otp' => $this->otp,
                        'user' => $this->user,
                        'role' => $this->role,
                    ]);
    }
}
