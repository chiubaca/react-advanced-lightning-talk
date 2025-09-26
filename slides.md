# React Features You're (probably) not using yet.

### A Lightning Talk ⚡

_Press **Space** or **→** to navigate_

---

## What is React?

A JavaScript library for building user interfaces

Press ↓ to see more details <!-- .element: class="fragment" -->

--

### Core Features

- Component-Based <!-- .element: class="fragment" -->
- Virtual DOM <!-- .element: class="fragment" -->
- Declarative <!-- .element: class="fragment" -->
- Learn Once, Write Anywhere <!-- .element: class="fragment" -->

--

### Why React?

<div style="display: flex; justify-content: space-between;">
<div class="fragment">

#### Performance

Virtual DOM optimizations

</div>
<div class="fragment">

#### Ecosystem

Rich library ecosystem

</div>
</div>

---

## Basic Component Example

```javascript
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Welcome name="React Developer" />;
```

Simple, clean, and reusable! <!-- .element: class="fragment" -->

---

## Advanced React Patterns

<div class="fragment">

### 1. Custom Hooks

```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}
```

</div>

Reusable stateful logic across components <!-- .element: class="fragment" -->

---

## Context API

Share data across the component tree without prop drilling

--

### Creating Context

```javascript
const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
      <Main />
    </ThemeContext.Provider>
  );
}
```

--

### Using Context

```javascript
function Header() {
  const theme = useContext(ThemeContext);
  return <header className={`header-${theme}`}>My App</header>;
}
```

---

## Performance Optimization

| Technique      | Use Case                         |
| -------------- | -------------------------------- | ----------------------------------- |
| `React.memo`   | Prevent re-renders of components | <!-- .element: class="fragment" --> |
| `useMemo`      | Memoize expensive calculations   | <!-- .element: class="fragment" --> |
| `useCallback`  | Memoize function references      | <!-- .element: class="fragment" --> |
| Code Splitting | Load components on demand        | <!-- .element: class="fragment" --> |

---

<!-- .slide: data-background-color="#2aa198" -->

## Key Takeaways <!-- .element: style="color: white;" -->

- React makes UI development predictable <!-- .element: class="fragment" style="color: white;" -->
- Component composition is powerful <!-- .element: class="fragment" style="color: white;" -->
- Hooks enable powerful patterns <!-- .element: class="fragment" style="color: white;" -->
- Performance optimization tools are built-in <!-- .element: class="fragment" style="color: white;" -->

---

# Thank You!

Questions?

<small>
Navigate: ← → ↑ ↓ Space  
Fullscreen: F | Overview: Esc
</small>

Notes:
This is the end of the presentation. You can add speaker notes here that will only be visible in presenter mode.
