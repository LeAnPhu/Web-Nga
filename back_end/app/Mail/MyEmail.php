<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ConfirmMail extends Mailable
{
    use Queueable, SerializesModels;
		public $admin;

    public function __construct($admin)
    {
        $this->admin = $admin;
    }

    public function build()
    {
        return $this->subject('Chào mừng bạn đến với website chúng tôi!')
                    ->view('emails.confirm_email');
    }
}
