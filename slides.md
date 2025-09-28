---
theme: default
background: "#2d3748"
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## React Advanced Lightning Talk

  A presentation about advanced React features and patterns
drawings:
  persist: false
transition: slide-left
title: React Advanced Lightning Talk
mdc: true
---

# React Features You're (probably) not using yet.

### A Lightning Talk ⚡

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Press Space or → to navigate <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/chiubaca/react-advanced-lightning-talk" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---

# Core Features

React's fundamental strengths

<v-clicks>

- **Component-Based** - Build encapsulated components
- **Virtual DOM** - Efficient updates and rendering
- **Declarative** - Describe what you want, not how
- **Learn Once, Write Anywhere** - Web, mobile, desktop

</v-clicks>

---

# Why React?

<div grid="~ cols-2 gap-4" class="mt-8">

<div>

## Performance

<v-click>

Virtual DOM optimizations enable efficient updates

</v-click>

</div>

<div>

## Ecosystem

<v-click>

Rich library ecosystem with extensive community support

</v-click>

</div>

</div>

---

# Building a React Component

Watch how we build a component step by step

---

# Component Evolution

<div class="mt-8">

````md magic-move
```js
function Welcome() {
  return <h1>Hello!</h1>;
}
```

```js
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

```js
function Welcome({ name, greeting = "Hello" }) {
  return (
    <h1>
      {greeting}, {name}!
    </h1>
  );
}

// Usage
<Welcome name="React Developer" />;
```

```js
function Welcome({ name, greeting = "Hello" }) {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <h1 onClick={() => setIsVisible(false)}>
      {greeting}, {name}!
    </h1>
  ) : null;
}

// Usage
<Welcome name="React Developer" greeting="Hey" />;
```
````

</div>

<div class="absolute bottom-10">
  <v-click>
    <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded">
      Simple to powerful in just a few steps!
    </div>
  </v-click>
</div>

---

# React Component Anatomy

Let's break down a complete React component step by step

---

# 1. Imports & Dependencies

```javascript {1-3}
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

---

# 2. Component Declaration & Props

```javascript {5}
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

---

# 3. State Management

```javascript {6-8}
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

---

# 4. Side Effects (useEffect)

```javascript {10-23}
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

---

# 5. Conditional Rendering

```javascript {25-26}
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

---

# 6. JSX Return & Data Binding

```javascript {28-33}
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

---

# 7. Export for Reusability

```javascript {37}
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

---

# Complete Component Flow

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

<v-click>

<div class="mt-4 p-4 bg-green-100 text-green-800 rounded">
  A complete, production-ready React component!
</div>

</v-click>

---

# Advanced React Patterns

<div class="mt-8">

## 1. Custom Hooks

<v-click>

```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}
```

</v-click>

<v-click>

<div class="mt-4 text-gray-600">
  Reusable stateful logic across components
</div>

</v-click>

</div>

---

# Context API

Share data across the component tree without prop drilling

---

# Creating Context

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

---

# Using Context

```javascript
function Header() {
  const theme = useContext(ThemeContext);
  return <header className={`header-${theme}`}>My App</header>;
}
```

---

# Performance Optimization

| Technique      | Use Case                         |
| -------------- | -------------------------------- |
| `React.memo`   | Prevent re-renders of components |
| `useMemo`      | Memoize expensive calculations   |
| `useCallback`  | Memoize function references      |
| Code Splitting | Load components on demand        |

<style>
table {
  font-size: 0.9rem;
  margin-top: 2rem;
}

table th,
table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

table th {
  font-weight: 600;
  background: #f9fafb;
}
</style>

---

layout: center
background: '#10b981'

---

# Key Takeaways

<div class="text-white">

<v-clicks>

- React makes UI development predictable
- Component composition is powerful
- Hooks enable powerful patterns
- Performance optimization tools are built-in

</v-clicks>

</div>

---

## layout: center

# Thank You!

Questions?

<div class="mt-8 text-sm opacity-75">
  <p>Navigate: ← → ↑ ↓ Space | Fullscreen: F | Overview: Esc</p>
</div>

<!--
This is the end of the presentation. You can add speaker notes here that will only be visible in presenter mode.
-->
