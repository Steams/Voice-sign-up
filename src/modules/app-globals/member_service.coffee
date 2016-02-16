angular.module 'voice-signup'
.service 'SaveMember',['$http','$q',($http,$q)->
    return (member)->
        console.log member
        model = {
            "first_name": member['First Name']
            "last_name": member['Last Name']
            "email": member['Email address']
            "interests": member['Interests']
        }
        console.log model
        defer = $q.defer()

        $http.post "http://localhost:3000/members",model
        .success (res)->
            defer.resolve(res)
        .error (err,status)->
            defer.reject(err)

        return defer.promise
    ]
