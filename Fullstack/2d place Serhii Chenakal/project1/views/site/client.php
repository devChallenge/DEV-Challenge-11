<?php

/* @var $this yii\web\View */

$this->registerJsFile('/js/client.js', ['depends' => \app\assets\AppAsset::class]);

?>

<div class="row">
    <div class="col-md-4">
        <div class="form-group">
            <label for="from">Звідки</label>
            <input type="input" class="form-control" id="from">
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label for="to">Куди</label>
            <input type="input" class="form-control" id="to">
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-4">
        <button type="button" class="btn btn-success" id="send">Надіслати</button>
    </div>
</div>

<br>

<div class="row">
    <div class="col-md-12 data">

    </div>
</div>