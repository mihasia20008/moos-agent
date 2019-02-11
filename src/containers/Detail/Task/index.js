import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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
        title: '<i style="font-style: italic; color: #ccc;">Название заявки</i>',
    };

    static getFormScript(id, processDefinitionKeys) {
        return `
            try {
                ngapp.init($('#task-detail')[0], '#process_definition_key#', function (CamSDK) {
                    var urlPrefix = '',
                        camClient = new CamSDK.Client({
                            mock: false,
                            apiUri: '/camunda/api/engine'
                        }),
                        taskService = new camClient.resource('task'),
                        $container  = $('#task').parent();;
                        
                    function openForm(taskData) {
                        $('#task-detail').data('taskData', taskData);
    
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
                
                                    camForm.on('submit-success', function () {
                                        window.location.href = '/tasks/';
                                    });
                
                                    camForm.on('submit-error', function (evt, res) {
                                        console.log('submit-error', res);
                                        //uas.flash.error(res[0]);
                
                                        //$container.removeOverlay();
                                    });
                
                                    $('#camunda_complete').click(function () {
                                        //$container.addOverlay();
                
                                        camForm.submit(function (err) {
                                            if (err) {
                                                setErrorNotification(err);
                                                setTimeout(function () {
                                                    clearErrorNotification();
                                                }, 3000);                
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
                                                            //$container.removeOverlay();
                                                            var $scope = angular.element('.start-form-section form').scope();
                                                            if ($scope.$$camForm.$valid) {
                                                                //uas.flash.error('Ошибка логирования');
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
                        
                    function getTask(taskId) {
                        taskService.get(taskId, function (err, res) {
                            if (err) {
                                console.log(err, err.message, err.response);
                                if (err.status === 404) {
                                    $('#camunda').html(
                                        '<div class="error-code error-404"> ' +
                                        '<i>404</i> ' +
                                        '<h1>Задача не найдена</h1> ' +
                                        '<p>Запрашиваемая вами задача не найдена. <a class="js_modal_close" href="close">Закрыть окно</a>.</p> ' +
                                        '</div>'
                                    );
                                    return;
                                }
                                if (err.status === 401) {
                                    $('#camunda').html(
                                        '<div class="error-code error-401"> ' +
                                        '<i>401</i> ' +
                                        '<h1>Ошибка авторизации</h1> ' +
                                        '<p>Произошла ошибка при попытке авторизации. <a class="js_modal_close" href="close">Закрыть окно</a>.</p> ' +
                                        '</div>'
                                    );
                                    return;
                                }
                                $('#camunda').html(
                                    '<div class="error-code"> ' +
                                    '<i>Assign me</i> ' +
                                    '<h1>Assign me</h1> ' +
                                    '<p>Мы сожалеем, но что-то пошло не так. <a class="js_modal_close" href="close">Закрыть окно</a>.</p> ' +
                                    '</div>'
                                );
                                return;
                            }
                            
                            openForm(res);
                        });
                    }
                    
                    function setErrorNotification(content) {
                        var innerHtml =
                            '<span class="notification__text">' +
                            content +
                            '</span>' +
                            '<button type="button" class="notification__reload-link">' +
                            '    <i class="icon icon-close-s" />' +
                            '</button>'
                            .replace(/#content#/g, content);
                        
                        var elem = $(document.createElement('div'))
                            .addClass('notification')
                            .attr('id', 'error-note')
                            .html(innerHtml);
                            
                        $('#root').append(elem);
                        
                        $('.notification__reload-link').click(function() {
                            clearErrorNotification();
                        });
                    }
                    
                    function clearErrorNotification() {
                        $('#error-note').remove();
                    }
                    
                    getTask('#task_id#');
                });
            } catch (err) {
                console.log(err);
            }
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

        const taskDetailBlock = document.querySelector('#task-detail');
        taskDetailBlock.appendChild(script);
    }

    render() {
        const { title, onCloseDetail } = this.props;

        return [
            <div key={0} className="modal-content__header">
                <div>
                    <div className="modal-content__title modal-content__title--task">
                        <span className="icon icon-ok"></span>
                        <span className="task-title" dangerouslySetInnerHTML={{ __html: title }} />
                    </div>
                </div>
            </div>,
            <div key={1} className="modal-content__body" id="task-detail">
                <div id="camunda" />
            </div>,
            <div key={2} className="modal-content__footer">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={onCloseDetail}
                >
                    Отменить
                </button>
                <button
                    className="btn btn-primary"
                    type="button"
                    id="camunda_complete"
                >
                    Завершить
                </button>
            </div>
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
