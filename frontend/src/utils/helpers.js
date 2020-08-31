export const dashify = str => {
    const regex = /\s/g;
    return str.replace(regex, '-');
};

export const capitalCaseInitial = str =>
    str.charAt(0).toUpperCase() + str.slice(1);

export const removeUnderscore = str => str.replace(/_/g, ' ');
