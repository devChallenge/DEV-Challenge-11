<?php

/* @var $this yii\web\View */

$this->registerJsFile('/js/agent.js', ['depends' => \app\assets\AppAsset::class]);

?>

<div class="row">
    <div class="col-md-4">
        <div class="form-group">
            <label for="origin">Звідки</label>
            <input type="input" class="form-control" id="origin">
        </div>
        <div class="form-group">
            <label for="destination">Куди</label>
            <input type="input" class="form-control" id="destination">
        </div>
    </div>

    <div class="col-md-4">
        <div class="form-group">
            <label for="cost">Ціна</label>
            <input type="input" class="form-control" id="cost">
        </div>
        <div class="form-group">
            <label for="start">Час</label>
            <input type="input" class="form-control" id="start">
        </div>
    </div>

    <div class="col-md-4">
        <div class="form-group">
            <label for="duration">Хвилин летіти</label>
            <input type="input" class="form-control" id="duration">
            <input type="hidden" class="form-control" id="id">
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-4">
        <button type="button" class="btn btn-success" id="update">Оновити</button>

    </div>
</div>

<br>

<table class="table table-bordered" id="agent-list">
    <thead>
    <tr>
        <th>Звідки</th>
        <th>Куди</th>
        <th>Ціна</th>
        <th>Час</th>
        <th>Хвилин летіти</th>
        <th></th>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>