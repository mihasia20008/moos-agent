import React from 'react';
import cx from 'classnames';

const TaskCard = () => {
    return (
        <div className={cx('block-list__item')} data-toggle="modal" data-target="#taskModal">
            <div className={cx('block-list__row')}>
                <div className={cx('stages-progress')}>
                    <div className={cx('stages-progress__item stages-progress__item--confirmed')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Подано</span>
                    </div>
                    <div className={cx('stages-progress__item stages-progress__item--confirmed')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Отказ</span>
                    </div>
                    <div className={cx('stages-progress__item stages-progress__item--active')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Требует изменения</span>
                    </div>
                    <div className={cx('stages-progress__item stages-progress__item--disabled')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Готово к отправке</span>
                    </div>
                    <div className={cx('stages-progress__item stages-progress__item--disabled')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Готово к отправке</span>
                    </div>
                    <div className={cx('stages-progress__item stages-progress__item--disabled')}>
                        <i className={cx('stages-progress__icon icon icon-ok')} />
                        <span className={cx('stages-progress__text')}>Отправлено</span>
                    </div>
                </div>
                <div className={cx('block-list__posted-time')}>
                    <span>3 дня</span>
                </div>
            </div>
            <div className={cx('block-list__row')}>
                <div>
                    <div className={cx('block-list__info block-list__info--with-icon')}>
                        <span className={cx('icon icon-user')} />
                        <span>ООО «ОДАС» Сколково</span>
                    </div>
                    <div className={cx('block-list__info')}>ИНН: 771375236257</div>
                </div>
                <div>
                    <table className={cx('table block-list__table')}>
                        <tr>
                            <th>Срок БГ</th>
                            <th>НМЦ закупки</th>
                            <th>Предложеная цена</th>
                        </tr>
                        <tr>
                            <td>4 дня</td>
                            <td>5 000 000.00 ₽</td>
                            <td>2 213 942 123.00 ₽</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className={cx('block-list__row')}>
                <div className={cx('block-list__desc')}>
                    <span>101-ЭГБ/17</span>
                    <span className={cx('block-list__date-from')}>от 19.07.2018</span>
                </div>
                <button className={cx('btn btn-primary btn-primary--with-icon')} data-toggle="modal" data-target="#promptModal">
                    Заполнить уведомление об отказе
                    <i className={cx('icon icon-chevron-right')} />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
