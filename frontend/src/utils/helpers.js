export const dashify = str => {
    const regex = /\s/g;
    return str.replace(regex, '-');
};
