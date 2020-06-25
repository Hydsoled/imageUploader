function RomanizationUtil(word) {
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
function isGeorgianWord(word) {
    return this.RomanizationUtil(word[0]);
}
function convertToUpperCase(word) {
    return word.toUpperCase();
}
function translateSymbols(word, upper = true) {
    if (!this.isGeorgianWord(word)) return word;
    let finalWord = '';
    for (const symbol of word) {
        if (this.RomanizationUtil(symbol)) {
            finalWord += this.RomanizationUtil(symbol);
        } else {
            finalWord += symbol;
        }
    }
    if (upper) {
        finalWord = this.convertToUpperCase(finalWord);
    }
    return finalWord;
}
