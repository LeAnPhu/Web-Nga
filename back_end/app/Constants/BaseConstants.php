<?php

namespace App;

class BaseConstants
{
   
    const ROLE_ADMIN = 'admin';
    const ROLE_STORE_OWNER = 'store_owner';
    const ROLE_CUSTOMER = 'customer';

    
    const PAGINATION_LIMIT = 10;
    const DEFAULT_CURRENCY = 'VND';

    const ORDER_STATUS_PENDING = 'pending';
    const ORDER_STATUS_SHIPPED = 'shipped';
    const ORDER_STATUS_COMPLETED = 'completed';
    const ORDER_STATUS_CANCELED = 'canceled';

    const SUPPORT_EMAIL = 'support@yourwebsite.com';
}