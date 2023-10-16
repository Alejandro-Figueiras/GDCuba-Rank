export const log = (message, separator = true) => {
    if (separator) console.log('---------------------------------------------------');
    console.log(message);
}
