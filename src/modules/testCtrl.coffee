angular.module "voice-signup"
    .controller "testCtrl",['$scope',($scope)->
        $scope.obj = {name:"Skai"}
        $scope.change = ()->
            $scope.obj.name = "Radcliffe"
            console.log $scope.obj


    ]

