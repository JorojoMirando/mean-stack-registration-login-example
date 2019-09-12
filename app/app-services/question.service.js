(function () {
    'use strict';

    angular
        .module('app')
        .factory('QuestionService', Service);

    function Service($http, $q) {
        var service = {};

        //service.GetCurrent = GetCurrent;
        //service.GetAll = GetAll;
        //service.GetById = GetById;
        service.GetByQuestao = GetByQuestao;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        /*function GetCurrent() {
            return $http.get('/api/users/current').then(handleSuccess, handleError);
        }*/

        /*function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError);
        }*/

        /*function GetById(_id) {
            return $http.get('/api/users/' + _id).then(handleSuccess, handleError);
        }*/

        function GetByQuestao(questao) {
            return $http.get('/api/questions/' + questao).then(handleSuccess, handleError);
        }

        function Create(questao) {
            return $http.post('/api/questions', questao).then(handleSuccess, handleError);
        }

        function Update(questao) {
            return $http.put('/api/questions/' + questao._id, questao).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/questions/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
