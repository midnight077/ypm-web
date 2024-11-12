export function limitStr(str, wordsLimit = 30, charsLimit = 180) {
    let limitedStr = str;

    const words = str.split(" ");

    if (words.length > wordsLimit) {
        limitedStr = words.slice(0, wordsLimit).join(" ");
    }

    if (limitedStr.length > charsLimit) {
        limitedStr = limitedStr.substring(0, charsLimit);
    }

    if (str.length !== limitedStr.length) {
        limitedStr += "...";
    }

    return limitedStr;
}
