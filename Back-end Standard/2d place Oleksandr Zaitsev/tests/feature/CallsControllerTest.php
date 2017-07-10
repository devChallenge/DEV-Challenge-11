<?php

use Laravel\Lumen\Testing\DatabaseTransactions;

/**
 * Class CallsControllerTest
 */
class CallsControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp()
    {
        parent::setUp();

        $this->artisan('db:seed');
    }

    public function testItShouldProcessCall()
    {
        $this->get('/call?area=leases&area=bills');
        $this->seeStatusCode(200);

        $body = json_decode($this->response->getContent(), true);

        $this->assertArrayHasKey('totalAssignments', $body);
        $this->assertArrayHasKey('assignments', $body);
    }
}
