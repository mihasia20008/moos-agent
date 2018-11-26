import React, { PureComponent } from 'react';
import cx from 'classnames';

import { CopyToClipboard } from 'react-copy-to-clipboard';

class DetailClient extends PureComponent {
  state = { wasCopy: false };

  handleCopyLink = () => {
    this.setState({ wasCopy: true });
    setTimeout(() => this.setState({ wasCopy: false }), 200);
    alert('Was copy!');
  }

  render() {
    const { wasCopy } = this.state;

    return ([
      <div key={0} className={cx('modal-content__header')}>
        <div>
          <div className={cx('modal-content__title')}>
            <span className={cx('icon icon-user')} />
            <span>ООО «ОДАС» Сколково</span>
          </div>
          <div className={cx('modal-content__title')}>
            <span>ИНН: 771375236257</span>
          </div>
        </div>
        <div>
          <ul className={cx('stats-list')}>
            <li className={cx('stats-list__item stats-list__item--purple')}>
              <i className={cx('icon icon-ok')} />
              <span>1</span>
            </li>
            <li className={cx('stats-list__item stats-list__item--yellow')}>
              <i className={cx('icon icon-ok')} />
              <span>2</span>
            </li>
            <li className={cx('stats-list__item stats-list__item--green')}>
              <i className={cx('icon icon-ok')} />
              <span>10</span>
            </li>
          </ul>
        </div>
      </div>,
      <div key={1} className={cx('modal-content__body')}>
        <div className={cx('info-block')}>
          <div className={cx('info-block__item info-block__item--title-main info-block__item--left')}>
            Индивидуальный предприниматель, г. Ярославль
          </div>
          <div className={cx('info-block__item info-block__item--right')}>
            <span className={cx('info-block__item-title')}>КПП</span>
            <span className={cx('info-block__item-value')}>771001001</span>
          </div>
          <div className={cx('info-block__item info-block__item--right')}>
            <span className={cx('info-block__item-title')}>ОГРН</span>
            <span className={cx('info-block__item-value')}>771375236257</span>
          </div>
        </div>
        <div className={cx('info-block')}>
          <div className={cx('info-block__item info-block__item--title info-block__item--left info-block__item--fullwidth')}>
            Контакты
          </div>
          <div className={cx('info-block__item info-block__item--left')}>
            <span className={cx('info-block__item-title')}>Адрес</span>
            <span className={cx('info-block__item-value')}>Москва, 123060, 1-й Волоколамский проезд, д. 10, стр. 1</span>
          </div>
          <div className={cx('info-block__item info-block__item--right')}>
            <span className={cx('info-block__item-title')}>Телефон</span>
            <span className={cx('info-block__item-value')}>+7 495 950-21-56</span>
          </div>
          <div className={cx('info-block__item info-block__item--right')}>
            <span className={cx('info-block__item-title')}>Контактное лицо</span>
            <span className={cx('info-block__item-value')}>Мельникова Е. В.</span>
          </div>
        </div>
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
        <div className={cx('orders-list')}>
          <div className={cx('orders-list__row')}>
            <div className={cx('orders-list__title')}>
              <span className={cx('orders-list__title-name')}>101-ЭГБ/17</span>
              <span className={cx('orders-list__title-date')}>от 19.07.2018</span>
            </div>
            <span className={cx('badge badge--purple')}>Новая заявка</span>
          </div>
          <div className={cx('orders-list__row')}>
            <div className={cx('orders-list__title')}>
              <span className={cx('orders-list__title-name')}>101-ЭГБ/17</span>
              <span className={cx('orders-list__title-date')}>от 19.07.2018</span>
            </div>
            <span className={cx('badge badge--yellow')}>Требует изменения</span>
          </div>
          <div className={cx('orders-list__row')}>
            <div className={cx('orders-list__title')}>
              <span className={cx('orders-list__title-name')}>101-ЭГБ/17</span>
              <span className={cx('orders-list__title-date')}>от 19.07.2018</span>
            </div>
            <span className={cx('badge badge--yellow')}>Одобрено, требует заполнения уведомления</span>
          </div>
          <div className={cx('orders-list__row')}>
            <div className={cx('orders-list__title')}>
              <span className={cx('orders-list__title-name')}>101-ЭГБ/17</span>
              <span className={cx('orders-list__title-date')}>от 19.07.2018</span>
            </div>
            <span className={cx('badge badge--green')}>Готово к отправке</span>
          </div>
          <div className={cx('orders-list__row')}>
            <div className={cx('orders-list__title')}>
              <span className={cx('orders-list__title-name')}>101-ЭГБ/17</span>
              <span className={cx('orders-list__title-date')}>от 19.07.2018</span>
            </div>
            <span className={cx('badge badge--green')}>Одобрено</span>
          </div>
        </div>
      </div>,
      <div key={2} className={cx('modal-help-block')}>
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
};

export default DetailClient;
