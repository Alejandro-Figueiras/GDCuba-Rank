module.exports = (str = "") => {
    const data = str.split('#')[0].split(":");

    let res = {};
    for (let i = 0; i < data.length; i += 2) {
        res[data[i]] = data[i + 1]
    }

    return res;
} 