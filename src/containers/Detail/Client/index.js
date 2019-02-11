import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import OrderItem from './blocks/OrderItem';

import { getClientItem, clearClient } from "../../../redux/Client/actions";
import { authenticationUser } from "../../../redux/User/actions";

class DetailClient extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    session_id: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    name: PropTypes.string,
    fullname: PropTypes.string,
    INN: PropTypes.string,
    OGRN: PropTypes.string,
    KPP: PropTypes.string,
    address: PropTypes.string,
    orders: PropTypes.array,
    onProgrammingRedirect: PropTypes.func.isRequired,
  };

  state = { wasCopy: false };

  componentDidMount() {
    const { session_id, id, dispatch } = this.props;
    dispatch(getClientItem(session_id, id));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearClient());
  }

  handleCopyLink = () => {
    this.setState({ wasCopy: true });
    setTimeout(() => this.setState({ wasCopy: false }), 200);
    alert('Was copy!');
  };

  handleOpenTaskDetail = (taskId, taskName) => {
    const { session_id, onProgrammingRedirect, dispatch } = this.props;
    dispatch(authenticationUser(session_id, true))
      .then(() => onProgrammingRedirect(`/tasks/${taskId}`, {
        title: taskName
      }))
      .catch(err => console.log(err));
  };

  render() {
    const { wasCopy } = this.state;
    const { isFetching, name, INN, OGRN, KPP, address, fullName, orders } = this.props;

    return ([
      <div key={0} className={cx('modal-content__header', {
        'modal-content--blur': isFetching,
      })}>
        <div>
          <div className={cx('modal-content__title')}>
            <span className={cx('icon icon-user')} />
            <span dangerouslySetInnerHTML={{ __html: name }} />
          </div>
          <div className={cx('modal-content__title')}>
            <span>ИНН: {INN}</span>
          </div>
        </div>
        {/*<div>*/}
          {/*<ul className={cx('stats-list')}>*/}
            {/*<li className={cx('stats-list__item stats-list__item--purple')}>*/}
              {/*<i className={cx('icon icon-ok')} />*/}
              {/*<span>1</span>*/}
            {/*</li>*/}
            {/*<li className={cx('stats-list__item stats-list__item--yellow')}>*/}
              {/*<i className={cx('icon icon-ok')} />*/}
              {/*<span>2</span>*/}
            {/*</li>*/}
            {/*<li className={cx('stats-list__item stats-list__item--green')}>*/}
              {/*<i className={cx('icon icon-ok')} />*/}
              {/*<span>10</span>*/}
            {/*</li>*/}
          {/*</ul>*/}
        {/*</div>*/}
      </div>,
      <div
        key={1}
        className={cx('modal-content__body', {
          'modal-content--blur': isFetching,
        })}
      >
        <div className={cx('info-block')}>
          <div
              className={cx('info-block__item info-block__item--title-main info-block__item--left')}
              dangerouslySetInnerHTML={{ __html: fullName }}
          />
          <div className={cx('info-block__item info-block__item--right')}>
            <span className={cx('info-block__item-title')}>КПП</span>
            <span className={cx('info-block__item-value')} dangerouslySetInnerHTML={{ __html: KPP }} />
          </div>
          <div className={cx('info-block__item info-block__item--right')}>
            <span className={cx('info-block__item-title')}>ОГРН</span>
            <span className={cx('info-block__item-value')} dangerouslySetInnerHTML={{ __html: OGRN }} />
          </div>
        </div>
        <div className={cx('info-block info-block--last')}>
          <div className={cx('info-block__item info-block__item--title info-block__item--left info-block__item--fullwidth')}>
            Контакты
          </div>
          <div className={cx('info-block__item info-block__item--left')}>
            <span className={cx('info-block__item-title')}>Адрес</span>
            <span className={cx('info-block__item-value')} dangerouslySetInnerHTML={{ __html: address }} />
          </div>
          {/*<div className={cx('info-block__item info-block__item--right')}>*/}
            {/*<span className={cx('info-block__item-title')}>Телефон</span>*/}
            {/*<span className={cx('info-block__item-value')}>+7 495 950-21-56</span>*/}
          {/*</div>*/}
          {/*<div className={cx('info-block__item info-block__item--right')}>*/}
            {/*<span className={cx('info-block__item-title')}>Контактное лицо</span>*/}
            {/*<span className={cx('info-block__item-value')}>Мельникова Е. В.</span>*/}
          {/*</div>*/}
        </div>
        {/* Документы */}
        <div className={cx('orders-list')}>{
            orders.map((order) => (
                <OrderItem
                    key={order.order_id}
                    task={order.tasks ? order.tasks[0] : undefined}
                    orderNumber={order.orderNumber}
                    createdDate={order.createdDate}
                    activePhase={order.phases[order.phases.length - 1]}
                    onOpenTaskDetail={this.handleOpenTaskDetail}
                />
            ))
        }</div>
      </div>,
      <div key={2} className={cx('modal-help-block', {
          'modal-content--blur': isFetching,
      })}>
        {/* История клиента */}
        <CopyToClipboard text={window.location.href}
          onCopy={this.handleCopyLink}>
          <button
            type="button"
            className={cx('modal-help-block__copy-link btn btn-send')}
          >
            <span>Отправить ссылку</span>
            <i className={cx('icon icon-send')} />
          </button>
        </CopyToClipboard>
      </div>
    ]);
  }
}

const mapStateToProps = ({ User, Client }) => {
  const { isFetching, company } = Client;
  return {
    session_id: User.session_id,
    isFetching: isFetching,
    name: !isFetching && typeof company.displayName !== 'undefined' && company.displayName
      ? company.displayName
      : !isFetching && typeof company.fullName !== 'undefined' && company.fullName
        ? company.fullName
        : !isFetching
          ? '<i style="font-style: italic; color: #ccc;">Не указан</i>'
          : 'ООО «ОДАС» Сколково',
    fullName: !isFetching && typeof company.fullName !== 'undefined' && company.fullName
        ? company.fullName
        : !isFetching
            ? '<i style="font-style: italic; color: #ccc;">Не указан</i>'
            : 'Индивидуальный предприниматель',
    INN: !isFetching && typeof company.INN !== 'undefined' && company.INN
        ? company.INN
        : !isFetching
            ? ''
            : '771375236257',
    OGRN: !isFetching && typeof company.OGRN !== 'undefined' && company.OGRN
      ? company.OGRN
      : !isFetching
        ? '<i style="font-style: italic; color: #ccc;">Не указан</i>'
        : '771375236257',
    KPP: !isFetching && typeof company.KPP !== 'undefined' && company.KPP
      ? company.KPP
      : !isFetching
        ? '<i style="font-style: italic; color: #ccc;">Не указан</i>'
        : '771001001',
    address: !isFetching && typeof company.legalAddress !== 'undefined' && company.legalAddress
      ? company.legalAddress.addressResult
      : !isFetching
        ? '<i style="font-style: italic; color: #ccc;">Не указан</i>'
        : 'Москва, 123060, 1-й Волоколамский проезд, д. 10, стр. 1',
    orders: company.order || [],
  };
};

export default connect(mapStateToProps)(DetailClient);

/*
// История клиента
        <div className={cx('modal-help-block__container')}>
          <div className={cx('modal-help-block__header')}>
            <span>История клиента</span>
            <i className={cx('icon icon-chevron-right')} />
          </div>
          <div className={cx('modal-help-block__body')}>
            <div className={cx('history-list')}>
              <div className={cx('history-list__item')}>
                <div className={cx('history-list__icon')}>
                  <i className={cx('icon icon-ok icon--purple')} />
                </div>
                <div className={cx('history-list__item-body')}>
                  <div className={cx('history-list__info')}>
                    <span>19.07.2018</span>
                    <span>101-ЭГБ/17</span>
                  </div>
                  <div className={cx('history-list__title')}>
                    Новая заявка
                  </div>
                  <div className={cx('history-list__status')}>
                    Заполнена и отправлена
                  </div>
                </div>
              </div>
              <div className={cx('history-list__item')}>
                <div className={cx('history-list__icon')}>
                  <i className={cx('icon icon-ok icon--red')} />
                </div>
                <div className={cx('history-list__item-body')}>
                  <div className={cx('history-list__info')}>
                    <span>19.07.2018</span>
                    <span>101-ЭГБ/17</span>
                  </div>
                  <div className={cx('history-list__title')}>
                    Отказано банком, возврат на доработку
                  </div>
                  <div className={cx('history-list__status')}>
                    Исправлено
                  </div>
                </div>
              </div>
              <div className={cx('history-list__item')}>
                <div className={cx('history-list__icon')}>
                  <i className={cx('icon icon-ok icon--yellow')} />
                </div>
                <div className={cx('history-list__item-body')}>
                  <div className={cx('history-list__info')}>
                    <span>19.07.2018</span>
                    <span>101-ЭГБ/17</span>
                  </div>
                  <div className={cx('history-list__title')}>
                    Одобрено, требует заполнения уведомления
                  </div>
                  <div className={cx('history-list__status')}>
                    Уведомление заполнено
                  </div>
                </div>
              </div>
              <div className={cx('history-list__item')}>
                <div className={cx('history-list__icon')}>
                  <i className={cx('icon icon-ok icon--green')} />
                </div>
                <div className={cx('history-list__item-body')}>
                  <div className={cx('history-list__info')}>
                    <span>19.07.2018</span>
                    <span>101-ЭГБ/17</span>
                  </div>
                  <div className={cx('history-list__status')}>
                    Одобрено. Требует проверки перед отправкой
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('modal-help-block__footer')}>
          </div>
        </div>

  //
          <div className={cx('info-block info-block--last')}>
              <div className={cx('info-block__item info-block__item--title info-block__item--left info-block__item--fullwidth')}>
                  Документы
              </div>
              <div className={cx('info-block__item info-block__item--fullwidth')}>
                  <span className={cx('info-block__item-title')}>Контракты</span>
                  <span className={cx('info-block__item-value')}>
                      <a href="#download">
                          <span>Контракт_Москва 129000_2018_сентябрь.docx</span>
                          <span>(1,2мб)</span>
                      </a>
                  </span>
                  <span className={cx('info-block__item-value')}>
                      <a href="#download">
                          <span>Контракт_Москва 129000_2018_июнь.docx</span>
                          <span>(1,2мб)</span>
                      </a>
                  </span>
                  <span className={cx('info-block__item-value')}>
                      <a href="#download">
                          <span>Контракт_Москва 129000_2018_апрель.docx</span>
                          <span>(1,2мб)</span>
                      </a>
                  </span>
              </div>
          </div>

 */
