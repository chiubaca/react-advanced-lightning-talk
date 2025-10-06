---
theme: default
background: "#2d3748"
class: text-center
highlighter: shiki
lineNumbers: true
info: |
  ## React Advanced Lightning Talk

  A presentation about advanced React features and patterns
drawings:
  persist: false
transition: slide-left
title: React Advanced Lightning Talk
mdc: true
---

# React features you might not be using yet.

<v-click>
<div class='text-center'>(probably)</div>
</v-click>

### A Lightning Talk ⚡

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    By Alex Chiu
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/chiubaca/react-advanced-lightning-talk" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---

# `use`

<p class='pt-2'> </p>

<v-clicks>

- `use` is a React API that lets you read the value of a resource like a Promise or context.

</v-clicks>

<!--
The one feature I recommend everyone to start using if they can
-->

---

````md magic-move
```jsx {*|6-7|10-20|21|24|26-30|*}
export default function Main() {
  return <UserImages />;
}

function UserImages() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] =  useState(true);

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        setLoading(true)
        const images = await api.getImagesFromApi();
        setData(images);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch dogs:", error);
        setLoading(false)
      }
    };
     fetchUserImages();
  }, []);

  if (loading) return <Loader />

  return (
    <div>
      {data.map((item, index) => (
        <img key={index} src={item} />
      ))}
    </div>
  );
}
```

```jsx
export default function Main() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <DogPics />
      </Suspense>
    </div>
  );
}

function DogPics() {
  const data = use(api.getImagesFromApi());

  return (
    <div>
      {data.map((item, index) => (
        <img key={index} src={item} />
      ))}
    </div>
  );
}
```
````

---

# You can use `use` conditionally

```jsx
function Note({ id, shouldIncludeAuthor }) {
  const note = use(fetchNote(id));

  let author = null;
  if (shouldIncludeAuthor) {
    author = use(fetchNoteAuthor(note.authorId));
  }

  return (
    <div>
      <h1>{note.title}</h1>
      {author && <p>{author}</p>}
      <section>{note.body}</section>
    </div>
  );
}
```

---

# `use` can used instead of `useContext`

<div class="mt-4">

```jsx
import { use } from 'react';

function Button() {
  const theme = use(ThemeContext);
  // ...
```

</div>

<v-click>

<div class="mt-6">

> **Note:** It's preferred to use `use` over `useContext` now as it's more flexible and has the added benefit of being able to be called conditionally if needed.

</div>

</v-click>

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

```

```
