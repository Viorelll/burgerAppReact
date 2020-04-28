export const updateObject = (oldObject, updatedProprities) => {
    return {
        ...oldObject,
        ...updatedProprities
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) return true; //if not exists any rules then is valid

    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}