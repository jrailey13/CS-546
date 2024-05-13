/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

// Tests for mergeCommonElements
import {findTriangles, mergeCommonElements, stringMetrics} from "./arrayUtils.js";
import {emojiCounter, mashUp, sortStockPrices} from "./stringUtils.js";
import {combineObjects, evaluatePokerHand, solvePuzzles} from "./objUtils.js";

try {
    // Should pass
    const mergeOne = mergeCommonElements(["foo", 2, 8, "no", "  "], [["  "], 0, 9, ["foo", 2]], [["hi", 7, "  ", "foo"], 2]);
    console.log("mergeCommonElements passed successfully");
} catch (e) {
    console.log("mergeCommonElements failed test case");
}
try {
    // Should fail
    const mergeTwo = mergeCommonElements([["foo", 2, 8, "no", "  "], [["  ", true], 0, 9, ["foo", 2]], [["hi", 7, "  ", "foo"], 2]]);
    console.log("mergeCommonElements did not error");
} catch (e) {
    console.log(e)
}

// Tests for findTriangles
try {
    // Should pass
    const findTri1 = findTriangles([[8, 9, 10], [5,5,8], [7,7,7]])
    console.log("findTriangles passed successfully");
} catch (e) {
    console.log("findTriangles failed test case");
}
try {
    // Should fail
    const findTri2 = findTriangles([[8,8,8], [8, NaN, 10], [2,4,5]]);
    console.log("findTriangles did not error");
} catch (e) {
    console.log(e)
}

// Tests for stringMetrics
try {
    // Should pass
    const metrics1 = stringMetrics(["hello   ", "howareyou", "IGOTOSTEVENS", "GoOdFoRyOu"])
    console.log("stringMetrics passed successfully");
} catch (e) {
    console.log("stringMetrics failed test case");
}
try {
    // Should fail
    const metrics2 = stringMetrics(["hi", "      ", "yer", "what", "is", "your", "name"]);
    console.log("stringMetrics did not error");
} catch (e) {
    console.log(e)
}

// Tests for emojiCounter
try {
    // Should pass
    const counter1 = emojiCounter(":this:should::::::work::go:to:bed:")
    console.log("emojiCounter passed successfully");
} catch (e) {
    console.log("emojiCounter failed test case");
}
try {
    // Should fail
    const counter2 = emojiCounter("          ");
    console.log("emojiCounter did not error");
} catch (e) {
    console.log(e)
}

// Tests for sortStockPrices
try {
    // Should pass
    let lastStocks = "F,190.33|AMC,1250.21|MSFT,149.27";
    let currStocks = "MSFT,150.75|F,15.60|AMC,1330.76";
    const stocks1 = sortStockPrices(lastStocks, currStocks)
    console.log("sortStockPrices passed successfully");
} catch (e) {
    console.log("sortStockPrices failed test case");
}
try {
    // Should fail
    let lastStocks1 = `mft,175.0|f,135.40|amc,140.00`;
    let currStocks1 = `AMC,136.75|MSFT,135.60|F,180.12`;
    const stocks2 = sortStockPrices(lastStocks1, currStocks1);
    console.log("sortStockPrices did not error");
} catch (e) {
    console.log(e)
}

// Tests for mashUp
try {
    // Should pass
    const mash1 = mashUp("Jameson", "Railey")
    console.log("mashUp passed successfully");
} catch (e) {
    console.log("mashUp failed test case");
}
try {
    // Should fail
    const mash2 = mashUp("Jameson", "Rai");
    console.log("mashUp did not error");
} catch (e) {
    console.log(e)
}

// Tests for solvePuzzles
try {
    // Should pass
    let puzzles = [{a: 1, e:5}, {b:2, d:4}, {a:1}];
    let pieces = {a: 10, b:11, c:12, d:13, e:14};
    const puzzle1 = solvePuzzles(puzzles, pieces);
    console.log("solvePuzzles passed successfully");
} catch (e) {
    console.log(e);
}
try {
    // Should fail
    let puzzles = [{a: 1, e:5}, {b:2, d:4}, {a:1}];
    let pieces = {a: 10, b:11, d:13, e:14};
    const puzzle2 = solvePuzzles(puzzles, pieces);
    console.log("solvePuzzles did not error");
} catch (e) {
    console.log(e)
}

// Tests for evaluatePokerHand
try {
    // Should pass
    let hand = [{suit: 'hearts', value: '5'}, {suit: 'hearts', value: '4'}];
    let communityCards = [
        {suit: 'spades', value: '4'},
        {suit: 'diamonds', value: '4'},
        {suit: 'hearts', value: '3'},
        {suit: 'hearts', value: '2'},
        {suit: 'hearts', value: 'A'}
    ];
    const poker1 = evaluatePokerHand(hand, communityCards);
    console.log("evaluatePokerHand passed successfully");
} catch (e) {
    console.log("evaluatePokerHand failed test case");
}
try {
    // Should fail
    let hand2 = [{suit: 'heart', value: 'A'}, {suit: 'clubs', value: '9'}];
    let communityCards2 = [
        {suit: 'diamonds', value: '2'},
        {suit: 'spades', value: '5'},
        {suit: 'hearts', value: '6'},
        {suit: 'clubs', value: '7'},
        {suit: 'diamonds', value: '8'}
    ];
    const poker2 = evaluatePokerHand(hand2, communityCards2);
    console.log("evaluatePokerHand did not error");
} catch (e) {
    console.log(e)
}

// Tests for combineObjects
try {
    // Should pass
    const combo1 = combineObjects([{ a: "2", b: 7, c: 5 , d:7},{ b: 90, e: 13, a:"score" },{ e: 15, d: 2, a:"hi"}]);
    console.log("combineObjects passed successfully");
} catch (e) {
    console.log("combineObjects failed test case");
}
try {
    // Should fail
    const combo2 = combineObjects({"a": 1}, {"b": 2}, {});
    console.log("combineObjects did not error");
} catch (e) {
    console.log(e)
}
