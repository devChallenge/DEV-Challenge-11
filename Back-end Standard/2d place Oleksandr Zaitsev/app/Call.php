<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Call
 * @package App
 */
class Call extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'status'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    /**
     * Checks if call has been processed
     * @return mixed
     */
    public function isProcessed(): bool
    {
        return $this->status === 'processed';
    }

    /**
     * Checks if call has been denied
     * @return bool
     */
    public function isDenied(): bool
    {
        return $this->status === 'denied';
    }

    /**
     * Checks if call is currently pending
     * @return bool
     */
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    /**
     * Process call if it has not been denied or processed yet
     * @return bool
     */
    public function process(): bool
    {
        if (!$this->isPending()) {
            return false;
        }

        $this->update(['status' => 'processed']);

        return $this->isProcessed();
    }

    /**
     * Process call if it has not been denied or processed yet
     * @return bool
     */
    public function deny(): bool
    {
        if (!$this->isPending()) {
            return false;
        }

        return $this->update(['status' => 'denied']);
    }

    /**
     * Create call with associated relations
     *
     * @param Employee $employee
     * @param Area $area
     * @param Customer $customer
     * @return self
     */
    public static function createWithRelations(Employee $employee, Area $area, Customer $customer): self
    {
        $call = new self();

        $call->employee()->associate($employee);
        $call->area()->associate($area);
        $call->customer()->associate($customer);

        $call->save();

        return $call;
    }
}
