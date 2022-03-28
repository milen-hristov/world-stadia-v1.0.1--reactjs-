const errorsCheck = (obj, value) => {
    let result = Object.keys(obj).some(function (k) {
        return obj[k] !== value;
    });
    return result;
}

export default errorsCheck;