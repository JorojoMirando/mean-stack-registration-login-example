(function () {
    'use strict';

    angular
        .module('app')
        .controller('Question.IndexController', Controller);

    function Controller($window, UserService, QuestionService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.saveQuestion = saveQuestion;
        //vm.deleteQuestion = deleteQuestion;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function saveQuestion() {
            /*
            QuestionService.Update(vm.question)
                .then(function () {
                    FlashService.Success('Questao salva!');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });*/
            QuestionService.Create(vm.question)
            //QuestionService.Update(vm.question)
            .then(function () {
                FlashService.Success('Questao salva!');
            })
            .catch(function (error) {
                FlashService.Error(error);
            });
        }

        function deleteQuestion() {
            QuestionService.Delete(vm.question._id)
                .then(function () {
                    // log user out
                    //$window.location = '/login';
                    FlashService.Success('Questao deletada!');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();