<!doctype html>
<html ng-app="twootApp">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.4/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.4/angular-resource.js"></script>
    <script src="/twoot/assets/js/twoot.js"></script>
    <link rel="stylesheet" href="/twoot/assets/css/twoot.css">
</head>

<body>
    <div class="container" ng-controller="TwootCtrl">
        <div class="page-header">
            <h1>Twooter
                <small>'cause twitter's just so yesterday...</small>
            </h1>
        </div>
        <div class="panel panel-default stats">
            <div class="panel-heading">Twoot Summary</div>
            <div class="panel-body">
                <span>twoots
                    <strong><?php echo count($twoots)?></strong>
                </span>
            </div>
        </div>

        <form role="form" ng-submit="addTwoot()">
            <div class="form-group">
                <textarea id="twoot-box" class="twoot-box form-control" rows="3" spellcheck="true" ng-model="twootText" placeholder="What's on your mind?"></textarea>
            </div>
            <div class="twoot-button">
                <span class="twoot-char-count" ng-class="{warn: (twootText.length >= 120), superwarn: (twootText.length >= 130)}">{{140 - twootText.length}}</span>
                <button type="submit" class="btn btn-info" ng-class="{disabled: (twootText.length == 0 || twootText.length > 140)}">Send Twoot</button>
            </div>
        </form>

        <div class="panel panel-default stream">
            <div class="panel-heading">Twoots</div>
            <ul class="list-group">
                <?php 
                    foreach ($twoots as $twoot){
                        echo '<li class="list-group-item">'.$twoot->twootText.'</li>';
                    }
                ?>
            </ul>
        </div>
    </div>
</body>

</html>
