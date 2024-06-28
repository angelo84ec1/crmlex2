
export default function ToUpperCase({ myString }) {
    let firstLetterUpperCase = myString.charAt(0).toUpperCase() + myString.slice(1);
    return firstLetterUpperCase

}
