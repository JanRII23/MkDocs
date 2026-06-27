# Python :snake:

> For developers with experience in another language who are new to Python.  
> Concise reference — each topic: explanation + code snippet + gotcha.

---

## 1. Getting Started

### Interpreter & Execution

```bash
python script.py              # run a script
python -c "print('hello')"    # run inline code
python -i script.py           # run then drop into REPL
python -m venv .venv          # create virtual environment
```

### The REPL

```python
>>> 1 + 2
3
>>> help(print)               # built-in help
>>> dir(list)                 # list all methods of a type
```

### Indentation Matters

```python
# Blocks are defined by indentation (4 spaces by convention)
if True:
    print("inside")           # indented = inside block
print("outside")
```

> **Gotcha**: Mixing tabs and spaces is a syntax error. Use 4 spaces consistently. Most editors auto-convert tabs to spaces.

---

## 2. Variables & Data Types

### Dynamic Typing

```python
x = 42          # int
x = "hello"     # now str — no error
x = 3.14        # now float
```

### Built-in Types

```python
int          # 42, -1, 10_000 (underscores for readability)
float        # 3.14, 1e5, float('inf'), float('nan')
str          # "hello", 'hello', """multi line"""
bool         # True, False
NoneType     # None (null equivalent)
bytes        # b"hello"
complex      # 1 + 2j
```

### Type Checking

```python
type(42)          # <class 'int'>
isinstance(42, int)   # True
```

### Variable Naming

```python
snake_case = "convention"       # variables, functions, methods
MY_CONSTANT = 42                # constants (not enforced)
CamelCase = "classes"           # class names
```

> **Gotcha**: `None`, `True`, `False` are keywords with capital first letter.

---

## 3. Output & Input

### print()

```python
print("hello")                  # hello
print("a", "b", "c")            # a b c (space separator)
print("a", "b", sep=",")        # a,b
print("loading", end="...")     # no newline
```

### f-strings (Python 3.6+)

```python
name = "Alice"
age = 30
print(f"{name} is {age} years old")   # Alice is 30 years old
print(f"{age:04d}")                    # 0030 (zero-padded)
print(f"{3.14159:.2f}")               # 3.14
print(f"{'hello':>10}")               # "     hello" (right-aligned)
```

### input()

```python
name = input("Enter name: ")     # always returns a string
age = int(input("Age: "))        # convert manually
```

> **Gotcha**: `input()` in Python 2 was `raw_input()` in Python 3. Python 2 is end-of-life. Always use `input()` in modern Python.

---

## 4. Operators

### Arithmetic

```python
+  -  *  /       # standard
//               # floor division: 7 // 2 = 3
%                # modulo: 7 % 2 = 1
**               # exponent: 2 ** 10 = 1024
```

### Comparison

```python
==  !=  <  >  <=  >=
# Chainable:
1 < 5 < 10       # True — equivalent to 1 < 5 and 5 < 10
```

### Logical

```python
and   or   not          # short-circuit operators (not && || !)
```

### Identity & Membership

```python
is     # identity check (same object): x is None
is not # negative identity
in     # membership: "a" in ["a", "b"]
not in # negative membership
```

### Walrus Operator (Python 3.8+)

```python
if (n := len(data)) > 10:      # assign and use in expression
    print(f"got {n} items")
```

> **Gotcha**: `==` checks **value equality** for most types. `is` checks **identity** (same object). Use `is None`, not `== None`.

---

## 5. Control Flow

### if / elif / else

```python
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
else:
    grade = 'F'
```

### match / case (Python 3.10+)

```python
match command.split():
    case ["quit"]:
        sys.exit(0)
    case ["hello", name]:
        print(f"Hi {name}")
    case _:
        print("Unknown")
```

### for Loops

```python
for i in range(10):              # 0..9
for i in range(2, 10, 3):        # 2, 5, 8
for idx, val in enumerate(list): # with index
for k, v in dict.items():        # key-value pairs
```

### while Loops

```python
while condition:
    ...
else:                            # runs if no break occurred
    print("loop completed")
```

### break / continue / pass

```python
break      # exit loop
continue   # skip to next iteration
pass       # no-op placeholder
```

> **Gotcha**: Python has no `switch` statement (use `match` in 3.10+ or `if/elif` chains). No `do-while` either.

---

## 6. Strings

### Immutability

```python
s = "hello"
s.upper()          # returns "HELLO", s is still "hello"
s = s.upper()      # rebind to change
```

### Slicing

```python
s = "hello world"
s[0]               # 'h'
s[-1]              # 'd'
s[1:4]             # 'ell'  [start:end] exclusive
s[:5]              # 'hello'
s[6:]              # 'world'
s[::2]             # 'hlowrd'  [start:end:step]
s[::-1]            # 'dlrow olleh' — reverse
```

### Common Methods

```python
"hello".upper()                # "HELLO"
"HELLO".lower()                # "hello"
"hello world".title()          # "Hello World"
"  hi  ".strip()               # "hi" — also lstrip(), rstrip()
"a,b,c".split(",")             # ["a", "b", "c"]
", ".join(["a", "b", "c"])     # "a, b, c"
"hello".replace("l", "x")      # "hexxo"
"hello".find("l")              # 2 (index or -1)
"hello".count("l")             # 2
"hello".startswith("he")       # True
```

### f-strings & .format()

```python
f"{name} is {age}"              # modern, preferred
"{} is {}".format(name, age)    # older style
"{n} is {a}".format(n=name, a=age)  # named
"%s is %d" % (name, age)        # printf-style (legacy)
```

> **Gotcha**: Strings are immutable — every operation returns a new string. Repeated `+=` in a loop is `O(n²)`; use a list + `''.join()` instead.

---

## 7. Lists

### Creation & Indexing

```python
nums = [1, 2, 3, 4, 5]
nums[0]              # 1
nums[-1]             # 5
nums[1:3]            # [2, 3] (slice — returns new list)
```

### Methods

```python
nums.append(6)       # [1, 2, 3, 4, 5, 6]
nums.extend([7, 8])  # [1, 2, 3, 4, 5, 6, 7, 8]
nums.insert(0, 0)    # [0, 1, 2, 3, ...]
nums.remove(3)       # remove first occurrence of 3
nums.pop()           # remove and return last
nums.pop(0)          # remove and return at index
nums.sort()          # in-place sort
nums.reverse()       # in-place reverse
len(nums)            # length
3 in nums            # True (membership)
```

### List Comprehensions

```python
squares = [x**2 for x in range(10)]           # [0, 1, 4, 9, ...]
evens   = [x for x in range(10) if x % 2 == 0] # [0, 2, 4, 6, 8]
pairs   = [(a, b) for a in [1,2] for b in [3,4]]  # nested
```

### Copying

```python
copied = list.copy()       # shallow copy
copied = original[:]       # also shallow copy
import copy
deep = copy.deepcopy(original)  # deep copy
```

> **Gotcha**: `list.reverse()` and `list.sort()` operate **in-place** and return `None`. Don't write `sorted_list = my_list.sort()`.

---

## 8. Tuples & Sets

### Tuples (immutable)

```python
t = (1, 2, 3)
t = 1, 2, 3              # parentheses optional
t[0]                     # 1
a, b, c = t              # unpacking
single = (1,)            # trailing comma required for single element
```

### Sets (unordered, unique)

```python
s = {1, 2, 3, 1}         # {1, 2, 3} — duplicates removed
s.add(4)
s.remove(2)              # KeyError if missing
s.discard(99)            # no error if missing

# Operations
a | b    # union
a & b    # intersection
a - b    # difference
a ^ b    # symmetric difference
a <= b   # subset
a >= b   # superset
```

### frozenset

```python
fs = frozenset([1, 2, 3])    # immutable set — hashable, usable as dict key
```

> **Gotcha**: `{1, 2, 3}` is a set. `{}` is an empty **dict**, not an empty set. Use `set()` for empty set.

---

## 9. Dictionaries

### Creation & Access

```python
d = {"name": "Alice", "age": 30}
d["name"]            # "Alice" — KeyError if missing
d.get("name")        # "Alice"
d.get("missing", "default")  # "default"
d.setdefault("key", [])      # set if missing, return value
```

### Methods

```python
d.keys()             # view of keys
d.values()           # view of values
d.items()            # view of (key, value) pairs
d.update({"b": 2})   # merge
d.pop("age")         # remove and return
d.popitem()          # remove and return last inserted (3.7+)
del d["name"]        # delete key
```

### Dict Comprehensions

```python
squares = {x: x**2 for x in range(5)}     # {0: 0, 1: 1, 2: 4, ...}
```

### Merging (Python 3.9+)

```python
merged = d1 | d2          # union operator
d1 |= d2                  # in-place update
```

### Ordered by Insertion (Python 3.7+)

```python
# Starting in 3.7, dicts preserve insertion order. In 3.6 it was CPython implementation detail.
```

> **Gotcha**: Iterating over a dict yields keys by default. Use `.items()` for key-value pairs, `.values()` for values.

---

## 10. Functions

### Defining & Calling

```python
def greet(name):
    """Say hello to someone."""      # docstring
    return f"Hello, {name}!"
```

### Parameters

```python
def func(a, b, c="default"):         # positional + default
    pass

def func(*args, **kwargs):           # *args = tuple, **kwargs = dict
    print(args, kwargs)

func(1, 2, 3)
func(1, 2, c=10)                     # keyword argument
func(1, 2, 3, x=4, y=5)             # *args=(1,2,3), **kwargs={'x':4,'y':5}
```

### Keyword-Only & Positional-Only (Python 3.8+)

```python
def func(a, b, *, c):                # c is keyword-only
    pass

def func(a, b, /, c):                # a, b are positional-only
    pass
```

### Lambda

```python
square = lambda x: x**2
sorted(pairs, key=lambda p: p[1])   # inline function
```

### Type Hints (Python 3.5+)

```python
def greet(name: str, age: int = 0) -> str:
    return f"{name} is {age}"

# Not enforced at runtime — used by type checkers (mypy, pyright)
```

> **Gotcha**: Default arguments are evaluated **once** at definition time, not each call:
> ```python
> def append(item, lst=[]):    # BUG: same list every call
>     lst.append(item)
>     return lst
> # Fix:
> def append(item, lst=None):
>     if lst is None: lst = []
> ```

---

## 11. Classes & OOP

### Basic Class

```python
class Person:
    species = "Homo sapiens"          # class attribute

    def __init__(self, name: str, age: int):
        self.name = name              # instance attribute
        self.age = age

    def greet(self) -> str:           # instance method — first param is self
        return f"Hi, I'm {self.name}"

    @classmethod
    def create_anonymous(cls):        # class method — receives class, not instance
        return cls("Anonymous", 0)

    @staticmethod
    def is_adult(age):                # static method — no self or cls
        return age >= 18
```

### Usage

```python
p = Person("Alice", 30)
p.greet()                 # "Hi, I'm Alice"
Person.species            # "Homo sapiens"
p.species                 # also accessible on instance
```

### Properties

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def fahrenheit(self):               # getter
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):        # setter
        self._celsius = (value - 32) * 5/9

t = Temperature(0)
t.fahrenheit              # 32.0 — accessed like an attribute
t.fahrenheit = 212        # setter triggered
```

### Dunder (Magic) Methods

```python
class Pair:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):                  # debug representation
        return f"Pair({self.x}, {self.y})"

    def __str__(self):                   # user-friendly string
        return f"({self.x}, {self.y})"

    def __eq__(self, other):             # ==
        return self.x == other.x and self.y == other.y

    def __add__(self, other):            # +
        return Pair(self.x + other.x, self.y + other.y)

    def __len__(self):                   # len()
        return 2
```

> **Gotcha**: `self` is not a keyword — it's a convention. The instance is always passed as the first argument. Always name it `self`.

---

## 12. Inheritance & Polymorphism

### Basic Inheritance

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):                     # override
        return "Woof!"

    def fetch(self):
        return f"{self.name} fetches"
```

### super()

```python
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)           # call parent constructor
        self.breed = breed
```

### Multiple Inheritance & MRO

```python
class A:      def method(self): print("A")
class B(A):   def method(self): print("B")
class C(A):   def method(self): print("C")
class D(B, C): pass

d = D()
d.method()                 # B — follows MRO
print(D.__mro__)           # (D, B, C, A, object)
```

### Duck Typing

```python
# "If it walks like a duck and quacks like a duck, it's a duck."
# No interface required — just implement the method.

def process(obj):
    obj.quack()            # any object with quack() works

class Duck:
    def quack(self): print("quack")

class Robot:
    def quack(self): print("beep quack")

process(Duck())            # works
process(Robot())           # works (same duck-typed interface)
```

### Abstract Base Classes

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):                     # must implement
        return 3.14 * self.r ** 2
```

> **Gotcha**: `super()` in Python isn't just for the parent — it follows the MRO (Method Resolution Order), which matters in diamond inheritance.

---

## 13. Modules & Packages

### Import

```python
import math
from math import sqrt, pi
from math import *                      # discouraged — pollutes namespace
from package.module import ClassName
import module as alias
```

### Module Structure

```python
# mymodule.py
def useful():
    return 42

if __name__ == "__main__":
    # runs only when executed directly, not when imported
    print(useful())
```

### Package Structure

```
mypackage/
    __init__.py          # makes directory a package (can be empty)
    module_a.py
    subpackage/
        __init__.py
        module_b.py
```

### pip & Requirements

```bash
pip install requests                    # install package
pip list                                # list installed
pip freeze > requirements.txt           # snapshot
pip install -r requirements.txt         # install from snapshot
```

> **Gotcha**: The `__init__.py` file can be empty but is required to make a directory a package (Python 3.3+ namespace packages make it optional, but it's still conventional).

---

## 14. Exception Handling

### try / except / else / finally

```python
try:
    result = risky_operation()
except ValueError as e:
    print(f"Bad value: {e}")
except (TypeError, ZeroDivisionError):
    print("Type or division error")
except Exception:                      # catch-all (use sparingly)
    print("Something went wrong")
else:
    print(f"Success: {result}")        # runs only if no exception
finally:
    cleanup()                          # always runs
```

### Custom Exceptions

```python
class InsufficientFundsError(RuntimeError):
    pass

def withdraw(amount):
    if amount > balance:
        raise InsufficientFundsError(f"Need {amount}, have {balance}")
```

### Common Exception Types

| Exception | Cause |
|-----------|-------|
| `ValueError` | Wrong value (e.g., int("abc")) |
| `TypeError` | Wrong type (e.g., 1 + "a") |
| `KeyError` | Missing dict key |
| `IndexError` | List index out of range |
| `AttributeError` | Missing method/attribute |
| `FileNotFoundError` | File doesn't exist |
| `StopIteration` | Iterator exhausted |

### Context Managers with Exceptions

```python
# with statement automatically handles cleanup (even on exceptions)
with open("file.txt") as f:
    data = f.read()
```

> **Gotcha**: Catching `Exception` is broad — it also catches `KeyboardInterrupt` and `SystemExit`. Usually better to catch specific exceptions or use `except Exception:` if you really need a catch-all.

---

## 15. File I/O

### The `with` Statement

```python
with open("file.txt", "r") as f:
    content = f.read()                 # entire file as string

with open("file.txt", "w") as f:       # overwrite mode
    f.write("Hello\n")
    f.writelines(["line1\n", "line2\n"])

with open("file.txt", "a") as f:       # append mode
    f.write("more\n")
```

### Reading Modes

```python
f.read()              # entire file as string
f.read(1024)          # first 1024 bytes
f.readline()          # one line (with \n)
f.readlines()         # list of all lines
list(f)               # iterate lines lazily (memory efficient)
```

### Binary Mode

```python
with open("image.jpg", "rb") as f:
    data = f.read()                    # bytes

with open("out.jpg", "wb") as f:
    f.write(data)
```

### pathlib (Python 3.4+)

```python
from pathlib import Path

p = Path("data/file.txt")
p.read_text()                          # read entire file as string
p.write_text("hello")                  # write string
p.read_bytes()                         # read as bytes
p.exists()                             # True/False
p.is_file(), p.is_dir()
p.name, p.stem, p.suffix              # "file.txt", "file", ".txt"
p.parent                               # Path("data")
p.glob("*.txt")                        # glob pattern iterator
```

> **Gotcha**: Always use `with` for file operations — it guarantees the file is closed even if an exception occurs. Never call `.close()` manually.

---

## 16. Comprehensions & Generators

### List Comprehension

```python
squares = [x**2 for x in range(10)]                # [0, 1, 4, ...]
evens   = [x for x in range(10) if x % 2 == 0]     # [0, 2, 4, ...]
```

### Dict Comprehension

```python
square_map = {x: x**2 for x in range(5)}            # {0: 0, 1: 1, ...}
```

### Set Comprehension

```python
unique_lens = {len(s) for s in ["hi", "hello", "hey"]}  # {2, 3, 5}
```

### Generator Expression

```python
total = sum(x**2 for x in range(1000))             # no list created — lazy
squares = (x**2 for x in range(1000))              # generator object
```

### Generator Function

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(10):
    print(num)
```

### Generator vs List — Memory

```python
# List: creates all elements in memory
squares_list = [x**2 for x in range(10_000_000)]   # ~280 MB

# Generator: yields one at a time
squares_gen  = (x**2 for x in range(10_000_000))   # ~120 bytes
```

> **Gotcha**: Generator expressions and generator functions can only be iterated **once**. They don't store values.

---

## 17. Decorators & Context Managers

### Basic Decorator

```python
def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.perf_counter() - start:.3f}s")
        return result
    return wrapper

@timer
def slow_thing():
    import time; time.sleep(1)

slow_thing()                           # "slow_thing took 1.001s"
```

### Decorator with Arguments

```python
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hi():
    print("hi!")
```

### Context Manager (class-based)

```python
class ManagedFile:
    def __init__(self, filename):
        self.filename = filename

    def __enter__(self):
        self.file = open(self.filename, "w")
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()

with ManagedFile("out.txt") as f:
    f.write("hello")
```

### Context Manager (contextlib)

```python
from contextlib import contextmanager

@contextmanager
def managed_file(filename):
    f = open(filename, "w")
    try:
        yield f                          # value bound to "as" variable
    finally:
        f.close()
```

> **Gotcha**: A decorator replaces the original function with the wrapper. Use `functools.wraps(func)` on the wrapper to preserve the original function's name, docstring, and signature.

---

## 18. Iterators & Iterables

### Iterator Protocol

```python
# An iterable has __iter__() that returns an iterator.
# An iterator has __next__() that returns the next element or raises StopIteration.

class Countdown:
    def __init__(self, start):
        self.n = start

    def __iter__(self):
        return self                    # iterator is itself

    def __next__(self):
        if self.n <= 0:
            raise StopIteration
        self.n -= 1
        return self.n + 1

for i in Countdown(5):
    print(i)                            # 5, 4, 3, 2, 1
```

### For Loop Mechanics

```python
# This:
for x in iterable:
    print(x)

# Is equivalent to:
iterator = iter(iterable)              # calls __iter__
while True:
    try:
        x = next(iterator)             # calls __next__
    except StopIteration:
        break
    print(x)
```

### itertools

```python
import itertools

itertools.chain([1,2], [3,4])          # 1, 2, 3, 4
itertools.islice(gen, 10)             # first 10 from generator
itertools.product([1,2], "AB")        # cartesian product
itertools.groupby(data, key=func)     # group consecutive items
itertools.cycle(["a", "b"])           # infinite cycle
```

> **Gotcha**: Not every iterable is an iterator. Lists, tuples, strings are iterable (have `__iter__`) but not iterators (they don't have `__next__`). Calling `iter()` on them returns a new iterator each time.

---

## 19. Common Standard Library

### os — Operating System

```python
import os
os.getcwd()              # current directory
os.chdir("/path")        # change directory
os.listdir(".")          # list files
os.makedirs("a/b/c", exist_ok=True)  # create dirs
os.remove("file.txt")
os.path.join("dir", "file.txt")     # cross-platform path
os.path.exists("path")
```

### sys — System & Interpreter

```python
import sys
sys.argv                 # command-line arguments (list)
sys.exit(0)              # exit with code
sys.path                 # module search paths
sys.stdout.write("hi")   # raw write (no newline)
sys.version              # Python version string
```

### json

```python
import json

data = {"name": "Alice", "scores": [90, 85]}
json_str = json.dumps(data, indent=2)      # to string
json.dump(data, open("data.json", "w"))    # to file

parsed = json.loads(json_str)              # from string
parsed = json.load(open("data.json"))      # from file
```

### re — Regular Expressions

```python
import re
re.search(r"\d+", "abc123")      # match object or None
re.match(r"\d+", "123abc")       # match at start
re.findall(r"\d+", "a1b2c3")     # ["1", "2", "3"]
re.sub(r"\d+", "X", "a1b2")      # "aXbX"
re.split(r"\s+", "a b   c")     # ["a", "b", "c"]
```

### collections

```python
from collections import defaultdict, Counter, deque, OrderedDict

# defaultdict — auto-default for missing keys
d = defaultdict(list)
d["key"].append(1)               # no KeyError

# Counter — count occurrences
c = Counter("abracadabra")       # Counter({'a': 5, 'b': 2, 'r': 2, ...})

# deque — double-ended queue
dq = deque([1, 2, 3])
dq.appendleft(0)                 # deque([0, 1, 2, 3])
dq.popleft()                     # 0
```

### datetime

```python
from datetime import datetime, date, timedelta

now = datetime.now()
today = date.today()
delta = timedelta(days=7)
future = now + delta
formatted = now.strftime("%Y-%m-%d %H:%M")   # string → formatted
parsed = datetime.strptime("2026-06-27", "%Y-%m-%d")  # string → datetime
```

### math & random

```python
import math
math.sqrt(16), math.floor(3.7), math.ceil(3.2)
math.pi, math.inf, math.nan

import random
random.random()                  # 0.0 to 1.0
random.randint(1, 10)           # inclusive
random.choice(["a", "b", "c"])
random.shuffle(list)
```

> **Gotcha**: `math.isclose(a, b)` is for float comparison. Never use `==` on floats.

---

## 20. Common Gotchas

```python
# ┌─ Gotcha 1: Mutable default arguments ──────────────────────────
def add(item, lst=[]):       # BUG: same list across calls
    lst.append(item)
    return lst

print(add(1))                # [1]
print(add(2))                # [1, 2] — not [2]!

# Fix:
def add(item, lst=None):
    if lst is None: lst = []
    lst.append(item)
    return lst


# ┌─ Gotcha 2: Late binding closures ──────────────────────────────
funcs = [lambda: i for i in range(5)]
print([f() for f in funcs])  # [4, 4, 4, 4, 4] — all see final i

# Fix:
funcs = [lambda i=i: i for i in range(5)]   # capture current value


# ┌─ Gotcha 3: == vs is ────────────────────────────────────────────
a = [1, 2, 3]
b = [1, 2, 3]
a == b                        # True (same value)
a is b                        # False (different objects)

# is is for singletons like None, True, False
if x is None: ...             # correct
if x == None: ...             # works but non-idiomatic


# ┌─ Gotcha 4: Unintended variable sharing in closures ────────────
# Same issue as Gotcha 2. Use default args or functools.partial.


# ┌─ Gotcha 5: Modifying list while iterating ──────────────────────
lst = [1, 2, 3, 4, 5]
for x in lst:
    if x % 2 == 0:
        lst.remove(x)         # skips elements — indices shift

# Fix:
lst = [x for x in lst if x % 2 != 0]   # create new list


# ┌─ Gotcha 6: Mutable class attributes ────────────────────────────
class A:
    items = []                # shared across all instances

a1, a2 = A(), A()
a1.items.append(1)
print(a2.items)               # [1] — shared!

# Fix: use instance attributes in __init__


# ┌─ Gotcha 7: float equality ──────────────────────────────────────
0.1 + 0.2 == 0.3              # False!
# Fix:
import math
math.isclose(0.1 + 0.2, 0.3)  # True


# ┌─ Gotcha 8: Integer caching ─────────────────────────────────────
a, b = 256, 256
a is b                        # True (small ints cached)

c, d = 257, 257
c is d                        # False (not cached, separate objects)
# Use == for value comparison, always.


# ┌─ Gotcha 9: .sort() vs sorted() ─────────────────────────────────
lst.sort()                    # in-place, returns None
sorted(lst)                   # returns new list, lst unchanged

# Don't write: new = my_list.sort()   → new is None


# ┌─ Gotcha 10: Chained assignment ─────────────────────────────────
x = y = [1, 2, 3]             # both point to SAME list
x.append(4)
print(y)                      # [1, 2, 3, 4]
```

---

## 21. Virtual Environments & Packaging

### venv

```bash
python -m venv .venv          # create virtual environment

# Activate (Windows)
.venv\Scripts\activate
# Activate (macOS/Linux)
source .venv/bin/activate

deactivate                    # exit venv
```

### pip

```bash
pip install requests          # install package
pip install requests==2.31.0  # specific version
pip install -U requests       # upgrade
pip uninstall requests        # remove
pip list                      # show installed
pip show requests             # package details
pip freeze                    # formatted for requirements.txt
```

### requirements.txt

```txt
requests==2.31.0
flask>=2.3.0
numpy
```

```bash
pip install -r requirements.txt
```

### Basic `setup.py` (for distributing)

```python
from setuptools import setup, find_packages

setup(
    name="mypackage",
    version="0.1.0",
    packages=find_packages(),
    python_requires=">=3.10",
    install_requires=["requests"],
)
```

### pyproject.toml (modern, PEP 621)

```toml
[build-system]
requires = ["setuptools>=64"]
build-backend = "setuptools.backends._legacy:_Backend"

[project]
name = "mypackage"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = ["requests"]
```

> **Gotcha**: Always use a virtual environment. `pip install` without an active venv installs globally — can break system tools and create version conflicts between projects.

---

> **Pro tip**: Python prioritises readability and developer productivity over raw performance. Write clear, idiomatic code using comprehensions, context managers, and the standard library. Profile before optimising.
