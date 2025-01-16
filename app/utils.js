export function shuffle(array) {
    const result = [];
    while (array.length > 0) {
        let i = Math.floor(Math.random()*array.length);
        result.push(array[i]);
        array.splice(i, 1);
    }
    return result;
}