<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Customer
 * @package App
 */
class Customer extends Model
{
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function call()
    {
        return $this->hasOne(Call::class);
    }
}
