# Rust :wrench:

> For developers with experience in another language who are new to Rust.  
> Concise reference — each topic: explanation + code snippet + gotcha.

---

## 1. Getting Started

### Installation & Toolchain

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh   # Linux/macOS
# Windows: https://rustup.rs — download and run rustup-init.exe

rustup update                    # update toolchain
rustup self uninstall            # remove

rustc --version                  # compiler version
cargo --version                  # package manager version
```

### Cargo — Project & Build

```bash
cargo new my_project             # create new binary crate
cargo new my_lib --lib           # create library crate
cd my_project

cargo build                      # compile (debug)
cargo build --release            # compile (optimised)
cargo run                        # build + run
cargo check                      # fast compile check (no binary)
cargo test                       # run tests
cargo doc --open                 # build and open docs
```

### Project Structure

```
my_project/
├── Cargo.toml                   # manifest (dependencies, metadata)
├── Cargo.lock                   # locked dependency versions (commit this)
└── src/
    └── main.rs                  # entry point (bin) or lib.rs (lib)
```

### Hello World

```rust
fn main() {
    println!("Hello, Rust!");
}
```

> **Gotcha**: `println!` is a **macro**, not a function. The `!` suffix means it expands at compile time. Many things in Rust use macros (`println!`, `format!`, `vec!`, `panic!`).

---

## 2. Variables & Mutability

### Immutable by Default

```rust
let x = 5;            // immutable — cannot reassign
// x = 6;             // compile error!

let mut y = 5;        // mutable
y = 6;                // OK
```

### Constants

```rust
const MAX_SPEED: u32 = 120;     // always immutable, type required
const PI: f64 = 3.14159;        // compile-time constant
```

### Shadowing

```rust
let name = "hello";
let name = name.len();           // shadows previous binding, different type
// name is now usize (length), not &str
```

### Basic Types

```rust
// Signed integers
let i: i8 = -128;    // i8, i16, i32 (default), i64, i128

// Unsigned integers
let u: u8 = 255;     // u8, u16, u32, u64, u128, usize (arch-dependent)

// Floats
let f: f64 = 3.14;   // f32, f64 (default)

// Bool
let b: bool = true;   // true / false

// Char (Unicode, 4 bytes)
let c: char = '🦀';

// Byte literal
let byte: u8 = b'A';  // 65
```

### Type Inference & Annotations

```rust
let x = 42;                       // i32 (default)
let y: u64 = 42;                  // explicit
let z = 3.14;                     // f64 (default)
let s: String = String::from("hi");
```

> **Gotcha**: `let x = 5;` is immutable. To change the value, use `let mut x = 5;` or shadow with `let x = 6;`. Shadowing creates a **new** binding — it doesn't mutate.

---

## 3. Compound Types

### Tuple

```rust
let t: (i32, f64, char) = (42, 3.14, 'R');
let first = t.0;                   // 42 — index access
let (a, b, c) = t;                 // destructuring
```

### Array (fixed size, stack)

```rust
let arr: [i32; 5] = [1, 2, 3, 4, 5];
let first = arr[0];                // 1
let zeros = [0; 10];               // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let len = arr.len();
```

### Vector (heap-allocated, growable)

```rust
let mut v = Vec::new();
v.push(1);
v.push(2);
v.push(3);

let v2 = vec![1, 2, 3];            // vec! macro

let third = &v2[2];                // 3 (panics if out of bounds)
let third = v2.get(2);             // Some(&3) (safe — returns Option)
```

> **Gotcha**: Array index out of bounds panics at runtime for `arr[i]` syntax. Use `v.get(i)` for a safe `Option`-based lookup.

---

## 4. Functions

### Definition

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y                          // expression — no semicolon = return value
}

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)    // return with expression
}

fn print_hello() {                 // no return — unit type ()
    println!("hello");
}
```

### Expressions vs Statements

```rust
fn main() {
    let x = 5;                          // statement (ends with ;)

    let y = {
        let a = 3;
        a + 2                           // expression — no ;
    };                                   // y = 5

    // Early return
    if x > 10 { return; }

    let result = if x > 3 { "big" } else { "small" };  // if is an expression
}
```

### Generics in Functions

```rust
fn first<T>(list: &[T]) -> &T {
    &list[0]
}
```

> **Gotcha**: The last expression in a function (without `;`) is the return value. Adding a `;` turns it into a statement, which returns `()`.

---

## 5. Ownership

### Three Rules

1. Each value has exactly one **owner**.
2. Only one owner at a time.
3. When the owner goes out of scope, the value is **dropped**.

### Move

```rust
let s1 = String::from("hello");
let s2 = s1;                        // s1 is MOVED to s2
// println!("{}", s1);              // compile error — value moved

// s2 owns the string now; s1 is invalid
```

### Clone (deep copy)

```rust
let s1 = String::from("hello");
let s2 = s1.clone();               // deep copy — both valid
println!("{} {}", s1, s2);         // OK
```

### Copy (stack-only types)

```rust
let x = 42;
let y = x;                         // COPY — x is still valid
println!("{} {}", x, y);           // OK

// Types that are Copy: integers, floats, bool, char, tuples of Copy types
```

### Ownership in Functions

```rust
fn take_ownership(s: String) {      // s takes ownership
    println!("{}", s);
}                                   // s is dropped here

fn give_ownership() -> String {
    String::from("hello")           // ownership transferred to caller
}

let s = String::from("world");
take_ownership(s);                  // s moved — cannot use s after
```

> **Gotcha**: Ownership is Rust's most unique concept. `String` types are **moved** by default. Stack-only types (`i32`, `bool`, etc.) implement `Copy` and are copied instead. Keep asking: *"Who owns this data?"*

---

## 6. References & Borrowing

### Immutable Reference

```rust
fn calculate_len(s: &String) -> usize {   // borrows, does not own
    s.len()
}                                          // s is NOT dropped (no ownership)

let s = String::from("hello");
let len = calculate_len(&s);               // &s creates a reference
println!("{} {}", s, len);                 // s still usable
```

### Mutable Reference

```rust
fn change(s: &mut String) {
    s.push_str(" world");
}

let mut s = String::from("hello");
change(&mut s);
println!("{}", s);                          // "hello world"
```

### Borrowing Rules

- At any time, you can have **either**:
  - One mutable reference, **or**
  - Any number of immutable references
- References must always be **valid** (no dangling pointers)

```rust
let mut s = String::from("hello");

let r1 = &s;       // OK — multiple immutable refs allowed
let r2 = &s;       // OK
// let r3 = &mut s; // COMPILE ERROR — can't have mutable ref with immutable ones
println!("{} {}", r1, r2);   // r1 and r2 go out of scope here

let r3 = &mut s;   // OK — no immutable refs in scope
```

> **Gotcha**: The borrow checker enforces these rules at compile time. There's no runtime overhead. A common beginner fight: trying to mutate while iterating — the iterator holds an immutable borrow.

---

## 7. Slices

### String Slices

```rust
let s = String::from("hello world");

let hello = &s[0..5];            // "hello"
let world = &s[6..11];           // "world"
let whole = &s[..];              // "hello world"
let first5 = &s[..5];            // "hello"  — same as [0..5]
let from6 = &s[6..];             // "world"
```

### &str — String Literals (are slices)

```rust
let s: &str = "hello";           // string literal — always &str
```

### Array Slices

```rust
let arr = [1, 2, 3, 4, 5];
let slice = &arr[1..4];          // &[i32] — [2, 3, 4]
```

### Function Parameter Idiom

```rust
// Prefer &str over &String — it's more general
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

greet("world");                  // pass &str directly
greet(&String::from("world"));   // pass &String (coerced to &str)
```

> **Gotcha**: `&str` and `String` are different types. `&str` is a **borrow** of a string (view). `String` is an **owned** heap-allocated string. Use `&str` for function parameters when you just need to read.

---

## 8. Control Flow

### if / else

```rust
let score = 85;
let grade = if score >= 90 {
    'A'
} else if score >= 80 {
    'B'
} else {
    'F'
};                                // if is an expression — needs ;
```

### loop (infinite)

```rust
loop {
    println!("forever");
    break;                         // exit loop
}

let counter = loop {
    break 42;                      // break with value
};
// counter == 42
```

### while

```rust
let mut n = 3;
while n > 0 {
    println!("{}", n);
    n -= 1;
}
```

### for (range / iterator)

```rust
for i in 0..5 {                   // range [0, 5) — 0, 1, 2, 3, 4
    println!("{}", i);
}

for i in 0..=5 {                  // inclusive: 0, 1, 2, 3, 4, 5
    println!("{}", i);
}

let arr = [10, 20, 30];
for item in arr.iter() {
    println!("{}", item);
}
```

### Loop Labels

```rust
'outer: for i in 0..3 {
    for j in 0..3 {
        if i == 1 {
            break 'outer;          // breaks outer loop
        }
    }
}
```

> **Gotcha**: `if` in Rust is an **expression**, not a statement. Both arms must return the same type. No ternary operator — use `if/else` directly.

---

## 9. Pattern Matching

### match

```rust
let value = 3;
match value {
    1 => println!("one"),
    2 | 3 => println!("two or three"),    // multiple patterns
    4..=10 => println!("four through ten"), // range
    _ => println!("something else"),       // catch-all (wildcard)
}

// match as expression
let name = match value {
    1 => "one",
    2 => "two",
    _ => "other",
};
```

### Destructuring

```rust
let pair = (1, "hello");
let (x, y) = pair;                         // destructure tuple

struct Point { x: i32, y: i32 }
let p = Point { x: 0, y: 0 };
let Point { x: a, y: b } = p;             // destructure struct
let Point { x, y } = p;                   // shorthand
```

### if let

```rust
let maybe = Some(42);
if let Some(value) = maybe {
    println!("got {}", value);             // runs only if pattern matches
}

// For single-arm matching — more concise than match
```

### while let

```rust
let mut stack = vec![1, 2, 3];
while let Some(top) = stack.pop() {
    println!("{}", top);                   // 3, 2, 1
}
```

> **Gotcha**: `match` must be **exhaustive** — every possible case covered. Use `_` as catch-all. `if let` is for when you only care about one variant.

---

## 10. Structs

### Definition & Usage

```rust
struct Person {
    name: String,
    age: u8,
    active: bool,
}

let mut alice = Person {
    name: String::from("Alice"),
    age: 30,
    active: true,
};

alice.age = 31;                            // field access (requires mut)
```

### Field Init Shorthand

```rust
fn build_person(name: String, age: u8) -> Person {
    Person {
        name,                              // shorthand for name: name
        age,
        active: true,
    }
}
```

### Tuple Struct

```rust
struct Color(i32, i32, i32);
let red = Color(255, 0, 0);
```

### Unit Struct

```rust
struct Unit;                               // no fields — marker type
```

### Methods with `impl`

```rust
impl Person {
    fn new(name: &str, age: u8) -> Self {   // associated function (no &self)
        Person {
            name: String::from(name),
            age,
            active: true,
        }
    }

    fn greet(&self) -> String {             // method (borrows self)
        format!("Hi, I'm {}", self.name)
    }

    fn birthday(&mut self) {                // method (mutates self)
        self.age += 1;
    }

    fn consume(self) {                      // method (takes ownership)
        println!("{} is gone", self.name);
    }
}

let p = Person::new("Bob", 25);            // :: for associated functions
p.greet();                                 // . for methods
```

> **Gotcha**: The first parameter of a method determines ownership: `&self` (borrow), `&mut self` (mutable borrow), `self` (take ownership). No `this` keyword — use `self` explicitly.

---

## 11. Enums & Option / Result

### Enum

```rust
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },           // struct variant
    Write(String),                       // tuple variant
    ChangeColor(u8, u8, u8),
}

let msg = Message::Move { x: 10, y: 20 };
```

### Option<T> (no null)

```rust
enum Option<T> {
    Some(T),
    None,
}

let some = Some(42);
let none: Option<i32> = None;

// Safe unwrapping
match some {
    Some(v) => println!("got {}", v),
    None => println!("nothing"),
}

if let Some(v) = some {
    println!("got {}", v);
}
```

### Result<T, E>

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("division by zero"))
    } else {
        Ok(a / b)
    }
}

match divide(10.0, 0.0) {
    Ok(v) => println!("{}", v),
    Err(e) => println!("error: {}", e),
}
```

### Combinators

```rust
let result = divide(10.0, 2.0)
    .map(|v| v * 2)
    .unwrap_or(0.0);                     // 10.0

let opt = Some(42);
let doubled = opt.map(|v| v * 2);         // Some(84)
let filtered = opt.filter(|v| *v > 50);   // None
```

> **Gotcha**: Rust has **no null**. Instead use `Option<T>` (maybe value) and `Result<T, E>` (fallible operation). The compiler enforces you handle both cases — no null pointer exceptions.

---

## 12. Collections

### Vec<T>

```rust
let mut v = vec![1, 2, 3];
v.push(4);
v.pop();                                 // Some(4) — removes last
v.insert(0, 0);                          // [0, 1, 2, 3]
v.remove(0);                             // removes at index, shifts

for val in &v {                          // borrow each element
    println!("{}", val);
}

for val in &mut v {                      // mutable borrow
    *val *= 2;
}
```

### HashMap<K, V>

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Alice"), 30);
scores.insert(String::from("Bob"), 25);

let alice = scores.get("Alice");            // Option<&i32>
let bob = scores.get("Bob").copied().unwrap_or(0);  // 25

for (name, score) in &scores {
    println!("{}: {}", name, score);
}

scores.entry(String::from("Eve")).or_insert(0);  // insert if missing
```

### HashSet<T>

```rust
use std::collections::HashSet;

let mut set = HashSet::new();
set.insert(1);
set.insert(2);
set.contains(&1);                        // true

let a: HashSet<_> = [1, 2, 3].into_iter().collect();
let b: HashSet<_> = [2, 3, 4].into_iter().collect();
let union: HashSet<_> = a.union(&b).copied().collect();    // {1, 2, 3, 4}
```

> **Gotcha**: `insert` returns `bool` (true if inserted, false if already present). `get` returns `Option<&V>`. HashMaps use `Entry` API for conditional inserts — use `.entry(k).or_insert(v)`.

---

## 13. Error Handling

### panic!

```rust
panic!("something went wrong");           // unrecoverable — unwinds stack
let v = vec![1];
v[99];                                      // panic! — index out of bounds
```

### Result + ?

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_username() -> Result<String, io::Error> {
    let mut file = File::open("user.txt")?;   // ? propagates the error
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents.trim().to_string())
}

fn main() {
    match read_username() {
        Ok(name) => println!("Hello, {}", name),
        Err(e) => eprintln!("Error: {}", e),
    }
}
```

### unwrap / expect

```rust
let value = some_option.unwrap();          // panic if None
let value = some_result.expect("msg");     // panic with custom message if Err
```

### Custom Errors

```rust
use std::fmt;

#[derive(Debug)]
enum MyError {
    NotFound(String),
    PermissionDenied,
}

impl fmt::Display for MyError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            MyError::NotFound(item) => write!(f, "not found: {}", item),
            MyError::PermissionDenied => write!(f, "permission denied"),
        }
    }
}

impl std::error::Error for MyError {}
```

### thiserror & anyhow (common crates)

```rust
use anyhow::{Result, Context};

fn do_thing() -> Result<()> {
    let data = std::fs::read_to_string("file.txt")
        .with_context(|| "failed to read file")?;   // better error context
    Ok(())
}
```

> **Gotcha**: `?` can only be used in functions that return `Result` or `Option`. It expands to early return on `Err`/`None`. `unwrap()` is convenient but will panic — use `expect("context")` for better messages.

---

## 14. Generics & Traits

### Generic Struct

```rust
struct Pair<T> {
    first: T,
    second: T,
}

let int_pair = Pair { first: 1, second: 2 };
let str_pair = Pair { first: "a", second: "b" };
```

### Generic Functions

```rust
fn first<T>(list: &[T]) -> &T {
    &list[0]
}
```

### Trait Definition

```rust
trait Speak {
    fn greet(&self) -> String;
}
```

### Trait Implementation

```rust
struct Person { name: String }

impl Speak for Person {
    fn greet(&self) -> String {
        format!("Hi, I'm {}", self.name)
    }
}
```

### Trait Bounds

```rust
fn print_greeting(item: &impl Speak) {         // impl Trait syntax
    println!("{}", item.greet());
}

fn print_greeting<T: Speak>(item: &T) {        // generic bound syntax
    println!("{}", item.greet());
}

fn multiple_bounds<T: Speak + Clone>(item: &T) // multiple bounds
```

### Derive

```rust
#[derive(Debug, Clone, PartialEq, Eq, Hash)]   // auto-implement traits
struct Point {
    x: i32,
    y: i32,
}

println!("{:?}", Point { x: 3, y: 4 });        // Debug format
```

### Trait Objects

```rust
let items: Vec<Box<dyn Speak>> = vec![
    Box::new(Person { name: "Alice".into() }),
    Box::new(Dog { name: "Rex".into() }),
];
```

> **Gotcha**: `dyn Trait` (trait object) enables dynamic dispatch via vtable. `impl Trait`/generics use static dispatch (monomorphisation) — faster but creates separate compiled code for each type.

---

## 15. Lifetimes

### Why Lifetimes Exist

```rust
// This would create a dangling pointer:
// let r;
// {
//     let x = 5;
//     r = &x;               // error: x does not live long enough
// }
// println!("{}", r);
```

### Lifetime Annotation Syntax

```rust
// &i32        — a reference
// &'a i32     — a reference with explicit lifetime
// &'a mut i32 — a mutable reference with explicit lifetime

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
// Both inputs and the output share lifetime 'a
```

### Lifetime in Structs

```rust
struct Excerpt<'a> {
    part: &'a str,                           // struct holds a reference
}

let novel = String::from("Call me Ishmael.");
let first = novel.split('.').next().expect("no sentence");
let excerpt = Excerpt { part: first };
```

### Lifetime Elision Rules (compiler infers)

```rust
// Rule 1: each input reference gets its own lifetime
// Rule 2: if there's one input lifetime, all outputs get it
// Rule 3: if &self is input, output gets &self's lifetime

// Compiler infers these without annotation:
fn first_word(s: &str) -> &str {           // elided: 'a
    s.split_whitespace().next().unwrap_or("")
}
```

### 'static Lifetime

```rust
let s: &'static str = "hello";            // lives entire program duration
// String literals are &'static str
```

> **Gotcha**: Lifetime annotations describe **relationships** between references, not actual durations. The compiler checks that references don't outlive their data. You'll mostly write lifetimes on function signatures that return references from parameters.

---

## 16. Closures & Iterators

### Closure Syntax

```rust
let add = |a, b| a + b;                    // type-inferred
let add_explicit = |a: i32, b: i32| -> i32 { a + b };

let x = 42;
let print_x = || println!("{}", x);        // captures x by reference
print_x();
```

### Capturing Modes

```rust
let mut count = 0;
let mut increment = || count += 1;          // captures by &mut
increment();

let name = String::from("hello");
let consume = || drop(name);                // takes ownership — FnOnce
// println!("{}", name);                     // compile error: moved
```

### Where Closures Are Used

```rust
// Sorting
let mut nums = vec![3, 1, 4, 1, 5];
nums.sort_by(|a, b| a.cmp(b));

// Map / Filter / Fold
let doubled: Vec<i32> = nums.iter()
    .map(|x| x * 2)
    .collect();

let evens: Vec<i32> = nums.into_iter()
    .filter(|x| x % 2 == 0)
    .collect();

let sum: i32 = (1..=10)
    .fold(0, |acc, x| acc + x);            // 55
```

### Iterator Adaptors

```rust
let result: Vec<_> = (0..10)
    .filter(|x| x % 2 == 0)
    .map(|x| x * 10)
    .take(3)
    .collect();                              // [0, 20, 40]
```

> **Gotcha**: Iterator adaptors are **lazy** — they don't execute until a consuming method (`collect`, `fold`, `sum`, `for_each`, `count`) is called. If you chain adaptors without a consumer, nothing happens.

---

## 17. Smart Pointers

### Box<T> — heap allocation

```rust
let b = Box::new(5);                       // i32 on heap
// Use for: recursive types, trait objects, large data moves

enum List {
    Cons(i32, Box<List>),
    Nil,
}
```

### Rc<T> — reference counted (single-threaded)

```rust
use std::rc::Rc;

let a = Rc::new(5);
let b = Rc::clone(&a);                      // increments reference count
println!("{}", Rc::strong_count(&a));       // 2
```

### RefCell<T> — interior mutability

```rust
use std::cell::RefCell;

let value = RefCell::new(5);
*value.borrow_mut() = 6;                   // mutable borrow at runtime
let v = value.borrow();                    // immutable borrow
// borrow rules enforced at RUNTIME (panic! if violated)
```

### Common Pattern: Rc<RefCell<T>>

```rust
use std::rc::Rc;
use std::cell::RefCell;

let shared = Rc::new(RefCell::new(42));
let shared2 = Rc::clone(&shared);

*shared.borrow_mut() += 1;
println!("{}", shared2.borrow());          // 43
```

> **Gotcha**: `Box<T>` is for single ownership on heap. `Rc<T>` is for shared ownership (read-only, single-threaded). `RefCell<T>` enforces borrow rules at runtime — `borrow_mut()` panics if already borrowed. Combine `Rc<RefCell<T>>` for multiple owners with mutation.

---

## 18. Modules & Cargo

### Modules (File System)

```rust
// src/lib.rs
mod math;                               // looks for src/math.rs or src/math/mod.rs

// src/math.rs
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

### Visibility

```rust
pub fn public_fn() {}                   // accessible everywhere
fn private_fn() {}                      // accessible within module
pub(crate) fn crate_visible() {}        // accessible within crate
pub(super) fn parent_visible() {}       // accessible via parent module
```

### Use

```rust
use std::collections::HashMap;
use crate::math::add;

// Nested self
use std::io::{self, Read, Write};       // io::Result, io::Read, io::Write
```

### Cargo.toml

```toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }
anyhow = "1.0"
reqwest = { version = "0.12", features = ["json"] }
```

### Workspaces (multi-crate projects)

```toml
# root Cargo.toml
[workspace]
members = ["crates/*"]
```

```
my_project/
├── Cargo.toml            # workspace root
└── crates/
    ├── core/
    ├── cli/
    └── web/
```

> **Gotcha**: The `mod` declaration and the actual file must match. `mod math;` looks for `math.rs` or `math/mod.rs`. Items are private by default — use `pub` to expose them.

---

## 19. Common Standard Library

### String

```rust
let mut s = String::new();
s.push_str("hello");
s.push('!');
s = "world".to_string();                 // conversion
s = format!("{}{}", "hello", "world");   // format! returns String

// Converting &str ↔ String
let s: &str = "hello";
let owned: String = s.to_string();
let borrowed: &str = &owned;
let slice: &str = &owned[2..4];
```

### Path & File I/O

```rust
use std::path::Path;
use std::fs;

let path = Path::new("data/file.txt");
let content = fs::read_to_string(path)?;          // read entire file
fs::write("out.txt", "hello")?;                   // write entire file

// Directory
for entry in fs::read_dir(".")? {
    let entry = entry?;
    println!("{}", entry.path().display());
}
```

### Time

```rust
use std::time::{Duration, Instant};

let start = Instant::now();
// ... do work ...
let elapsed = start.elapsed();
println!("{}ms", elapsed.as_millis());

let delay = Duration::from_secs(2);
std::thread::sleep(delay);
```

### Threading

```rust
use std::thread;

let handle = thread::spawn(|| {
    println!("from thread");
});
handle.join().unwrap();                           // wait for thread

// Move data into thread
let data = vec![1, 2, 3];
thread::spawn(move || {                          // move closure
    println!("{:?}", data);
}).join().unwrap();
```

### Channels

```rust
use std::sync::mpsc;

let (tx, rx) = mpsc::channel();
thread::spawn(move || {
    tx.send(42).unwrap();                         // send
});
let received = rx.recv().unwrap();                // receive (blocks)
```

### Arc<Mutex<T>> (shared state across threads)

```rust
use std::sync::{Arc, Mutex};

let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];

for _ in 0..10 {
    let counter = Arc::clone(&counter);
    handles.push(thread::spawn(move || {
        let mut num = counter.lock().unwrap();
        *num += 1;
    }));
}

for handle in handles {
    handle.join().unwrap();
}
println!("{}", *counter.lock().unwrap());          // 10
```

> **Gotcha**: `Arc<T>` is atomic reference counting (thread-safe `Rc<T>`). `Mutex<T>` provides interior mutability across threads. Always lock `Mutex` in a scope — the lock guard automatically unlocks when dropped.

---

## 20. Common Gotchas

```rust
// ┌─ Gotcha 1: Move after borrow ───────────────────────────────────
let s = String::from("hello");
let r = &s;                          // borrow
let s2 = s;                          // move — r is now invalid!
// println!("{}", r);                // compile error: borrow after move


// ┌─ Gotcha 2: Mutable borrow while immutable exists ────────────────
let mut s = String::from("hello");
let r1 = &s;
let r2 = &s;
// let r3 = &mut s;                  // error: cannot borrow as mutable
println!("{} {}", r1, r2);           // immutable refs go out of scope here
let r3 = &mut s;                     // OK now


// ┌─ Gotcha 3: Iterating and mutating ───────────────────────────────
let mut v = vec![1, 2, 3, 4];
// for i in &v { v.push(*i); }       // error: cannot borrow as mutable

// Fixed with indices:
let to_add: Vec<_> = v.iter().copied().collect();
for x in to_add { v.push(x); }                              // OK


// ┌─ Gotcha 4: String vs &str ──────────────────────────────────────
fn takes_str(s: &str) {}
fn takes_string(s: String) {}

let owned = String::from("hello");
takes_str(&owned);                      // OK — String derefs to &str
takes_string(owned);                    // moved — owned consumed
// takes_string(owned);                 // error: moved

// takes_str("hello");                  // OK — &'static str
// takes_string("hello");               // error: expected String, got &str
// takes_string("hello".to_string());   // OK


// ┌─ Gotcha 5: Vec index is usize ──────────────────────────────────
let v = vec![1, 2, 3];
// let i = v[0] as usize;  — that's fine
let i: usize = 0;
println!("{}", v[i]);                   // correct

// What about trying to use i32 as index?
// let i: i32 = 0;
// println!("{}", v[i]);                // error: can't index with i32
// println!("{}", v[i as usize]);       // fix: cast to usize


// ┌─ Gotcha 6: Match exhaustiveness ─────────────────────────────────
fn check(x: Option<i32>) {
    match x {
        Some(v) => println!("got {}", v),
        // forgot None — compile error: non-exhaustive patterns
        None => {}                      // must handle this
    }
}


// ┌─ Gotcha 7: Closure capture modes ────────────────────────────────
let mut count = 0;
let mut inc = || count += 1;
inc();
// let r = &count;                      // error: cannot borrow — already borrowed mutably
println!("{}", count);                  // closure's borrow released at last use


// ┌─ Gotcha 8: Vec<&str> and temporary strings ──────────────────────
// let v: Vec<&str> = vec!["a"];
// {
//     let s = String::from("b");
//     v.push(&s);                      // error: s does not live long enough
// }                                    // s dropped here
// println!("{:?}", v);


// ┌─ Gotcha 9: usize vs u32 indexing ────────────────────────────────
// Vec::len() returns usize. Comparison between u32 and usize:
let len = 10usize;
let idx = 5u32;
// if idx < len { }                    // error: mismatched types
if (idx as usize) < len { }            // cast to compare


// ┌─ Gotcha 10: Forgetting & in for loop ────────────────────────────
let v = vec![1, 2, 3];
// for x in v { println!("{}", x); }   // moves v — cannot use after
for x in &v { println!("{}", x); }     // borrows — v still available
println!("{:?}", v);                   // OK
```

---

## 21. Testing & Documentation

### Unit Tests

```rust
// Convention: tests in same file, in a `tests` module
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
        assert!(add(0, 0) == 0);
    }

    #[test]
    #[should_panic(expected = "divide by zero")]
    fn test_panic() {
        let _ = divide(1, 0);
    }

    #[test]
    fn test_result() -> Result<(), String> {
        if add(1, 1) == 2 {
            Ok(())
        } else {
            Err(String::from("wrong"))
        }
    }
}
```

### Integration Tests

```rust
// Create: tests/integration_test.rs
// Each file in tests/ is compiled as a separate crate

use my_project::add;

#[test]
fn test_integration() {
    assert_eq!(add(2, 2), 4);
}
```

### Running Tests

```bash
cargo test                              # run all tests
cargo test test_add                     # run specific test
cargo test -- --nocapture               # show println output
cargo test -- --test-threads=1          # single-threaded
```

### Documentation Comments

```rust
/// Adds two numbers.
///
/// # Examples
///
/// ```
/// use my_crate::add;
/// assert_eq!(add(2, 3), 5);
/// ```
///
/// # Panics
/// Panics if overflow occurs.
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

// Inner doc comment (for modules, crates)
//! # My Crate
//! This crate does useful things.
```

```bash
cargo doc --open                        # build and open HTML docs
```

> **Gotcha**: Doc tests (code in `///` comments) are run by `cargo test`. Ensure they compile and pass — broken doc tests fail CI. Use `#` to hide lines from output but still compile them.

---

> **Pro tip**: Rust's compiler is your strictest mentor. When it rejects your code, read the error carefully — the diagnostics are excellent. `cargo clippy` adds lint suggestions, `cargo fmt` formats code. Embrace the borrow checker; it's preventing bugs you didn't even know you'd write.
