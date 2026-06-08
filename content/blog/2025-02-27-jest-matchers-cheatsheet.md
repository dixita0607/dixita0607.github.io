---
title: "Jest Matchers Cheat sheet"
layout: blog
publishDate: 2025-02-27
tags:
  - web
keywords: 
  - web
  - jest
  - testing
author: "contact@dixita.dev (Dixita Ganatra)"
---

A quick reference for commonly used jest matchers. A full list can be found on their [docs page](https://jestjs.io/docs/expect#matchers)

## toBe

- For exact match (Not for different objects or arrays)
- Uses [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) for equality check

## toEqual

- For exact match of arrays and objects
- Recursively checks every field of an object or array.
- Ignores `undefined` or empty values

## toStrictEqual

- For additionally checking the equality of data types as well
- For example, checking the difference between instance of `User class` and an user object literal having same props as the instance.
- `.toEqual` will pass it as same objects but nto `.toStrictEqual`

> **_NOTE:_** _A great [article](https://ultimatecourses.com/blog/jest-toequal-tostrictequal-difference) explaining detailed difference between `toEqual` and `toStrictEqual`_

## not

- Opposite of matcher
- To test something like `.not.toBe()`

## Truthiness

- **`toBeNull`** matches only `null`
- **`toBeUndefined`** matches only `undefined`
- **`toBeDefined`** is the opposite of `toBeUndefined`
- **`toBeTruthy`** matches anything that an if statement treats as `true`
- **`toBeFalsy`** matches anything that an if statement treats as `false`

## Numbers

- **`toBeGreaterThan`**
- **`toBeGreaterThanOrEqual`**
- **`toBeLessThan`**
- **`toBeLessThanOrEqual`**
- **`toBe`** and **`toEqual`** are equivalent for numbers
- **`toBeCloseTo`** for floating points. Can be used to avoid small rounding errors while testing.

## Strings

- **`toMatch`** for checking strings against regular expressions.

## Arrays and iterables

- **`toContain`** to check if an item exist in an array or iterable (_Example a Set_)

## Exceptions

- **`toThrow`** to test thrown errors by functions
- It accepts an `Error`, `string` or `regular expression` to compare the thrown Error or message.

> **_TIP:_** _For more Jest matchers, check out [jest-extended](https://github.com/jest-community/jest-extended)_
