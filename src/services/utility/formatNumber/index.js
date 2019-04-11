export default (x, needPad) => {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    if (parts[1] && needPad) {
        parts[1] = parts[1].padEnd(2, '0');
    }
    return parts.join(".");
};
