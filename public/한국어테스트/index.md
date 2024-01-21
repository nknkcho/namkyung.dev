---
title: "테스트 블로그 제목"
date: '2023-12-11'
spoiler: "이것은 테스트입니다"
---

한국어로 테스트 해보겠습니다.

```js
<p className="text-2xl font-sans text-purple-400 dark:text-purple-500">
  Hello,<i>Alice</i>!
</p>
```

한국어로 *테스트* 해보겠습니다.

```js eval
<p className="text-2xl font-sans text-purple-400 dark:text-purple-500">
  Hello,<i>Alice</i>!
</p>
```

테스트 *names* ([`<p>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p)) 테스트

---

```js {3-5}
function Greeting({ person }) {
  return (
    <p className="text-2xl font-sans text-purple-400 dark:text-purple-500">
      Hello,<i>{person.firstName}</i>!
    </p>
  );
}
```

```js
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button
      className="dark:color-white rounded-lg bg-purple-700 px-2 py-1 font-sans font-semibold text-white focus:ring active:bg-purple-600"
      onClick={() => setCount(count + 1)}
    >
      You clicked me {count} times
    </button>
  );
}
```