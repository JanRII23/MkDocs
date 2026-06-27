# C# :knife:

> For developers with experience in another language who are new to C#.  
> Concise reference — each topic: explanation + code snippet + gotcha.

---

## 1. Getting Started

### .NET SDK & Execution

```bash
dotnet new console -n MyApp         # create new console project
dotnet run                          # build and run
dotnet build                        # build only
dotnet test                         # run tests
```

### Program Structure (.NET 6+ top-level statements)

```csharp
// Program.cs — entry point is implicit
Console.WriteLine("Hello, C#!");
```

### Traditional Structure (older style)

```csharp
using System;

namespace MyApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, C#!");
        }
    }
}
```

### Compilation & Runtime

```
.cs source --[csc/Roslyn]--> .dll/.exe (IL) --[.NET Runtime/JIT]--> machine code
```

> **Gotcha**: In .NET 6+, top-level statements auto-generate the `Main` method. You can't have both top-level statements and a `Main` method in the same file.

---

## 2. Variables & Data Types

### Value Types (primitives)

| Type | Size | Range | Example |
|------|------|-------|---------|
| `bool` | 1 B | true/false | `bool ok = true;` |
| `byte` | 1 B | 0-255 | `byte b = 200;` |
| `sbyte` | 1 B | -128 to 127 | `sbyte sb = -100;` |
| `short` | 2 B | ~±32K | `short s = 30000;` |
| `ushort` | 2 B | 0-65535 | `ushort us = 60000;` |
| `int` | 4 B | ~±2.1B | `int i = 42;` |
| `uint` | 4 B | 0-4.3B | `uint ui = 42U;` |
| `long` | 8 B | ~±9.2E18 | `long l = 42L;` |
| `ulong` | 8 B | 0-1.8E19 | `ulong ul = 42UL;` |
| `float` | 4 B | ~±3.4E38 | `float f = 3.14f;` |
| `double` | 8 B | ~±1.8E308 | `double d = 3.14;` |
| `decimal` | 16 B | high-precision | `decimal m = 3.14m;` |
| `char` | 2 B | Unicode UTF-16 | `char c = 'A';` |

### Variable Declaration

```csharp
int x;                      // declaration (defaults to 0)
int y = 10;                 // initialization
var z = 15;                 // type inference (z is int, compile-time)
const double Pi = 3.14;     // compile-time constant
readonly int Max = 100;     // runtime constant (set in constructor)
```

### Reference Types

```csharp
string s = "hello";         // reference type (immutable)
object o = "anything";      // base type for everything
dynamic d = "resolved at runtime";  // opt-out of static type checking
```

### Nullable Value Types

```csharp
int? maybe = null;          // Nullable<int> — can be int or null
int val = maybe ?? 0;       // null-coalescing: 0 if maybe is null
int val2 = maybe.GetValueOrDefault(0);
```

> **Gotcha**: `var` is not dynamic — the type is determined at compile time. You can't use `var` for fields or return types; only for local variables.

---

## 3. Output & Console

### Console Output

```csharp
Console.Write("no newline");
Console.WriteLine("with newline");
Console.WriteLine($"formatted: {name} is {age}");   // string interpolation
Console.WriteLine("format: {0} is {1}", name, age);  // composite formatting
```

### Console Input

```csharp
string? name = Console.ReadLine();       // nullable string
int age = int.Parse(Console.ReadLine()!);  // throws if null/invalid
int age2 = int.TryParse(Console.ReadLine(), out int result) ? result : 0;
```

> **Gotcha**: `Console.ReadLine()` returns `string?` (nullable). In .NET 6+ with nullable enabled, you need the null-forgiving operator `!` or a null check.

---

## 4. Operators

### Arithmetic

```csharp
+  -  *  /     // standard
%              // modulo
++x   x++      // pre/post increment
--x   x--      // pre/post decrement
```

### Relational & Logical

```csharp
==  !=  <  >  <=  >=
&&  ||  !               // short-circuit AND, OR, NOT
&   |   ^               // non-short-circuit (bitwise too)
```

### Bitwise & Shift

```csharp
&   |   ^   ~           // AND, OR, XOR, NOT
<<  >>                  // left shift, right shift
```

### Ternary & Null

```csharp
int max = (a > b) ? a : b;

string? name = null;
string display = name ?? "default";    // null-coalescing
string display2 = name?.ToUpper();     // null-conditional — returns null if name is null

int? len = name?.Length;              // null-conditional + nullable
int len2 = name?.Length ?? 0;         // combine both
```

### Pattern Matching

```csharp
if (obj is string s) { ... }                     // type pattern + declaration
if (obj is int i && i > 5) { ... }
if (value is > 0 and < 10) { ... }               // relational + logical patterns (C# 9+)
```

> **Gotcha**: `&` and `|` on bools evaluate both sides (no short-circuit). Use `&&` and `||` for short-circuit.

---

## 5. Control Flow

### if / else

```csharp
if (score >= 90)
    grade = 'A';
else if (score >= 80)
    grade = 'B';
else
    grade = 'F';
```

### switch (traditional)

```csharp
switch (day)
{
    case 1:
        Console.WriteLine("Mon");
        break;
    case 2:
        Console.WriteLine("Tue");
        break;
    default:
        Console.WriteLine("Other");
        break;
}
```

### switch (expression, C# 8+)

```csharp
string result = day switch
{
    1 => "Mon",
    2 => "Tue",
    >= 3 and <= 5 => "Midweek",    // relational + logical patterns
    _ => "Other"                   // discard (default)
};
```

### Loops

```csharp
for (int i = 0; i < 10; i++) { }

foreach (var item in collection) { }

while (condition) { }

do { } while (condition);
```

### break / continue / goto

```csharp
break;        // exit loop/switch
continue;     // next iteration
goto Label;   // rarely used — exists for fallthrough in switch or deep break
Label:
    ...
```

> **Gotcha**: `switch` expression (C# 8+) is an **expression** (returns a value), not a statement. It must be exhaustive — every case covered, including with `_` (discard).

---

## 6. Strings

### Immutability

```csharp
string s = "hello";
s.ToUpper();               // returns "HELLO", s still "hello"
s = s.ToUpper();           // rebind to change
```

### String Interpolation

```csharp
string name = "Alice";
int age = 30;
string msg = $"{name} is {age}";          // "Alice is 30"
string msg2 = $"{age,5}";                  // right-aligned: "   30"
string msg3 = $"{3.14159:F2}";             // "3.14"
string msg4 = $"""He said "{name}" """;    // raw string literal (C# 11+)
```

### StringBuilder

```csharp
var sb = new StringBuilder();
sb.Append("Hello ");
sb.AppendLine("world");
string result = sb.ToString();
```

### Common Methods

```csharp
"hello".Length;                          // 5 (property, not method)
"hello".ToUpper();                       // "HELLO"
"hello".Substring(1, 3);                 // "ell"
"hello".IndexOf("l");                    // 2
"hello".Contains("el");                  // True
"  hi  ".Trim();                         // "hi"
"a,b,c".Split(',');                      // ["a", "b", "c"]
string.Join(", ", new[] {"a", "b"});     // "a, b"
"hello".Replace("l", "x");               // "hexxo"
```

### Verbatim & Raw Strings

```csharp
string path = @"C:\Users\Alice";          // verbatim — no escape sequences
string multi = """
    {
        "name": "Alice"
    }
    """;                                   // raw string literal (C# 11+)
```

> **Gotcha**: `string.Length` is a **property**, not a method — no parentheses. Strings use `==` for **value equality** (unlike Java), which is correct and idiomatic.

---

## 7. Arrays

### Declaration & Initialization

```csharp
int[] arr1 = new int[5];               // all 0
int[] arr2 = { 1, 2, 3, 4, 5 };       // inline
int[] arr3 = new int[] { 1, 2, 3 };   // explicit
int[] arr4 = [1, 2, 3];               // collection expression (C# 12+)

int len = arr2.Length;                 // property
```

### Iteration

```csharp
for (int i = 0; i < arr2.Length; i++)
    Console.WriteLine(arr2[i]);

foreach (int val in arr2)
    Console.WriteLine(val);
```

### Multi-Dimensional

```csharp
int[,] rect = new int[3, 4];           // rectangular: 3 rows × 4 cols
int[][] jagged = new int[3][];         // jagged: array of arrays
jagged[0] = new int[] { 1, 2 };
jagged[1] = new int[] { 3, 4, 5 };
```

### Span<T> (C# 7.2+)

```csharp
Span<int> slice = arr2.AsSpan(1, 3);   // no-copy slice
slice[0] = 99;                         // modifies original array
```

> **Gotcha**: `arr.Length` is a **property** — no parentheses (unlike Java where it's a field; unlike Python/C++ where it's a method call).

---

## 8. Collections (Generic)

### List<T>

```csharp
var list = new List<int> { 1, 2, 3 };
list.Add(4);
list.AddRange(new[] { 5, 6 });
list.Remove(3);                  // remove first occurrence of 3
list.RemoveAt(0);                // remove at index
list[0] = 99;                    // indexer
var first = list.Find(x => x > 5);
var all = list.Where(x => x > 5).ToList();
```

### Dictionary<TKey, TValue>

```csharp
var dict = new Dictionary<string, int>
{
    ["Alice"] = 30,
    ["Bob"] = 25
};
dict["Alice"] = 31;              // update
dict.TryGetValue("Eve", out int age);  // safe lookup
dict.ContainsKey("Bob");
dict.Remove("Bob");

foreach (var (k, v) in dict)     // deconstruction (C# 7+)
    Console.WriteLine($"{k} = {v}");
```

### HashSet<T> & Queue<T> & Stack<T>

```csharp
var set = new HashSet<int> { 1, 2, 3, 1 };   // {1, 2, 3}
set.Add(4);
set.Contains(2);

var queue = new Queue<int>();
queue.Enqueue(1);
int front = queue.Dequeue();

var stack = new Stack<int>();
stack.Push(1);
int top = stack.Pop();
```

### LINQ (Language Integrated Query)

```csharp
using System.Linq;

var result = numbers
    .Where(n => n > 5)
    .OrderBy(n => n)
    .Select(n => n * 2)
    .ToList();

// Query syntax
var result2 = from n in numbers
              where n > 5
              orderby n
              select n * 2;
```

> **Gotcha**: LINQ queries use **deferred execution**. They don't execute until you iterate — so multiple iterations re-execute the query. Call `.ToList()` or `.ToArray()` to materialize.

---

## 9. Classes & Objects

### Basic Class

```csharp
public class Person
{
    // fields
    private string _name;
    private int _age;

    // auto-property (compiler generates backing field)
    public string Nickname { get; set; }

    // property with logic
    public string Name
    {
        get => _name;
        set => _name = value ?? throw new ArgumentNullException(nameof(value));
    }

    // read-only property
    public int Age { get; private set; }

    // expression-bodied property
    public bool IsAdult => Age >= 18;

    // constructor
    public Person(string name, int age)
    {
        _name = name;
        Age = age;
    }

    // method
    public void Greet() => Console.WriteLine($"Hi, I'm {Name}");
}
```

### Object Creation

```csharp
var p = new Person("Alice", 30);
p.Greet();
p.Nickname = "Ali";
```

### Object & Collection Initializers

```csharp
var p = new Person("Bob", 25) { Nickname = "B" };    // property init

var list = new List<int> { 1, 2, 3 };                // collection init

var dict = new Dictionary<int, string>
{
    [1] = "one",
    [2] = "two"
};
```

### Static Members

```csharp
public static class MathHelper
{
    public static double Pi = 3.14;
    public static int Square(int x) => x * x;
}

MathHelper.Square(5);
```

> **Gotcha**: Static classes cannot be instantiated or inherited. All members must be static.

---

## 10. Properties & Indexers

### Auto-Properties

```csharp
public string Name { get; set; }               // read/write
public string Name { get; }                     // read-only (set in constructor)
public string Name { get; private set; }        // public get, private set
```

### Expression-Bodied Properties

```csharp
public double Area => Radius * Radius * Math.PI;  // read-only computed
```

### Init-Only Setters (C# 9+)

```csharp
public record Person
{
    public string Name { get; init; }     // can only set in constructor/init
}
```

### Indexer

```csharp
public class Grid
{
    private int[,] _data = new int[10, 10];

    public int this[int row, int col]
    {
        get => _data[row, col];
        set => _data[row, col] = value;
    }
}

var g = new Grid();
g[0, 0] = 42;
```

> **Gotcha**: Property names are PascalCase by convention, not camelCase. Fields are camelCase (often prefixed with `_`).

---

## 11. Inheritance & Polymorphism

### Base & Derived

```csharp
public class Animal
{
    protected string Name { get; }

    public Animal(string name) => Name = name;

    public virtual void Speak() => Console.WriteLine("...");
}

public class Dog : Animal
{
    public Dog(string name) : base(name) { }

    public override void Speak() => Console.WriteLine("Woof!");
}
```

### Sealed & New

```csharp
public sealed class FinalClass : Dog { }     // cannot be inherited further

public class Cat : Animal
{
    public new void Speak()                  // hides (not overrides) the base method
        => Console.WriteLine("Meow");
    // Without virtual/override, the base version is called when using Animal reference
}
```

### Polymorphism

```csharp
List<Animal> animals = [new Dog("Rex"), new Cat("Whiskers")];
foreach (var a in animals)
    a.Speak();    // Dog → "Woof!"; Cat → "..." (new, not override)
```

### Abstract Classes

```csharp
public abstract class Shape
{
    public abstract double Area();     // no body
    public string Color { get; set; }  // concrete member
}

public class Circle : Shape
{
    public double Radius { get; }
    public override double Area() => Math.PI * Radius * Radius;
}
```

> **Gotcha**: `virtual` methods can be overridden; `new` methods hide the base version without polymorphism. Prefer `override` over `new` unless you have a specific reason.

---

## 12. Interfaces

### Defining & Implementing

```csharp
public interface IDrawable
{
    void Draw();                     // implicitly public abstract
    void Print() => Console.WriteLine("Default");  // default implementation (C# 8+)
}

public class Circle : IDrawable
{
    public void Draw() => Console.WriteLine("○");
    // .Print() uses default implementation
}
```

### Multiple Interface Implementation

```csharp
public class Robot : IMovable, IDrawable
{
    public void Move() => ...
    public void Draw() => ...
}
```

### Explicit Interface Implementation

```csharp
public class Writer : ILogger, IAuditor
{
    void ILogger.Log(string msg) { ... }       // only accessible through ILogger reference
    void IAuditor.Log(string msg) { ... }      // same method name, different interface
}

ILogger logger = new Writer();
logger.Log("test");     // calls ILogger version
```

> **Gotcha**: Default interface methods (C# 8+) require the interface reference, not the class reference, to be called unless the class overrides them.

---

## 13. Structs & Records

### Struct (value type)

```csharp
public struct Point
{
    public int X { get; set; }
    public int Y { get; set; }

    public Point(int x, int y) => (X, Y) = (x, y);
}

Point p1 = new(3, 4);        // heap or stack depending on context
Point p2 = p1;                // COPY — independent
p2.X = 99;                    // p1.X still 3
```

### Record (C# 9+) — reference type with value equality

```csharp
public record Person(string Name, int Age);   // positional — auto-constructor, deconstruct, equality

var p1 = new Person("Alice", 30);
var p2 = new Person("Alice", 30);
p1 == p2;                    // True (value equality)

// with-expression — non-destructive mutation
var p3 = p1 with { Age = 31 };
```

### Record Struct (C# 10+)

```csharp
public readonly record struct Point(int X, int Y);  // immutable value type
```

| Type | Memory | Equality | Mutability | Inheritance |
|------|--------|----------|------------|-------------|
| `class` | Heap (reference) | Reference | Mutable | Yes |
| `struct` | Stack/inline (value) | Value | Mutable | No |
| `record class` | Heap (reference) | Value | Immutable by default | Yes (sealed) |
| `record struct` | Stack/inline (value) | Value | Can be mutable | No |

> **Gotcha**: `record` gives you value equality for free, but it's still a reference type (class). Use `record struct` for a value type with value equality.

---

## 14. Exception Handling

### try / catch / finally

```csharp
try
{
    var data = File.ReadAllText("file.txt");
}
catch (FileNotFoundException ex)
{
    Console.WriteLine($"File missing: {ex.Message}");
}
catch (IOException ex) when (ex.HResult == -2147024864)  // exception filter
{
    Console.WriteLine("File in use");
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex}");
    throw;                                     // rethrow preserving stack trace
}
finally
{
    // always runs (cleanup)
}
```

### Custom Exceptions

```csharp
public class InsufficientFundsException : Exception
{
    public InsufficientFundsException(string message) : base(message) { }
    public InsufficientFundsException(string message, Exception inner)
        : base(message, inner) { }
}
```

### using Statement (IDisposable)

```csharp
using var reader = new StreamReader("file.txt");  // auto-dispose at end of scope
string line = reader.ReadLine();

// or block-scoped
using (var writer = new StreamWriter("out.txt"))
{
    writer.Write("hello");
}
```

> **Gotcha**: `throw;` rethrows preserving the original stack trace. `throw ex;` resets the stack trace to the catch point — never do that.

---

## 15. File I/O

### Reading & Writing

```csharp
using System.IO;

// Read all text
string content = File.ReadAllText("file.txt");
string[] lines = File.ReadAllLines("file.txt");

// Write
File.WriteAllText("out.txt", "hello");
File.WriteAllLines("out.txt", ["line1", "line2"]);

// Append
File.AppendAllText("log.txt", "new entry\n");
```

### Streams

```csharp
// Text
using var reader = new StreamReader("file.txt");
string? line;
while ((line = reader.ReadLine()) is not null) { }

// Binary
using var fs = new FileStream("data.bin", FileMode.Open);
byte[] buffer = new byte[1024];
int bytesRead = fs.Read(buffer);
```

### Path & Directory

```csharp
string combine = Path.Combine("dir", "sub", "file.txt");  // cross-platform
string ext = Path.GetExtension("file.txt");               // ".txt"
string name = Path.GetFileNameWithoutExtension("file.txt"); // "file"
string dir = Path.GetDirectoryName("dir/file.txt");       // "dir"

Directory.CreateDirectory("data/logs");
string[] files = Directory.GetFiles("data", "*.txt");
```

> **Gotcha**: Use `Path.Combine()` for paths, never string concatenation. On Windows the separator is `\`, on Linux/macOS it's `/`.

---

## 16. Delegates, Events & Lambdas

### Delegate

```csharp
// Declaration
public delegate int Operation(int x, int y);

// Usage
Operation add = (a, b) => a + b;
int result = add(3, 4);               // 7

// Multicast
Operation op = add;
op += (a, b) => a * b;
int result2 = op(3, 4);              // 12 (last in invocation list)
```

### Func, Action, Predicate (built-in)

```csharp
Func<int, int, int> add = (a, b) => a + b;
Action<string> log = msg => Console.WriteLine(msg);
Predicate<int> isEven = x => x % 2 == 0;
```

### Events

```csharp
public class Button
{
    public event EventHandler? Clicked;     // event uses += and -= only

    public void Click() => Clicked?.Invoke(this, EventArgs.Empty);
}

var btn = new Button();
btn.Clicked += (sender, args) => Console.WriteLine("clicked");
```

### Lambda Syntax

```csharp
Func<int, int> square = x => x * x;
Func<int, int, int> add = (x, y) => x + y;
Action noParams = () => Console.WriteLine("hi");
```

> **Gotcha**: Events can only be invoked from within the declaring class. External code can only subscribe (`+=`) or unsubscribe (`-=`).

---

## 17. Generics

### Generic Class

```csharp
public class Box<T>
{
    public T Value { get; set; }

    public Box(T value) => Value = value;
}

var box = new Box<int>(42);
var box2 = new Box<string>("hello");
```

### Constraints

```csharp
public class Repository<T> where T : class, new()    // reference type + parameterless constructor
{ }

public T Max<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) > 0 ? a : b;
```

| Constraint | Meaning |
|------------|---------|
| `where T : class` | Reference type |
| `where T : struct` | Value type |
| `where T : new()` | Must have parameterless constructor |
| `where T : SomeClass` | Must inherit from SomeClass |
| `where T : ISomeInterface` | Must implement interface |
| `where T : U` | Must match or inherit from type U |

### Generic Methods

```csharp
public static T GetFirst<T>(List<T> list) => list[0];

// Type inference:
var first = GetFirst(new List<int> { 1, 2 });
```

### Covariance & Contravariance

```csharp
// out = covariant (T only in return positions)
IEnumerable<object> objs = new List<string> { "hello" };

// in = contravariant (T only in input positions)
Action<string> act = (string s) => { };
Action<object> objAct = (object o) => { };
act = objAct;    // Action<in T> — contravariant
```

> **Gotcha**: Generics in C# are **reified** — type parameters are preserved at runtime (unlike Java's erasure). `typeof(List<int>)` and `typeof(List<string>)` are different types.

---

## 18. LINQ & Extension Methods

### Extension Methods

```csharp
public static class StringExtensions
{
    public static string Reverse(this string str)
    {
        return new string(str.Reverse().ToArray());
    }
}

"hello".Reverse();           // "olleh" — called like an instance method
```

### LINQ Operators

```csharp
var nums = new[] { 1, 2, 3, 4, 5 };

nums.Where(n => n > 2);              // filter
nums.Select(n => n * 2);             // project
nums.OrderBy(n => n);                 // sort ascending
nums.OrderByDescending(n => n);
nums.GroupBy(n => n % 2);            // group
nums.Aggregate(0, (a, b) => a + b);  // reduce
nums.Any(n => n > 3);                // exists
nums.All(n => n > 0);                // all match
nums.First(); nums.Single(); nums.Last();
nums.Take(3); nums.Skip(2);          // pagination
nums.Distinct(); nums.Union(other);
nums.Zip(other, (a, b) => $"{a},{b}");
```

> **Gotcha**: Extension methods are just static methods in disguise. They can't access private members of the type they extend.

---

## 19. Async / Await

### Basic Async

```csharp
using System.Net.Http;

public async Task<string> FetchDataAsync(string url)
{
    using var client = new HttpClient();
    string result = await client.GetStringAsync(url);
    return result;
}

// Usage
string data = await FetchDataAsync("https://api.example.com");
```

### Task vs void

```csharp
Task<T>        // async method that returns a value
Task           // async method that returns nothing (void equivalent)
async void     // fire-and-forget — only for event handlers (dangerous)
```

### ConfigureAwait

```csharp
await Task.Delay(1000).ConfigureAwait(false);  // don't capture sync context
```

### Parallel

```csharp
Parallel.For(0, 100, i =>
{
    Console.WriteLine(i);    // runs in parallel (not async!)
});

var results = await Task.WhenAll(
    FetchDataAsync("url1"),
    FetchDataAsync("url2")
);
```

> **Gotcha**: `async void` methods crash the process if they throw — the exception is unobserved. Use `async Task` instead unless you're writing an event handler.

---

## 20. Common Gotchas

```csharp
// ┌─ Gotcha 1: Reference vs Value type assignment ─────────────────
var list1 = new List<int> { 1, 2 };
var list2 = list1;               // same object
list2.Add(3);
Console.WriteLine(list1.Count);  // 3 — not 2!

// Structs copy:
var p1 = new Point(3, 4);
var p2 = p1;                     // independent copy
p2.X = 99;
Console.WriteLine(p1.X);         // 3 — unchanged


// ┌─ Gotcha 2: foreach iteration variable (C# <5 vs 5+) ───────────
// Pre-C# 5: closure captured the SAME variable each iteration (bug)
// C# 5+: each iteration has its own variable

var funcs = new List<Func<int>>();
for (int i = 0; i < 3; i++)
    funcs.Add(() => i);
Console.WriteLine(funcs[0]());   // 3 if old behavior, 0 with C# 5+

// Safe in foreach (all versions):
foreach (var x in new[] { 1, 2, 3 })
    funcs.Add(() => x);          // each x is a new variable


// ┌─ Gotcha 3: Nullable Reference Types (C# 8+) ───────────────────
#nullable enable
string name = null;              // warning!
string? maybe = null;            // OK — intentionally nullable
// Enable in .csproj: <Nullable>enable</Nullable>


// ┌─ Gotcha 4: foreach with IEnumerable modification ──────────────
var list = new List<int> { 1, 2, 3 };
// foreach (var x in list) list.Remove(x);   // InvalidOperationException
// Use for loop backwards or .RemoveAll()

list.RemoveAll(x => x > 1);      // correct


// ┌─ Gotcha 5: structs with mutable fields are dangerous ───────────
// See Gotcha 1 — always copy structs. Prefer readonly structs.
readonly struct SafePoint { public int X { get; } }


// ┌─ Gotcha 6: Deferred execution in LINQ ──────────────────────────
var query = nums.Where(n => n > 2);   // not executed yet
nums.Add(99);                          // affects query results!
var result = query.ToList();          // now executes

// Always materialize if the source may change:
var materialized = nums.Where(n => n > 2).ToList();


// ┌─ Gotcha 7: String concatenation in loops ──────────────────────
string s = "";
for (int i = 0; i < 1000; i++)
    s += i + " ";                    // O(n²) — creates new string each time

// Fix:
var sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
    sb.Append(i).Append(' ');
s = sb.ToString();


// ┌─ Gotcha 8: Default equality for record vs class ───────────────
// record: value equality (by member values)
// class: reference equality (unless overridden)


// ┌─ Gotcha 9: Capturing loop variable in anonymous methods (pre C# 5)
// Already covered above. Use C# 5+ or capture a local copy:
for (int i = 0; i < 3; i++)
{
    var captured = i;                // copy for closure
    funcs.Add(() => captured);
}
```

---

> **Pro tip**: C# is a multi-paradigm language — use the right tool for the job. Use records for data, classes for behaviour, structs for small value types, and async/await for I/O. Visual Studio / Rider have excellent tooling; let the IDE help with refactoring and debugging.
