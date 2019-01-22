import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class AddModalForm extends PureComponent {
    static propTypes = {
        activeDefinitionKey: PropTypes.string,
        title: PropTypes.string,
        onCloseModal: PropTypes.func.isRequired,
    };

    static getFormScript(processDefinitionKey) {
        return `
            ngapp.init($('#create-task')[0], '#process_definition_key#', function (CamSDK) {
                var camClient = new CamSDK.Client({
                    mock: false,
                    apiUri: '/camunda/api/engine'
                });
                var processService = new camClient.resource('process-definition');
                // var $container = $('.start-form-section').parent();
        
                processService.getByKey('#process_definition_key#', function (err, def) {
                    if (err) {
                        // uas.flash.error(err);
                        console.log(err);
                        return;
                    }
        
                    processService.startForm({id: def.id}, function (err, taskFormInfo) {
                        if (err) {
                            // uas.flash.error(err);
                            console.log(err);
                            return;
                        }
        
                        var url = taskFormInfo.key.replace('embedded:app:', taskFormInfo.contextPath + '/');
        
                        new CamSDK.Form({
                            client: camClient,
                            formUrl: url,
                            processDefinitionId: def.id,
                            containerElement: $('#camunda'),
                            done: function (err, camForm) {
                                if (err) {
                                    console.log(err);
                                    throw err;
                                }
        
                                camForm.on('submit-success', function () {
                                    //$container.removeOverlay();
                                    $(window).scrollTop(0);
                                    $(".bk-popup").fadeIn();
                                });
        
                                camForm.on('submit-error', function (evt, res) {
                                    console.log(res);
                                    // uas.flash.error(res[0]);
                                    //$container.removeOverlay();
                                });
        
                                $('#camunda_submit').click(function (e) {
                                    // $(".bk-overlay").fadeIn();
                                    e.preventDefault();
                                    camForm.submit(function (err, data) {
                                        if (err) {
                                            // $(".bk-overlay").hide();
                                            var $scope = angular.element('#create-task form').scope();
                                            console.log($scope);
                                            // if ($scope.$$camForm.$valid) {
                                            //     uas.flash.error(err);
                                            //     throw err;
                                            // }
                                        }
                                    });
                                });
                            }
                        });
                    });
                });
            });
        `
            .replace(/#process_definition_key#/g, processDefinitionKey);
    }

    componentDidMount() {
        const { activeDefinitionKey, onCloseModal } = this.props;
        if (typeof activeDefinitionKey === 'undefined') {
            onCloseModal();
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = AddModalForm.getFormScript(activeDefinitionKey);

        const taskDetailBlock = document.querySelector('#create-task');
        taskDetailBlock.appendChild(script);
    }

    handleClose = () => this.props.onCloseModal(-2);

    render() {
        const { title } = this.props;

        return [
            <div key={0} className="modal-content__header">
                <div>
                    <div className="modal-content__title modal-content__title--task">
                        <span className="task-title" dangerouslySetInnerHTML={{ __html: title }} />
                    </div>
                </div>
            </div>,
            <div key={1} className="modal-content__body" id="create-task">
                <div id="camunda" />
            </div>,
            <div key={2} className="modal-content__footer">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={this.handleClose}
                >
                    Отменить
                </button>
                <button
                    className="btn btn-primary"
                    type="button"
                    id="camunda_complete"
                >
                    Разместить заявку
                </button>
            </div>
        ];
    }
}

const mapStateToProps = ({ Tasks, User}, ownProps) => {
    const title = User.processDefinitionKeys.reduce((acc, item) => {
        if (item.process_definition_key === ownProps.activeDefinitionKey) {
            return item.process_name;
        }
        return acc;
    }, 'Создание');
    return {
        title,
    };
};

export default connect(
    mapStateToProps,
)(AddModalForm);

/*
ngapp.init($('#task')[0], 'bg-pa-partner-bo', function (CamSDK) {
    var urlPrefix = '',
        camClient = new CamSDK.Client({mock: false, apiUri: 'http://fplace-develop.moos.solutions/camunda/api/engine'}),
        taskService = new camClient.resource('task'),
        $container = $('#task').parent();

    $(window).resize(function () {
        addDisableTaskBlock();
    });

    function openForm(taskData) {
        $('#task').data('taskData', taskData);

        taskService.form(taskData.id, function (err, taskFormInfo) {

            var url = urlPrefix + taskFormInfo.key.replace('embedded:app:', taskFormInfo.contextPath + '/');

            new CamSDK.Form({
                client: camClient,
                formUrl: url,
                taskId: taskData.id,
                containerElement: $('#camunda'),
                done: function (err, camForm) {
                    if (err) {
                        throw err;
                    }

                    addDisableTaskBlock();

                    camForm.on('submit-success', function () {
                        window.location.reload();
                    });

                    camForm.on('submit-error', function (evt, res) {
                        uas.flash.error(res[0]);

                        $container.removeOverlay();
                    });

                    $('#camunda_complete').click(function () {
                        $container.addOverlay();

                        camForm.submit(function (err) {
                            if (err) {
                                uas.flash.error(err);

                                $container.removeOverlay();

                                throw err;
                            }
                            else {
                                //логируем успешное выполнение завершения задачи
                                $.post('/api/task/log_task_completion',
                                    {
                                        task_id: taskData.id
                                    },
                                    function (res) {
                                        //обработка ошибки логирования
                                        if (res.status == 'error') {
                                            $container.removeOverlay();
                                            var $scope = angular.element('.start-form-section form').scope();
                                            if ($scope.$$camForm.$valid) {
                                                uas.flash.error('Ошибка логирования');
                                                throw err;
                                            }
                                        }
                                    });
                            }
                        });
                    });
                }
            });
        });
    }

    function addDisableTaskBlock() {
        //Устанавливаем высоту полупрозрачного блока по содержимому из камунды
        if ($('#current_user_is_assigned').val() == 0) {
            var h = $('#task .row').height();
            $('#task .disable-task').css('min-height', h);
        }
        else {
            $('#task .disable-task').css('min-height', '0px');
        }

    }

    function getTask(taskId) {
        taskService.get(taskId, function (err, res) {
            if (err) {
                if (err.status === 404) {
                    $('#task').html(
                        '<div class="error-code error-404"> ' +
                        '<i>404</i> ' +
                        '<h1>Задача не найдена</h1> ' +
                        '<p>Запрашиваемая вами задача не найдена. <a class="js_modal_close" href="close">Закрыть окно</a>.</p> ' +
                        '</div>'
                    );

                } else if (err.status === 401) {
                    $('#task').html(
                        '<div class="error-code error-401"> ' +
                        '<i>401</i> ' +
                        '<h1>Ошибка авторизации</h1> ' +
                        '<p>Произошла ошибка при попытке авторизации. <a class="js_modal_close" href="close">Закрыть окно</a>.</p> ' +
                        '</div>'
                    );

                } else {
                    $('#task').html(
                        '<div class="error-code"> ' +
                        '<i>Assign me</i> ' +
                        '<h1>Assign me</h1> ' +
                        '<p>Мы сожалеем, но что-то пошло не так. <a class="js_modal_close" href="close">Закрыть окно</a>.</p> ' +
                        '</div>'
                    );
                }

                // throw err;
            } else {
                openForm(res);
            }
        });
    }

    getTask('79cb26f1-ed9f-11e8-8c8c-ceded2a529e3');

    $('#camunda_claim').click(function (event) {
        event.preventDefault();

        var $this = $(this),
            url = $this.data('url');

        $container.addOverlay();

        $.getJSON(url, function (data) {
            $container.removeOverlay();

            if (data.error_code) {
                uas.flash.error(data.error);
                throw data.error;

            } else {
                $("#camunda_complete").detach();
                $this.replaceWith('<button id="camunda_complete" class="button">Завершить</button>');

                //При нажатии на "Назначить на себя" удаляем полупрозрачный блок и разрешаем нажатие кнопки "Завершить"
                $('#current_user_is_assigned').val('1');
                $('.disable-task').css('min-height', '0px');
                $("#camunda_complete_container").removeClass("disable");

                getTask('79cb26f1-ed9f-11e8-8c8c-ceded2a529e3');
            }
        })
    });
});


        uas.camunda = (function(){
            var urlPrefix, camClient, taskService;

            function getTask(id, processDefinitionKey) {
                ngapp.init($('.modal-window section.task')[0], processDefinitionKey, function(CamSDK){
                    function init() {
                        urlPrefix = window.camundaBaseUrl || '', //'/templates/camunda',
                            camClient = new CamSDK.Client({ mock: false, apiUri: urlPrefix + '/camunda/api/engine' });
                        taskService = new camClient.resource('task');
                    }

                    function openForm(taskData) {
                        var $container = $('#task_' + taskData.id);

                        $container.data('taskData', taskData);

                        taskService.form(taskData.id, function(error, taskFormInfo) {
                            var url = urlPrefix + taskFormInfo.key.replace('embedded:app:', taskFormInfo.contextPath + '/');

                            new CamSDK.Form({
                                client: camClient,
                                formUrl: url,
                                taskId: taskData.id,
                                containerElement: $container.find('.task-frame, .task-camunda'),
                                done: function(error, camForm) {
                                    if (error) {
                                        throw error;
                                    }

                                    camForm.on('submit-success', function(){
                                        window.location.reload();
                                    });

                                    camForm.on('submit-error', function(event, result) {
                                        uas.flash.error(result[0]);

                                        $container.removeOverlay();
                                    });

                                    $container.find('.js_camunda_complete').on('click', function(){
                                        $container.addOverlay();

                                        camForm.submit(function(error){
                                            if (error) {
                                                uas.flash.error(error);

                                                $container.removeOverlay();

                                                throw error;
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    }

                    function getTaskById(id) {
                        taskService.get(id, function(error, response){
                            if (error) {
                                var $container = $('#task_' + id);

                                if (error.status === 404) {
                                    $container.html(
                                        '<div class="error-code error-404"> ' +
                                        '<i>404</i> ' +
                                        '<h1>Р—Р°РґР°С‡Р° РЅРµ РЅР°Р№РґРµРЅР°</h1> ' +
                                        '<p>Р—Р°РїСЂР°С€РёРІР°РµРјР°СЏ РІР°РјРё Р·Р°РґР°С‡Р° РЅРµ РЅР°Р№РґРµРЅР°. <a class="js_modal_close" href="close">Р—Р°РєСЂС‹С‚СЊ РѕРєРЅРѕ</a>.</p> ' +
                                        '</div>'
                                    );

                                } else if (error.status === 401) {
                                    process_401_error();
                                    $container.html(
                                        '<div class="error-code error-401"> ' +
                                        '<i>401</i> ' +
                                        '<h1>РћС€РёР±РєР° Р°РІС‚РѕСЂРёР·Р°С†РёРё</h1> ' +
                                        '<p>РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР° РїСЂРё РїРѕРїС‹С‚РєРµ Р°РІС‚РѕСЂРёР·Р°С†РёРё. <a class="js_modal_close" href="close">Р—Р°РєСЂС‹С‚СЊ РѕРєРЅРѕ</a>.</p> ' +
                                        '</div>'
                                    );

                                } else {
                                    $container.html(
                                        '<div class="error-code"> ' +
                                        '<i>РћС€РёР±РєР°</i> ' +
                                        '<h1>РћС€РёР±РєР°</h1> ' +
                                        '<p>РњС‹ СЃРѕР¶Р°Р»РµРµРј, РЅРѕ С‡С‚Рѕ-С‚Рѕ РїРѕС€Р»Рѕ РЅРµ С‚Р°Рє. <a class="js_modal_close" href="close">Р—Р°РєСЂС‹С‚СЊ РѕРєРЅРѕ</a>.</p> ' +
                                        '</div>'
                                    );
                                }

                                // throw error;
                            } else {
                                openForm(response);
                            }
                        });
                    }

                    if (!camClient) {
                        init();
                    }

                    if (typeof(id) === 'object') {
                        for (var i = 0, length = id.length; i < length; i++) {
                            getTaskById(id[i]);
                        }
                    } else {
                        getTaskById(id);
                    }
                });
            }

            return {
                getTask: getTask
            };
        }());
*/