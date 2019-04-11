const validate = (value) => {
    if (!value) {
        return 'Поле обязательно для заполнения!';
    }
    return '';
};

export default (values) => {
    const { agentCompanyId, companyId } = values;

    const companyErrors = validate(agentCompanyId);
    const agentErrors = validate(companyId);

    return Object.assign(
        {},
        companyErrors ? { agentCompanyId: companyErrors } : {},
        agentErrors ? { companyId: agentErrors } : {},
    );
};
