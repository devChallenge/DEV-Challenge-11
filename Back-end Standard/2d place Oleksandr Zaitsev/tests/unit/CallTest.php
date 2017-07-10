<?php

use Laravel\Lumen\Testing\DatabaseTransactions;
use App\Call;

/**
 * Class CallTest
 */
class CallTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp()
    {
        parent::setUp();

        $this->artisan('db:seed');
    }

    public function testCallCanBeProcessed()
    {
        $call = $this->getPendingCall();

        $this->assertTrue($call->isPending());
        $this->assertTrue($call->process());
        $this->assertFalse($call->isPending());
        $this->assertFalse($call->isDenied());
        $this->assertTrue($call->isProcessed());
    }

    public function testCallCanBeDenied()
    {
        $call = $this->getPendingCall();

        $this->assertTrue($call->isPending());
        $this->assertTrue($call->deny());
        $this->assertFalse($call->isPending());
        $this->assertFalse($call->isProcessed());
        $this->assertTrue($call->isDenied());
    }

    protected function getPendingCall()
    {
        $call = Call::first();
        $call->update(['status' => 'pending']);

        return $call;
    }
}
