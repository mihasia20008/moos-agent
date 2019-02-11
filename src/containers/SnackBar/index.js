import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import { clearErrorContent } from "../../redux/Error/actions";

class SnackBar extends PureComponent {
    static propTypes = {
        content: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.timer = setTimeout(() => this.handleCloseSnackBar(), 3000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleCloseSnackBar = () => {
        const { dispatch } = this.props;
        dispatch(clearErrorContent());
    };

    render() {
        const { content } = this.props;

        return (
            <div className={cx('notification')}>
                <span className={cx('notification__text')}>
                    {content}
                </span>
                <button
                    type="button"
                    className={cx('notification__reload-link')}
                    onClick={this.handleCloseSnackBar}
                >
                    <i className={cx('icon icon-close-s')} />
                </button>
            </div>
        );
    }
}

const mapStateToProps = ({ Error }) => {
    return {
        content: Error.text,
    };
};

export default connect(mapStateToProps)(SnackBar);