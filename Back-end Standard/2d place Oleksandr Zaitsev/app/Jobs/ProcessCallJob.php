<?php

namespace App\Jobs;

use App\Call;

/**
 * Class ProcessCallJob
 * @package App\Jobs
 */
class ProcessCallJob extends Job
{
    /**
     * @var
     */
    protected $call;

    /**
     * ProcessCallJob constructor.
     *
     * @param Call $call
     */
    public function __construct(Call $call)
    {
        $this->call = $call;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // emulate processing time
        sleep(5);

        $this->call->employee->update(['in_talk' => false]);
        $this->call->update(['status' => 'processed']);
    }
}
