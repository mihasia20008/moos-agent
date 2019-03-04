const validateName = (value) => {
    if (!value) {
        return 'Поле обязательно для заполнения!';
    }

    const item = value.split(' ');
    if (item.length < 2) {
        return 'Фамилия и Имя являются обязательными!';
    }
    if (item[0].length < 2) {
        return 'Неверный ввод Фамилии!';
    }
    if (item[1].length < 2) {
        return 'Неверный ввод Имени!';
    }
    return '';
};

const validateEmail = (value) => {
    if (!value) {
        return 'Поле обязательно для заполнения!';
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Введен некорректный e-mail!';
    }
    return '';
};

const validateStatus = (value) => {
    if (!value) {
        return 'Поле обязательно для заполнения!';
    }
    return '';
};

export default (values) => {
    const { email, name, ismanager } = values;

    const nameErrors = validateName(name);
    const emailErrors = validateEmail(email);
    const statusErrors = validateStatus(ismanager);

    return Object.assign(
        {},
        nameErrors ? { name: nameErrors } : {},
        emailErrors ? { email: emailErrors } : {},
        statusErrors ? { ismanager: statusErrors } : {},
    );
};