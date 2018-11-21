import React from 'react';
import cx from 'classnames';

import Overlay from '../../Overlay';

const Skelet = ({ showLoader = false }) => {
    return (
        <div className={cx('block-list__item')}>
            <div className={cx('block-list__row')}>
                <div className={cx('stages-progress')}>
                    <span className={cx('preloader-field preloader-field--circle')}>
                        <span className={cx('preloader-field__bar')} />
                    </span>
                    <span className={cx('preloader-field preloader-field--circle')}>
                        <span className={cx('preloader-field__bar')} />
                    </span>
                    <span className={cx('preloader-field preloader-field--circle')}>
                        <span className={cx('preloader-field__bar')} />
                    </span>
                    <span className={cx('preloader-field preloader-field--circle')}>
                        <span className={cx('preloader-field__bar')} />
                    </span>
                    <span className={cx('preloader-field preloader-field--circle')}>
                        <span className={cx('preloader-field__bar')} />
                    </span>
                </div>
                <div className={cx('block-list__posted-time block-list__posted-time--active')}>
                    <span>
                        <span className={cx('preloader-field')}>
                            <span className={cx('preloader-field__bar')} style={{ width: '300px' }} />
                        </span>
                    </span>
                </div>
            </div>
            <div className={cx('block-list__row')}>
                <div>
                    <div className={cx('block-list__info block-list__info--with-icon')}>
                        <span className={cx('icon icon-user')} />
                        <span>
                            <span className={cx('preloader-field')}>
                                <span className={cx('preloader-field__bar')} style={{ width: '300px' }} />
                            </span>
                        </span>
                    </div>
                    <div className={cx('block-list__info')}>
                        <span className={cx('preloader-field')}>
                            <span className={cx('preloader-field__bar')} style={{ width: '240px' }} />
                        </span>
                    </div>
                </div>
                <div>
                    <span className={cx('preloader-field preloader-field--big')}>
                        <span className={cx('preloader-field__bar')} style={{ width: '300px' }} />
                    </span>
                </div>
            </div>
            <div className={cx('block-list__row')}>
                <div className={cx('block-list__desc')}>
                    <span className={cx('preloader-field')}>
                        <span className={cx('preloader-field__bar')} style={{ width: '300px' }} />
                    </span>
                </div>
                <button className={cx('btn btn-primary btn-primary--with-icon')}>
                    Проверить и отправить
                    <i className={cx('icon icon-chevron-right')} />
                </button>
            </div>
            {showLoader && <Overlay />}
        </div>
    );
};

export default Skelet;
