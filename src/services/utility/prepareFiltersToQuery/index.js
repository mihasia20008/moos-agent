export default (filters) => Object.keys(filters).reduce((acc, global) => {
    if (typeof filters[global] === 'object') {
        const value = Object.keys(filters[global]).reduce((res, inner) => {
            if (filters[global][inner] !== '') {
                return `${res}&${global}_${inner}=${filters[global][inner]}`;
            }
            return res;
        }, '');
        return `${acc}&${value}`;
    }
    return `${acc}&${global}=${filters[global]}`;
}, '');
