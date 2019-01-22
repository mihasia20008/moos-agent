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
                                    window.location.href = '/tasks/';
                                    // $(".bk-popup").fadeIn();
                                });
        
                                camForm.on('submit-error', function (evt, res) {
                                    console.log(res);
                                    // uas.flash.error(res[0]);
                                    //$container.removeOverlay();
                                });
        
                                $('#camunda_submit').click(function (e) {
                                    // $(".bk-overlay").fadeIn();
                                    e.preventDefault();
                                    console.log('submit');
                                    camForm.submit(function (err, data) {
                                        console.log(err, data);
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
                    id="camunda_submit"
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
