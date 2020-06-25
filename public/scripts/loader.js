let app = angular.module('myapp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '/views/notSubmitted.html'
        })
        .when('/submitted', {
            templateUrl: 'views/result.html'
        })
        .when('/imageUploader', {
            templateUrl: 'views/addImages.html'
        })
        .otherwise({
            redirectTo: '/'
        })
}]);

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.notSubmitted = '';
    $scope.submitted = '';
    $scope.getNotSubmitted = function () {
        $http.get('/getNotSubmitted').then(
            function (result) {
                $scope.notSubmitted = result.data.datas;
            }, function (error) {

            });
    }

    $scope.getSubmitted = function () {
        $http.get('/submitted').then(
            function (result) {
                $scope.submitted = result.data.datas;
            }, function (error) {

            });
    }
    $scope.uploadImage = function () {
        let photo = document.getElementById("image-file").files[0];  // file from input
        let req = new XMLHttpRequest();
        let formData = new FormData();

        req.onreadystatechange = function () {
            if (req.readyState === 4 && req.status === 200) {
                document.getElementById('alert').style.display = 'inline-block';
                $scope.alertAddImage();
            }
        }
        formData.append("photo", photo);
        req.open("POST", '/uploadImage');
        req.send(formData);
    }

    $scope.alertAddImage = function () {
        setTimeout(() => {
            document.getElementById('alert').style.display = 'none';
        }, 2000);
    }
    $scope.setName = function (data) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log('sent');

            }
        };
        let removeData = $scope.notSubmitted.indexOf(data);
        $scope.notSubmitted.splice(removeData,1);
        xhttp.open("POST", "/updateImage", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(JSON.stringify({imagePath: data.imagePath, imgName: data.name}));
    }
    $scope.search = function (searchBar) {
        $scope.textGeorgian = searchBar;
        $scope.text = translateSymbols(searchBar);
    }
}]);
