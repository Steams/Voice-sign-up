(function() {
  angular.module('voice-signup').service('SaveMember', [
    '$http', '$q', function($http, $q) {
      return function(member) {
        var defer, model;
        console.log(member);
        model = {
          "first_name": member['First Name'],
          "last_name": member['Last Name'],
          "email": member['Email address'],
          "interests": member['Interests']
        };
        console.log(model);
        defer = $q.defer();
        $http.post("http://localhost:3000/members", model).success(function(res) {
          return defer.resolve(res);
        }).error(function(err, status) {
          return defer.reject(err);
        });
        return defer.promise;
      };
    }
  ]);

}).call(this);
