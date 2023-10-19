export default (str = "", separador = ":") => {
    const data = str.split('#')[0].split(separador);

    let res = {};
    for (let i = 0; i < data.length; i += 2) {
        res[data[i]] = data[i + 1]
    }

    return res;
} 