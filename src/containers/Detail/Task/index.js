import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cx from "classnames";

class TaskDetail extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        processDefinitionKeys: PropTypes.string,
        isFetching: PropTypes.bool.isRequired,
        title: PropTypes.string,
        onCloseDetail: PropTypes.func.isRequired,
    };
    static defaultProps = {
        processDefinitionKeys: '',
        title: '<i style="font-style: italic; color: #ccc;">Название компании</i>',
    };

    static getFormScript(id, processDefinitionKeys) {
        return `
            ngapp.init($('#comunda')[0], '#process_definition_key#', function (CamSDK) {
                var urlPrefix = '',
                    camClient = new CamSDK.Client({
                        mock: false,
                        apiUri: 'http://fplace-develop.moos.solutions/camunda/api/engine'
                    }),
                    taskService = new camClient.resource('task');
                    
                function getTask(taskId) {
                    taskService.get(taskId, function (err, res) {
                        if (err) {
                            if (err.status === 404) {
                                $('#comunda').html(
                                    '<div class="error-code error-404"> ' +
                                    '<i>404</i> ' +
                                    '<h1>Задача не найдена</h1> ' +
                                    '<p>Запрашиваемая вами задача не найдена. <a class="js_modal_close" href="close">Закрыть окно</a>.</p> ' +
                                    '</div>'
                                );
                                return;
                            }
                            if (err.status === 401) {
                                $('#comunda').html(
                                    '<div class="error-code error-401"> ' +
                                    '<i>401</i> ' +
                                    '<h1>Ошибка авторизации</h1> ' +
                                    '<p>Произошла ошибка при попытке авторизации. <a class="js_modal_close" href="close">Закрыть окно</a>.</p> ' +
                                    '</div>'
                                );
                                return;
                            }
                            $('#comunda').html(
                                '<div class="error-code"> ' +
                                '<i>Assign me</i> ' +
                                '<h1>Assign me</h1> ' +
                                '<p>Мы сожалеем, но что-то пошло не так. <a class="js_modal_close" href="close">Закрыть окно</a>.</p> ' +
                                '</div>'
                            );
                            return;
                        }
                        // openForm(res);
                    });
                }
                getTask('#task_id#');
            });
        `
            .replace(/#process_definition_key#/g, processDefinitionKeys)
            .replace(/#task_id#/g, id);
    }

    componentDidMount() {
        const { id, processDefinitionKeys, onCloseDetail } = this.props;
        if (processDefinitionKeys.length === 0) {
            onCloseDetail();
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = TaskDetail.getFormScript(id, processDefinitionKeys);
        this.formScript.appendChild(script);
    }

    render() {
        const {isFetching, title} = this.props;

        return [
            <div key={0} className={cx('modal-content__header', {
                'modal-content--blur': isFetching,
            })}>
                <div>
                    <div className={cx('modal-content__title modal-content__title--task')}>
                        <span className={cx('icon icon-ok')}/>
                        <span dangerouslySetInnerHTML={{__html: title}}/>
                    </div>
                </div>
            </div>,
            <div
                key={1}
                className={cx('modal-content__body', {
                    'modal-content--blur': isFetching,
                })}
                id="#comunda"
            />,
            <div key={2} ref={node => (this.formScript = node)} />,
        ];
    }
}

const mapStateToProps = ({ Tasks, User}, ownProps) => {
    return {
        isFetching: Tasks.isFetching,
        title: ownProps.title || Tasks.tasks[ownProps.id],
        processDefinitionKeys: User.processDefinitionKeys[0].process_definition_key,
    };
};

export default connect(
    mapStateToProps,
)(TaskDetail);
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
*/