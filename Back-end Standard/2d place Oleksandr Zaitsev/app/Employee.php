<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Employee
 * @package App
 */
class Employee extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'at_work', 'in_talk'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'at_work' => 'boolean',
        'in_talk' => 'boolean'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function calls()
    {
        return $this->hasMany(Call::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function areas()
    {
        return $this->belongsToMany(Area::class);
    }

    /**
     * Checks if employee at work now
     * @return bool
     */
    public function isAtWork(): bool
    {
        return (bool) $this->at_work;
    }

    /**
     * Checks if employee in talk now
     * @return bool
     */
    public function isInTalk(): bool
    {
        return (bool) $this->in_talk;
    }

    /**
     * Checks if employee is available to process a call
     * @return bool
     */
    public function isAvailable(): bool
    {
        return $this->isAtWork() && !$this->isInTalk();
    }

    /**
     * Register employee
     * @return bool
     */
    public function register(): bool
    {
        if ($this->isAtWork()) {
            return false;
        }

        return $this->update(['at_work' => true]);
    }

    /**
     * Un register employee
     * @return bool
     */
    public function unRegister(): bool
    {
        if (!$this->isAtWork()) {
            return false;
        }

        return $this->update(['at_work' => false]);
    }

    /**
     * Return random employee that can handle a call for specified area
     * @param string $area
     * @return mixed
     */
    public static function getRandomForArea(string $area)
    {
        $employees = Employee::with('areas')
            ->where('employees.at_work', true)
            ->where('employees.in_talk', false)
            ->whereHas('areas', function ($query) use ($area) {
                $query->where('name', $area);
            })
            ->get();

        return $employees->shuffle()->first();
    }

    /**
     * Get employee in talk
     * @return bool
     */
    public function getInTalk(): bool
    {
        if (!$this->isAvailable()) {
            return false;
        }

        return $this->update(['in_talk' => true]);
    }
}
