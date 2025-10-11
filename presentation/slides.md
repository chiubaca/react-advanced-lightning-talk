---
theme: default
class: text-center
highlighter: shiki
lineNumbers: true
drawings:
  persist: false
transition: slide-left
title: React Advanced Lightning Talk
mdc: true
---

# React features you might not be using yet.

### A lightning talk ⚡

<div class="abs-br m-6 flex gap-2">
  <a href="https://github.com/chiubaca/react-advanced-lightning-talk" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

---

# hmu 👋🏼

<SocialContact />

---

# `use`

<p class='pt-2'> </p>

<v-clicks>

- `use` is a React API that lets you read the value of a resource like a Promise or context.

</v-clicks>

<v-click>
<div class="pt-10">

```jsx
import { use } from 'react';

function MessageComponent({ messagePromise }) {
  const message = use(messagePromise);
  const theme = use(ThemeContext); // exact same usage as useContext
  // ...
```

</div>
</v-click>

<!--
The one feature I recommend everyone to start using if they can
-->

---
title: Fetching data on mount with `use`
---

````md magic-move
```jsx {*|6-7|10-20|21|24|26-30|*}
export default function Main() {
  return <UserImages />;
}

function UserImages() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        setLoading(true);
        const images = await api.getImagesFromApi();
        setData(images);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch dogs:", error);
        setLoading(false);
      }
    };
    fetchUserImages();
  }, []);

  if (loading) return <Loader />;

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
        <UserImages />
      </Suspense>
    </div>
  );
}

function UserImages() {
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
transition: fade

---

# How often have you written code like this?

<v-click>

````md magic-move

```jsx {*|2-3|5-10|6|9|*}
function Page() {
  const [apiData, setApiData] = useState("");
  const [isPending, setIsPending] = useState(false);

  const clickHandler = async () => {
    setIsPending(true);
    const data = await yourApi();
    setApiData(data);
    setIsPending(false);
  };

  return (
    <>
      <button onClick={clickHandler}> Get some data </button>
      <div> {isPending ? "Loading..." : apiData} </div>
    </>
  );
}
```
````

</v-click>

---

# Consider `useTransition` for this

````md magic-move
```jsx
function Page() {
  const [apiData, setApiData] = useState("");
  const [isPending, setIsPending] = useState(false);

  const clickHandler = async () => {
    setIsPending(true);
    const data = await yourApi();
    setApiData(data);
    setIsPending(false);
  };

  return (
    <>
      <button onClick={clickHandler}> Get some data </button>
      <div> {isPending ? "Loading..." : apiData} </div>
    </>
  );
}
```

```jsx
function Page() {
  const [apiData, setApiData] = useState("");
  const [isPending, startTransition] = useTransition();

  const clickHandler = async () => {
    startTransition(async () => {
      const data = await yourApi();
      setApiData(data);
    });
  };

  return (
    <>
      <button onClick={clickHandler}> Get some data </button>
      <div> {isPending ? "Loading.." : apiData} </div>
    </>
  );
}
```
````

<!--
Not a big reduction in lines of code.

But this is not more idomatic way to handle the pending state of a promise within in Reat component.

There are also some underhood performance benifit too. Doesnt apply to this function that is running an async function, but if the action inside the `startTransition` is computationally expensive. React will run this function without blocking any UI interactions.
-->

---

# `useActionState` & form actions

<v-click>

````md magic-move
```jsx {*|5-11|6|14|*}
// before useActionState
function Page() {
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message");
    const submittedMessage = await api.submitMessage(message);
    setState((previousState) => [...previousState, submittedMessage]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="message" placeholder="Type a message..." />
      <button type="submit">Send</button>

      <h1>Messages</h1>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </form>
  );
}
```

```jsx {*|9|12|2-6|*}
// with useActionState
async function action(previousState, formData) {
  const message = formData.get("message");
  const submittedMessage = await api.submitMessage(message);
  return [...previousState, submittedMessage];
}

export default function Page() {
  const [messages, formAction] = useActionState(action, []);

  return (
    <form action={formAction}>
      <input type="text" name="message" placeholder="Type a message..." />
      <button type="submit">Send</button>

      <h1>Messages</h1>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </form>
  );
}
```

```jsx
async function action(previousState, formData) {
  const message = formData.get("message");
  const submittedMessage = await submitMessageToApi(message);
  return [...previousState, submittedMessage];
}

export default function Page() {
  const [messages, formAction, isPending] = useActionState(action, []);

  return (
    <form action={formAction}>
      <input type="text" name="message" placeholder="Type a message..." />
      <button type="submit" disabled={isPending}>Send</button>

      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </form>
  );
}
```
````

</v-click>
x
---

# `useOptimistic`

A hook to let you show temporary state whilst a component is transitioning.

````md magic-move

```jsx
useOptimistic();
```

```jsx
const [optimisticState, addOptimisticState] = useOptimistic();
```

```jsx
const [state, setState] = useState(['some data'])
const [optimisticState, addOptimisticState] = useOptimistic(
  state
);
```

```jsx
const [state, setState] = useState(['some data'])
const [optimisticState, addOptimisticState]  = useOptimistic(
  state
 (currentState, optimisticValue) => {
    return[...currentState, optimisticValue]
  }
);
```

````


---

````md magic-move
```jsx
export default function Page() {
  const [messages, formAction] = useActionState(action, []);

  return (
    <form action={formAction}>
      <input type="text" name="message" placeholder="Type a message..." />
      <button type="submit">Send</button>

      <h1>Messages</h1>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </form>
  );
}
```

```jsx
export default function Page() {
  const [messages, formAction] = useActionState(action, []);
  const [optimisticState, addOptimistic] = useOptimistic(
    messages,
    (currentState, optimisticValue) => [...currentState, optimisticValue]
  );

  return (
    <form action={formAction}>
      <input type="text" name="message" placeholder="Type a message..." />
      <button type="submit">Send</button>

      <h1>Messages</h1>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </form>
  );
}
```


```jsx
export default function Page() {
  const [messages, formAction] = useActionState(action, []);
  const [optimisticState, addOptimistic] = useOptimistic(
    messages,
    (currentState, optimisticValue) => [...currentState, optimisticValue]
  );
  
  function handleSubmit(formData: FormData) {
    const message = formData.get("message")
    addOptimistic({ id: uuid(), message, status: "pending" });
    formAction(formData);
  }  

  return (
    <form action={handleSubmit}>
      <input type="text" name="message" placeholder="Type a message..." />
      <button type="submit">Send</button>

      <h1>Messages</h1>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </form>
  );
}
```

```jsx

export default function Page() {
  const [messages, formAction] = useActionState(action, []);
  const [optimisticState, addOptimistic] = useOptimistic(
    messages,
    (currentState, optimisticValue) => [...currentState, optimisticValue]
  );

  function handleSubmit(formData: FormData) {
    const message = formData.get("message")
    addOptimistic({ id: uuid(), message, status: "pending" });
    formAction(formData);
  }

  return (
    <>

      {optimisticState.map((msg) => (
          <div key={msg.id}>
            <div>{msg.message}</div>
            <div>{msg.status === "pending" ? "☑️" : "✅"}</div>
          </div>
        ))
      }

      <form action={handleSubmit}>
        <input
           type="text" name="message" placeholder="Type a message..."
        />

        <button className="btn" type="submit" disabled={isPending}>
          Send
        </button>
      </form>
    </>
  );
}

```


````



---
title: Final demo
---

<div class="grid place-content-center ">
  
  <iframe src="https://react-advanced-lightning-talk-demos.chiubaca.workers.dev/use-optimistic" height="500" width="500"/>
  
</div>

---
title: Fin
---

# Thank You!
