# React Features You're (probably) not using yet.

### A Lightning Talk ⚡

_Press **Space** or **→** to navigate_

---

## `useFormState`

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

## Building a React Component

Watch how we build a component step by step

--

<!-- .slide: data-auto-animate -->
<pre data-id="code-animation"><code data-trim data-line-numbers>
function Welcome() {
  return <h1>Hello!</h1>;
}
</code></pre>

--

<!-- .slide: data-auto-animate -->
<pre data-id="code-animation"><code data-trim data-line-numbers>
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
</code></pre>

--

<!-- .slide: data-auto-animate -->
<pre data-id="code-animation"><code data-trim data-line-numbers>
function Welcome({ name, greeting = "Hello" }) {
  return <h1>{greeting}, {name}!</h1>;
}

// Usage
<Welcome name="React Developer" />
</code></pre>

--

<!-- .slide: data-auto-animate -->
<pre data-id="code-animation"><code data-trim data-line-numbers>
function Welcome({ name, greeting = "Hello" }) {
  const [isVisible, setIsVisible] = useState(true);
  
  return isVisible ? (
    <h1 onClick={() => setIsVisible(false)}>
      {greeting}, {name}!
    </h1>
  ) : null;
}

// Usage
<Welcome name="React Developer" greeting="Hey" />
</code></pre>

Simple to powerful in just a few steps! <!-- .element: class="fragment" -->

---

## React Component Anatomy

Let's break down a complete React component step by step

--

### 1. Imports & Dependencies

```javascript [1-3]
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { fetchUserData } from "../api/users";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserData(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <img src={user.avatar} alt={user.name} />
    </div>
  );
}

export default UserProfile;
```

First, we import React hooks and external dependencies

--

### 2. Component Declaration & Props

```javascript [5]
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { fetchUserData } from "../api/users";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserData(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <img src={user.avatar} alt={user.name} />
    </div>
  );
}

export default UserProfile;
```

Function component that receives `userId` as a prop

--

### 3. State Management

```javascript [6-8]
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { fetchUserData } from "../api/users";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserData(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <img src={user.avatar} alt={user.name} />
    </div>
  );
}

export default UserProfile;
```

Three pieces of state: user data, loading status, and error handling

--

### 4. Side Effects (useEffect)

```javascript [10-23]
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { fetchUserData } from "../api/users";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserData(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <img src={user.avatar} alt={user.name} />
    </div>
  );
}

export default UserProfile;
```

Async data fetching that runs when `userId` changes

--

### 5. Conditional Rendering

```javascript [25-26]
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { fetchUserData } from "../api/users";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserData(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <img src={user.avatar} alt={user.name} />
    </div>
  );
}

export default UserProfile;
```

Early returns for loading and error states

--

### 6. JSX Return & Data Binding

```javascript [28-33]
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { fetchUserData } from "../api/users";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserData(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <img src={user.avatar} alt={user.name} />
    </div>
  );
}

export default UserProfile;
```

JSX template with dynamic data binding from state

--

### 7. Export for Reusability

```javascript [37]
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { fetchUserData } from "../api/users";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserData(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <img src={user.avatar} alt={user.name} />
    </div>
  );
}

export default UserProfile;
```

Export component for use in other parts of the application

--

### Complete Component Flow

```javascript
import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { fetchUserData } from "../api/users";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserData(userId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <img src={user.avatar} alt={user.name} />
    </div>
  );
}

export default UserProfile;
```

A complete, production-ready React component! <!-- .element: class="fragment" -->

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
