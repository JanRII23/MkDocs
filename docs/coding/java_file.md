# Java :coffee: 

> For developers with experience in another language who are new to Java.  
> Concise reference — each topic: explanation + code snippet + gotcha.

---

## 1. Getting Started

### JDK vs JRE vs JVM

| Layer | What it is |
|-------|------------|
| **JDK** (Java Development Kit) | Tools to develop + run: compiler (`javac`), debugger, docs, and the JRE |
| **JRE** (Java Runtime Environment) | Libraries + JVM needed to **run** compiled Java code |
| **JVM** (Java Virtual Machine) | The actual runtime engine that executes bytecode; one per running app |

### Compilation & Execution Flow

```
.java source  --[javac]-->  .class bytecode  --[java]-->  JVM runs it
```

```java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
```

```bash
javac HelloWorld.java       # produces HelloWorld.class
java HelloWorld              # runs the compiled class
```

> **Gotcha**: The filename must match the public class name (`HelloWorld.java` for `public class HelloWorld`).

### Package & Directory Structure

```java
package com.example.myapp;   // must match directory com/example/myapp/
```

---

## 2. Variables & Data Types

### Eight Primitive Types

| Type | Size | Range | Example |
|------|------|-------|---------|
| `byte` | 1 B | -128 to 127 | `byte b = 100;` |
| `short` | 2 B | ~±32K | `short s = 30000;` |
| `int` | 4 B | ~±2.1B | `int i = 42;` |
| `long` | 8 B | ~±9.2E18 | `long l = 42L;` |
| `float` | 4 B | ~±3.4E38 | `float f = 3.14f;` |
| `double` | 8 B | ~±1.8E308 | `double d = 3.14;` |
| `char` | 2 B | Unicode (0-65535) | `char c = 'A';` |
| `boolean` | ~1 bit | true/false | `boolean ok = true;` |

### Variable Declaration

```java
int x;                   // declaration (defaults to 0)
int y = 10;              // declaration + initialization
var z = 15;              // type inference (Java 10+), z is int
final double PI = 3.14;  // constant (cannot reassign)
```

### Scope

```java
public class ScopeDemo {
    static int classVar = 1;     // class (static) scope
    int instanceVar = 2;         // instance scope

    void method() {
        int localVar = 3;        // local scope (stack)
    }
}
```

### Wrapper Classes & Autoboxing

| Primitive | Wrapper |
|-----------|---------|
| `int` | `Integer` |
| `double` | `Double` |
| `boolean` | `Boolean` |
| `char` | `Character` |

```java
Integer wrapped = 42;          // autoboxing: int → Integer
int unwrapped = wrapped;       // unboxing: Integer → int
```

> **Gotcha**: `Integer` cache covers -128 to 127; `Integer.valueOf(200) != Integer.valueOf(200)` compares references, not values. Use `.equals()`.

---

## 3. Output & Console

### Printing

```java
System.out.print("no newline");
System.out.println("with newline");
System.out.printf("format: %s %d%n", "age", 25);  // formatted, %n = newline
```

### String Concatenation

```java
String s = "count: " + 42;           // compiles to StringBuilder
String t = String.join(", ", "a", "b", "c");  // "a, b, c"
```

### Input with Scanner

```java
import java.util.Scanner;

Scanner sc = new Scanner(System.in);
String name = sc.nextLine();         // read line
int age = sc.nextInt();              // read int
double price = sc.nextDouble();      // read double
```

> **Gotcha**: `nextInt()` leaves the newline in the buffer; call `sc.nextLine()` after to consume it.

---

## 4. Operators

### Arithmetic

```java
+  -  *  /  %     // standard
++x   x++         // pre-increment, post-increment
--x   x--         // pre-decrement, post-decrement
```

### Relational & Logical

```java
==  !=  <  >  <=  >=     // result is boolean
&&  ||  !                 // short-circuit AND, OR, NOT
&   |   ^                 // non-short-circuit (bitwise too)
```

### Bitwise

```java
&   |   ^   ~   <<   >>   >>>    // AND, OR, XOR, NOT, left, right, unsigned right shift
```

### Ternary

```java
int max = (a > b) ? a : b;
```

### `instanceof`

```java
if (obj instanceof String) { ... }
if (obj instanceof String s) { ... }   // pattern matching (Java 16+)
```

> **Gotcha**: `==` compares **reference equality** for objects, not value. Use `.equals()` for string/value comparison.

---

## 5. Control Flow

### if / else if / else

```java
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else {
    grade = 'F';
}
```

### switch (traditional)

```java
switch (day) {
    case 1: System.out.println("Mon"); break;
    case 2: System.out.println("Tue"); break;
    default: System.out.println("Other");
}
```

### switch (enhanced, Java 14+)

```java
switch (day) {
    case 1 -> System.out.println("Mon");
    case 2 -> System.out.println("Tue");
    default -> System.out.println("Other");
}

// as expression
String result = switch (day) {
    case 1 -> "Mon";
    case 2 -> "Tue";
    default -> "Other";
};
```

### Loops

```java
// for
for (int i = 0; i < 10; i++) { ... }

// enhanced for-each
for (String s : list) { ... }

// while
while (condition) { ... }

// do-while (runs at least once)
do { ... } while (condition);
```

### break / continue / labels

```java
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i == 1) break outer;      // breaks both loops
    }
}
```

> **Gotcha**: Forgetting `break` in traditional `switch` causes fall-through.

---

## 6. Strings

### Immutability

```java
String s = "hello";
s.toUpperCase();             // returns NEW string "HELLO", s still "hello"
s = s.toUpperCase();         // rebind to see the change
```

### String Pool

```java
String a = "hello";          // goes in string pool
String b = "hello";          // reused from pool
String c = new String("hello"); // heap object, NOT in pool
a == b;                      // true (same reference from pool)
a == c;                      // false (different object on heap)
a.equals(c);                 // true (correct way to compare)
```

### StringBuilder

```java
StringBuilder sb = new StringBuilder();
sb.append("Hello ").append("world");   // mutable, no new objects
String result = sb.toString();
```

### Common Methods

```java
"hello".length();                    // 5
"hello".charAt(0);                   // 'h'
"hello".substring(1, 3);             // "el"
"hello".indexOf("l");                // 2
"hello".toUpperCase();               // "HELLO"
"  hi  ".trim();                     // "hi"
"a,b,c".split(",");                  // ["a", "b", "c"]
String.join(", ", "a", "b");         // "a, b"
```

### Text Blocks (Java 13+)

```java
String json = """
    {
        "name": "Alice",
        "age": 30
    }
    """;
```

> **Gotcha**: Always use `.equals()` for string comparison, never `==`.

---

## 7. Arrays

### Declaration & Initialization

```java
int[] arr1 = new int[5];           // array of 5 ints, all 0
int[] arr2 = {1, 2, 3, 4, 5};     // inline initializer
int[] arr3 = new int[]{1, 2, 3};   // anonymous array

int length = arr2.length;          // length is a field, not a method
```

### Iteration

```java
for (int i = 0; i < arr2.length; i++) {
    System.out.println(arr2[i]);
}

for (int value : arr2) {           // enhanced for-each
    System.out.println(value);
}
```

### Multi-dimensional

```java
int[][] matrix = new int[3][4];         // 3 rows × 4 cols
int[][] grid  = {{1,2}, {3,4}, {5,6}}; // 3 × 2
int[][][] cube = new int[3][4][5];      // 3D
```

### `java.util.Arrays`

```java
int[] a = {3, 1, 4, 1, 5};
Arrays.sort(a);                        // [1, 1, 3, 4, 5]
Arrays.binarySearch(a, 3);            // 2 (index)
Arrays.toString(a);                   // "[1, 1, 3, 4, 5]"
Arrays.equals(a, b);                  // deep equals for arrays
```

> **Gotcha**: `arr.length` is a **field**, not a method call. No parentheses.

---

## 8. Classes & Objects

### Basic Class

```java
public class Person {
    // fields (instance variables)
    String name;
    int age;

    // constructor
    public Person(String name, int age) {
        this.name = name;      // 'this' disambiguates parameter from field
        this.age = age;
    }

    // method
    void sayHello() {
        System.out.println("Hi, I'm " + name);
    }
}
```

### Object Creation

```java
Person p = new Person("Alice", 30);
p.sayHello();
```

### Method Overloading

```java
public class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}
```

### Static Members

```java
public class Counter {
    static int count = 0;        // shared across all instances
    int instanceId;

    Counter() {
        instanceId = ++count;
    }

    static void reset() {        // static method — no 'this'
        count = 0;
    }
}
```

> **Gotcha**: Static methods cannot access instance fields or call instance methods directly (no `this` reference).

### Constructor Chaining

```java
public class Employee {
    String name;
    String department;

    Employee(String name) {
        this(name, "General");      // calls the 2-arg constructor
    }

    Employee(String name, String dept) {
        this.name = name;
        this.department = dept;
    }
}
```

---

## 9. Packages & Imports

### Package Declaration

```java
package com.myapp.utils;    // must match directory com/myapp/utils/
```

### Import

```java
import java.util.List;               // single class
import java.util.*;                   // wildcard (all classes in util)
import java.util.Map.Entry;           // nested class
import static java.lang.Math.PI;      // static import (use PI directly)
```

### Access Modifiers

| Modifier | Same class | Same package | Subclass (different pkg) | Any |
|----------|-----------|-------------|-------------------------|-----|
| `private` | ✅ | ❌ | ❌ | ❌ |
| default (none) | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

> **Gotcha**: Default (package-private) is often forgotten — it's not `public`, it's no modifier at all.

---

## 10. Inheritance & Polymorphism

### Extends

```java
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void speak() {
        System.out.println("...");
    }
}

public class Dog extends Animal {
    public Dog(String name) {
        super(name);              // must call parent constructor
    }

    @Override
    public void speak() {
        System.out.println("Woof!");
    }
}
```

### Upcasting & Downcasting

```java
Animal a = new Dog("Rex");     // upcast (implicit)
a.speak();                      // "Woof!" — dynamic dispatch

if (a instanceof Dog d) {       // pattern matching (Java 16+)
    d.fetch();                   // downcast with check
}
```

### Polymorphism

```java
List<Animal> animals = List.of(new Dog("Rex"), new Cat("Whiskers"));
for (Animal a : animals) {
    a.speak();                   // calls the right override each time
}
```

### Method Overriding Rules
- Same signature (name + parameter types)
- Return type must be same or covariant (subtype)
- Access cannot be more restrictive
- Can add `@Override` to catch errors at compile time

> **Gotcha**: `super()` must be the **first** statement in the child constructor, or omitted entirely (compiler adds implicit `super()`).

---

## 11. Abstract Classes & Interfaces

### Abstract Class

```java
public abstract class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    public abstract double area();    // no body — must be overridden

    public String getColor() {        // concrete method
        return color;
    }
}
```

### Interface

```java
public interface Drawable {
    void draw();                      // implicitly public abstract

    default void print() {           // default method (Java 8+)
        System.out.println("Printing...");
    }

    static int getMax() {            // static method (Java 8+)
        return 100;
    }
}
```

### Interface vs Abstract Class

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Fields | Any (instance or static) | `public static final` only |
| Constructors | Yes | No |
| Multiple inheritance | No (extends one) | Yes (implements many) |
| Methods | Abstract + concrete | Abstract + default + static + private (9+) |

### Functional Interface (SAM — Single Abstract Method)

```java
@FunctionalInterface
interface Greeter {
    String greet(String name);       // exactly one abstract method
}
```

> **Gotcha**: A class can `extend` only one class but can `implement` multiple interfaces.

---

## 12. Encapsulation & Records

### Getters & Setters (JavaBeans Convention)

```java
public class Person {
    private String name;          // private field
    private int age;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}
```

### `record` (Java 14+)

```java
public record Point(int x, int y) { }
// Automatically provides: constructor, getters (x(), y()), equals, hashCode, toString

Point p = new Point(3, 4);
p.x();          // getter — not getX(), just x()
```

> **Gotcha**: Record fields are `private final`. No setters, no inheritance. Use when you need immutable data carriers.

---

## 13. Enums

### Basic Enum

```java
public enum Color {
    RED, GREEN, BLUE;
}
```

### Enum with Fields & Methods

```java
public enum Planet {
    MERCURY(3.30e23),
    VENUS(4.87e24),
    EARTH(5.97e24);

    private final double mass;        // field

    Planet(double mass) {             // constructor (private by nature)
        this.mass = mass;
    }

    public double getMass() {
        return mass;
    }
}
```

### EnumMap & EnumSet

```java
EnumMap<Color, String> map = new EnumMap<>(Color.class);
map.put(Color.RED, "#FF0000");

EnumSet<Color> set = EnumSet.of(Color.RED, Color.BLUE);
```

> **Gotcha**: Enum constructors are implicitly `private`. You cannot instantiate an enum with `new`.

---

## 14. Exception Handling

### Checked vs Unchecked

| Type | Description | Examples |
|------|-------------|---------|
| **Checked** (compile-time) | Must handle or declare with `throws` | `IOException`, `SQLException` |
| **Unchecked** (runtime) | May ignore (bug in code) | `NullPointerException`, `IllegalArgumentException` |

### Try-Catch-Finally

```java
try {
    FileReader fr = new FileReader("file.txt");
    // read...
} catch (FileNotFoundException e) {
    System.err.println("File not found: " + e.getMessage());
} catch (IOException e) {
    System.err.println("IO error: " + e);
} finally {
    // always runs (cleanup)
}
```

### Try-With-Resources (Java 7+)

```java
try (FileReader fr = new FileReader("file.txt");
     BufferedReader br = new BufferedReader(fr)) {
    String line = br.readLine();
} catch (IOException e) {
    // resources auto-closed (AutoCloseable)
}
```

### Custom Exception

```java
public class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(String message) {
        super(message);
    }
}
```

### Multi-Catch (Java 7+)

```java
try {
    // ...
} catch (IOException | SQLException e) {
    // handle both, e is effectively final
}
```

> **Gotcha**: Checked exceptions must be caught or declared with `throws`. Unchecked exceptions (`RuntimeException` + subclasses) do not.

---

## 15. Generics

### Generic Class

```java
public class Box<T> {
    private T value;

    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

Box<String> box = new Box<>();     // diamond operator (Java 7+)
box.set("hello");
```

### Bounded Type Parameters

```java
public <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) > 0 ? a : b;
}
```

### Wildcards

```java
List<?>           list;      // unbounded — read-only, any type
List<? extends Number> list;  // upper bound — read Number values
List<? super Integer> list;   // lower bound — write Integer values
```

### Type Erasure

```java
// At runtime: List<String> and List<Integer> are both just List
// Compiler erases type parameters and inserts casts where needed
```

### Generic Method

```java
public static <T> T getFirst(List<T> list) {
    return list.get(0);
}
```

> **Gotcha**: Cannot instantiate generic types with primitives — `List<int>` is illegal; use `List<Integer>`.

---

## 16. Collections Framework

### Core Interfaces

```
Collection
  ├── List (ordered, indexed, allows duplicates)
  ├── Set (no duplicates)
  │     ├── HashSet (hash-based, O(1))
  │     ├── LinkedHashSet (insertion order)
  │     └── TreeSet (sorted, O(log n))
  └── Queue / Deque
        ├── ArrayDeque (double-ended, fast)
        └── PriorityQueue (heap-based)

Map (not a Collection)
  ├── HashMap (O(1), allows null key)
  ├── LinkedHashMap (insertion/access order)
  ├── TreeMap (sorted, O(log n))
  └── ConcurrentHashMap (thread-safe)
```

### Common Usage

```java
// List
List<String> list = new ArrayList<>();
list.add("a"); list.add("b"); list.get(0);

// Set
Set<Integer> set = new HashSet<>();
set.add(1); set.contains(1);

// Map
Map<String, Integer> map = new HashMap<>();
map.put("Alice", 30); map.get("Alice");
map.forEach((k, v) -> System.out.println(k + "=" + v));
```

### Comparable vs Comparator

```java
// Comparable — natural ordering (in the class)
public class Person implements Comparable<Person> {
    String name;
    public int compareTo(Person other) {
        return this.name.compareTo(other.name);
    }
}

// Comparator — custom ordering (outside the class)
Comparator<Person> byAge = Comparator.comparingInt(p -> p.age);
Collections.sort(people, byAge);
Collections.sort(people, byAge.reversed());
```

### Streams API (Java 8+)

```java
List<String> result = list.stream()
    .filter(s -> s.startsWith("A"))
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());
```

### Optional (Java 8+)

```java
Optional<String> opt = Optional.ofNullable(getName());
opt.ifPresent(System.out::println);
String val = opt.orElse("default");
```

> **Gotcha**: Removing elements while iterating? Use `iterator.remove()` or `removeIf()`; otherwise you'll get `ConcurrentModificationException`.

---

## 17. Annotations

### Built-in Annotations

```java
@Override                         // checks method is overriding parent
@Deprecated                       // warns callers it's outdated
@SuppressWarnings("unchecked")    // silences specific warnings
@FunctionalInterface              // marks SAM interface
```

### Custom Annotation

```java
@Retention(RetentionPolicy.RUNTIME)   // available at runtime via reflection
@Target(ElementType.METHOD)           // where it can be applied
public @interface Loggable {
    String value() default "";
    int level() default 1;
}

// Usage
@Loggable(value = "fetchUser", level = 2)
public User getUser(int id) { ... }
```

> **Gotcha**: Annotations on their own do nothing — they need a processor (runtime reflection or compile-time APT) to have effect.

---

## 18. Input / Output

### File I/O (Classic)

```java
// Write
try (BufferedWriter bw = new BufferedWriter(new FileWriter("out.txt"))) {
    bw.write("Hello");
}

// Read
try (BufferedReader br = new BufferedReader(new FileReader("in.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}
```

### NIO.2 (Java 7+)

```java
// Read all lines at once
List<String> lines = Files.readAllLines(Paths.get("file.txt"));

// Write
Files.write(Paths.get("out.txt"), List.of("line1", "line2"));

// Walk directory
Files.walk(Paths.get("."))
     .filter(Files::isRegularFile)
     .forEach(System.out::println);
```

### Serialization

```java
@Serial
private static final long serialVersionUID = 1L;  // version control
```

> **Gotcha**: Always specify `serialVersionUID` on serializable classes; otherwise JVM generates one that may differ across compilers.

---

## 19. Multithreading Basics

### Thread & Runnable

```java
// Via Runnable (preferred)
Runnable task = () -> System.out.println("Running in " + Thread.currentThread());
Thread t = new Thread(task);
t.start();

// Via subclass
class MyThread extends Thread {
    public void run() { ... }
}
new MyThread().start();
```

### Thread Lifecycle

```
NEW → RUNNABLE → BLOCKED/WAITING → TIMED_WAITING → TERMINATED
```

### Synchronization

```java
public class Counter {
    private int count = 0;

    public synchronized void increment() {   // intrinsic lock on 'this'
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

// Block-level
synchronized (lockObject) { ... }
```

### volatile

```java
private volatile boolean running = true;   // ensures visibility across threads
```

### ExecutorService

```java
ExecutorService executor = Executors.newFixedThreadPool(4);
executor.submit(() -> System.out.println("Task"));
executor.shutdown();
```

### wait / notify

```java
synchronized (shared) {
    while (!condition) {
        shared.wait();              // releases lock, waits
    }
    shared.notifyAll();             // wakes all waiting threads
}
```

> **Gotcha**: Always call `wait()` / `notify()` inside a `synchronized` block, and always check the condition in a `while` loop (not `if`).

---

## 20. Lambda Expressions & Functional Programming

### Lambda Syntax

```java
// (params) -> expression
// (params) -> { statements }

// Before (anonymous class)
button.addActionListener(new ActionListener() {
    public void actionPerformed(ActionEvent e) { ... }
});

// After (lambda)
button.addActionListener(e -> { ... });
```

### Common Functional Interfaces (`java.util.function`)

| Interface | Method | Signature |
|-----------|--------|-----------|
| `Predicate<T>` | `test` | `T → boolean` |
| `Function<T,R>` | `apply` | `T → R` |
| `Consumer<T>` | `accept` | `T → void` |
| `Supplier<T>` | `get` | `() → T` |
| `UnaryOperator<T>` | `apply` | `T → T` |
| `BinaryOperator<T>` | `apply` | `(T,T) → T` |

### Method References

```java
list.forEach(System.out::println);        // static method reference
list.stream().map(String::toUpperCase);   // instance method on parameter
list.stream().map(this::process);         // instance method on 'this'
```

### Stream Pipeline

```java
int sum = list.stream()
    .filter(s -> s.length() > 3)
    .map(String::length)
    .reduce(0, Integer::sum);
```

> **Gotcha**: Lambdas can only capture "effectively final" variables — variables that are not reassigned after initialization.

---

## 21. Common Gotchas & Pitfalls

```java
// ┌─ Gotcha 1: Integer caching ──────────────────────────────────
Integer a = 127, b = 127;    a == b;        // true (cached)
Integer c = 200, d = 200;    c == d;        // false (not cached)
// Use .equals() for wrapper comparison.

// ┌─ Gotcha 2: String comparison ─────────────────────────────────
String s1 = "hello", s2 = new String("hello");
s1 == s2;                     // false (reference)
s1.equals(s2);                // true (value)

// ┌─ Gotcha 3: float/double precision ────────────────────────────
0.1 + 0.2;                    // 0.30000000000000004
// Use BigDecimal for monetary calculations.

// ┌─ Gotcha 4: Array covariance vs generics invariance ───────────
String[] strs = new String[1];
Object[] objs = strs;         // OK (arrays are covariant)
objs[0] = 42;                 // ArrayStoreException at runtime

List<String> strList = new ArrayList<>();
// List<Object> objList = strList;    // COMPILE ERROR (generics invariant)

// ┌─ Gotcha 5: Shadowing ─────────────────────────────────────────
class Shadow {
    int x = 10;
    void method(int x) {       // parameter shadows field
        this.x = x;            // must use 'this' to refer to field
    }
}

// ┌─ Gotcha 6: Forgetting break in switch ────────────────────────
// Traditional switch falls through to the next case!

// ┌─ Gotcha 7: Concurrent modification during iteration ──────────
List<String> list = new ArrayList<>(List.of("a", "b", "c"));
// for (String s : list) { if (s.equals("b")) list.remove(s); }
//     ↑ ConcurrentModificationException
list.removeIf(s -> s.equals("b"));  // ✅ correct

// ┌─ Gotcha 8: Default constructor disappears ────────────────────
class Parent {
    Parent(int x) { }          // no no-arg constructor
}
// class Child extends Parent { }    // COMPILE ERROR — implicit super() fails
```

---

> **Pro tip**: Java is verbose by design — the type system catches many errors at compile time. Embrace the compiler; it's your first line of defense.
