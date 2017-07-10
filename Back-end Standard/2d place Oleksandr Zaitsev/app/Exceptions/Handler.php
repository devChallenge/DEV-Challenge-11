<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Http\Response;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        $response = [
            'message' => $e->getMessage(),
            'status' => preg_match('/^(3|4|5)\d{2}$/', $e->getCode()) ? $e->getCode() : 400
        ];

        if ($e instanceof HttpException) {
            $response['status'] = $e->getStatusCode();
            $response['message'] = Response::$statusTexts[$e->getStatusCode()];
        } elseif ($e instanceof ModelNotFoundException) {
            $response['status'] = Response::HTTP_NOT_FOUND;
            $response['message'] = Response::$statusTexts[Response::HTTP_NOT_FOUND];
        }

        return response()->json(['error' => $response], $response['status'], ['Access-Control-Allow-Origin' => '*']);
    }
}
