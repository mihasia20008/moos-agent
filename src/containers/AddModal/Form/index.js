import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class AddModalForm extends PureComponent {
    static propTypes = {
        activeDefinitionKey: PropTypes.string,
        title: PropTypes.string,
        onCloseModal: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
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
                        setErrorNotification(err.message);
                        setTimeout(function () {
                            clearErrorNotification();
                        }, 3000);
                        return;
                    }
        
                    processService.startForm({id: def.id}, function (err, taskFormInfo) {
                        if (err) {
                            setErrorNotification(err.message);
                            setTimeout(function () {
                                clearErrorNotification();
                            }, 3000);
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
                                    console.log('all', err);
                                    throw err;
                                }
        
                                camForm.on('submit-success', function () {
                                    window.location.href = '/tasks/';
                                });
        
                                camForm.on('submit-error', function (evt, res) {
                                    console.log('submit-error', res);
                                    removePreloader();
                                    setErrorNotification(res[0]);
                                    setTimeout(function () {
                                        clearErrorNotification();
                                    }, 3000);
                                });
        
                                $('#camunda_submit').click(function (e) {
                                    e.preventDefault();
                                    setPreloader();
                                    camForm.submit(function (err, data) {
                                        if (err) {
                                            removePreloader();
                                            var $scope = angular.element('#create-task form').scope();
                                            if ($scope.$$camForm.$valid) {
                                                setErrorNotification(err.message);
                                                setTimeout(function () {
                                                    clearErrorNotification();
                                                }, 3000);
                                            } else {
                                                setErrorNotification(err);
                                                setTimeout(function () {
                                                    clearErrorNotification();
                                                }, 3000);
                                            }
                                        }
                                    });
                                });
                            }
                        });
                    });
                });
                
                
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
                
                function setPreloader() {
                    var innerHtml = 
                        '<svg viewBox="-2000 -1000 4000 2000">' +
                            '<path id="inf" d="M354-354A500 500 0 1 1 354 354L-354-354A500 500 0 1 0-354 354z" />' +
                            '<use xlink:href="#inf" stroke-dasharray="1570 5143" stroke-dashoffset="6713px" />' +
                        '</svg>';
                        
                    var elem = $(document.createElement('div'))
                        .addClass('preloader preloader--big')
                        .attr('id', 'preloader')
                        .html(innerHtml);
                        
                    $('#camunda').closest('.modal-content').append(elem);
                }
                
                function removePreloader() {
                    $('#preloader').remove();
                }
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
                    id="camunda_submit"
                >
                    Разместить заявку
                </button>
            </div>
        ];
    }
}

const mapStateToProps = ({ Tasks, User }, ownProps) => {
    const title = User.processDefinitionKeys.reduce((acc, item) => {
        if (item.process_definition_key === ownProps.activeDefinitionKey) {
            return item.process_name;
        }
        return acc;
    }, 'Создание');
    return {
        title
    };
};

export default connect(
    mapStateToProps,
)(AddModalForm);
