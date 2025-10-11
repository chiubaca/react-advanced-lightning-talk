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

<!--
React 19 was released nearly a year ago now with some really useful new APIs, but I don't see devs reaching for them. 

So here are some newish APIs which I think you should consider trying, if you are not already. And if you are, I hope you still learn something new!?
-->

---

# hmu 👋🏼

<SocialContact />

<!--
I'm Alex btw.

I'm a SWE at Zoopla.

Mostly Bluesky these days. but you can find me around on various socials.
-->

---
title: `use`
class: flex flex-col items-center justify-center h-full
---


<v-click>

````md magic-move

```jsx
use();
```

```jsx
function MessagesComponent() {
   use();
}
```

```jsx
function MessagesComponent({ messagePromise }) {
  const message = use(messagePromise);
}
```

```jsx
function MessagesComponent({ messagePromise }) {
  const message = use(messagePromise);

  const theme = use(ThemeContext);
}
```

```jsx
function MessagesComponent({ messagePromise }) {
  const message = use(messagePromise);
  
  const theme = use(ThemeContext); // drop in replacement for useContext()
}
```

````

</v-click>

<!--
The one feature I recommend everyone to start using if they can.

*click 1*
the hook

*click 2*
You can load an unresolved promise into the hook and your component will resolve the promise upon mount

 
*click 2*
Its a drop in replacement for useContext
-->

---
title: Fetching data on mount with `use`
---

````md magic-move
```jsx {*|6-7|10-20|21|24|26-30|*}
function Main() {
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
function Main() {
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

# PRO TIP : You can use `use` conditionally

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

<!--
Consider this example where you want to make an API call conditionally based on a prop.

Does this break the rules of React hooks?

Reacts answer is no. Becasue `use` is not technically a hook, it is listed as an `api` in the docs.

...
-->

---
title: `useTransition`
class: text-center flex flex-col items-center justify-center h-full w-full
---


````md magic-move

```jsx
useTransition();
```

```jsx
const [isPending] =  useTransition();
```

```jsx
const [isPending, startTransition] = useTransition();
```

````

---
transition: fade

---

# Without `useTransition`

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

# With `useTransition`

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

```jsx {*|3|6-9|*}
function Page() {
  const [apiData, setApiData] = useState("");
  const [isPending, startTransition] = useTransition();

  const clickHandler = () => {
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
Not a big reduction in lines of code. So why is this better?

Performance. This particular example is a little bit contrived. But a component like a type-ahead which needs to sort a big array of data. There are a lot of under-the-hood to schedule the execution of these functions when at the most optimal time on a users deviceto reduce any jank block ui interactions.


But I also like that we have more idiomatic way to handle the pending states for async operations too.
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
title: `useOptimistic`
class:  flex flex-col items-center justify-center h-full w-full
---

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
class: text-center flex flex-col items-center justify-center h-full
---

# Thank You!

<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG5xZ3U2cWcyeXl6dmo0bGl5cHdnZDBxMXk3czI1NHd1dGZmb2R3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fWfowxJtHySJ0SGCgN/giphy.gif" alt="Keanu Reeves bowing" class="w-64 h-auto mx-auto mt-8" />
