# Sprint 5 Practice Problems

## Usage

1. Clone the starter repo from the green button below.
2. Rename the folder to `firstname-lastname-sprint-5-practice-problems-1`. For
   example, if your name is "Jane Doe", then name your folder
   `firstname-lastname-sprint-5-practice-problems-1`
3. `cd` into the folder and `npm install` to install dependencies
4. `mocha` to run all specs
5. Your objective is to implement the functions in `/problems` to pass all specs

# Unit Testing Problem

Here is a problem that will test your understanding of data structures and
time complexity. In particular, you will need to identify instances of `O(n)`
operations and optimize them to be `O(1)`.

## Number sorter

You are given a class called `NumSorter` which stores an ordered list of
numbers, and a collection of allowed numbers. You can add allowed numbers to
the list, and retrieve them in the order they were added. You cannot add a
number to the list that is not allowed.

* `addAllowedNum(num)` adds a number to the "allowed" list
* `buildNumList(n)` takes in a number, `n` and adds all allowed numbers from 0-n to the list in order.
* `addNumToBack(num)` adds a number to the back of the number list
* `getFirstNum()` removes and returns the first number in the number list
* `isNumAllowed(num)` returns true if the number is in the allowed list
* `numCount()` returns the amount of numbers in the number list

## Directions

* Install packages using `npm install`
* Run tests using `npm test`

Your task is to optimize the code until all 10 timing tests are passing. The
performance is normalized with a speed benchmark so the tests should run
similarly regardless of the speed of your computer.

You must optimize without changing the logic of the `NumSorter`. If you see a
`Incorrect num logic` message when your spec fails, it means you have broken
the the logic. You must fix this before performance tests will run.

You are allowed to access any code or classes you have implemented this week
for the assessment.

## Num Sorter Hints

1. Start by understanding the problem and identifying performance bottlenecks.
2. Use big-O analysis: Which operations can be optimized?
3. Consider all the tools (data structures) you have learned this week and
   pick the right tool for the job.  An optimal solution for this problem will
   use 1 set, 1 linked list, and 0 arrays.
   - Important Note: You **must** use the `LinkedList` class provided for you in
     the starter code

Fill out the code in the `./problems/02-num-sorter.js` file.

There are two test sets of specs for this problem, implementation and timing
specs.

You can test the implementation of your code with the implementation specs
using the following command:

```bash
npm test test/num-sorter-implementation-spec.js
```

You can test the optimization of your code with the timing specs using the
following command:

```bash
npm test test/num-sorter-timing-spec.js
```

An important note for the timing specs:

There is a time buffer built into the timing specs to account for processor
speeds. Your actual grade will be scored on a processor that is different from
yours, so the amount of test specs you actually fail/pass may be different from
what you see in your local machine when you run the timing specs. Make sure you
read the instructions carefully to check that you achieved what the problem is
asking you to do.


[week-5-practice-problems]: https://github.com/appacademy/assessment-for-week-05-v2-practice-a-unit-test-practice-problems
[fromCharCode-mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode