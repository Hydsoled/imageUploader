module.exports.RomanizationUtil = function (word) {
    let words = {
        ა: 'a',
        ბ: 'b',
        გ: 'g',
        დ: 'd',
        ე: 'e',
        ვ: 'v',
        ზ: 'z',
        თ: 't',
        ი: 'i',
        კ: 'k',
        ლ: 'l',
        მ: 'm',
        ნ: 'n',
        ო: 'o',
        პ: 'p',
        ჟ: 'j',
        რ: 'r',
        ს: 's',
        ტ: 't',
        უ: 'u',
        ფ: 'f',
        ქ: 'q',
        ღ: 'g',
        ყ: 'k',
        შ: 'sh',
        ჩ: 'ch',
        ც: 'c',
        ძ: 'dz',
        წ: 'ts',
        ჭ: 'ch',
        ხ: 'kh',
        ჯ: 'j',
        ჰ: 'h',
    };
    return words[word];
}
module.exports.isGeorgianWord = function (word) {
    return this.RomanizationUtil(word[0]);
}
module.exports.convertToUpperCase = function (word) {
    return word.toUpperCase();
}
module.exports.translateSymbols = function (word, upper = true) {
    if (!this.isGeorgianWord(word)) return word;
    let finalWord = '';
    for (const symbol of word) {
        if (this.RomanizationUtil(symbol)) {
            finalWord += this.RomanizationUtil[symbol];
        } else {
            finalWord += symbol;
        }
    }
    if (upper) {
        finalWord = this.convertToUpperCase(finalWord);
    }
    return finalWord;
}
