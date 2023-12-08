## Branches
- `main`, initial create next app setup, reset
- `corp-1`, static pages, header navbar, hero section on each page
- `snippets-app-2`, save code snippets app, CRUD for code snippets, PRISMA, SQLITE

### Server actions in Server forms
- server action passed to server form has default type of: `formAction: (data: FormData) => Promise<void>`
- can be passed to form: `<form action={formAction} ...>...`
- however, it may be cases when we need to pass some arbitrary parameters to our server action, other than `FormData`,
and still be able to use with the server form, we can use javascript function binding in that case
- for example:

```tsx
const myServerAction = async (customValue: Record<string ,any>, formData: FormData ) => {
   'use server'

    // some server logic
}

const MyServerForm = async (props: any) => {
  const myData: Record<string ,any> = await fetch('https://some-url.com');

  /**
   * this will bind form action to be called with custom parameter then followed by standard FormData;
   */
  const formAction = myServerAction.bind(null, myData);

  return (
    <form action={formAction}>
      <input type="text" name="firstname"/>
      <input type="text" name="lastname"/>
      <button type="submit">submit</button>
    </form>
  )
}
```

### Error handling in Server forms
- the whole point of server forms - is that they can work in browser without any JS;
- the forms are sending `FormData` into server action
- we need somehow a way to communicate from server action back to browser page if something is wrong with submit
- `React-DOM` ( not `react` ), contains a hook called `useFormState`, specifically for this, this specific hook
can run on server even if there is no JS code on browser. ( the client component still renders on server first - this is where this hook will run )
- `useFormState` will render in the form component and will have a certain form state, then when the for maction is called with `FormData` - it all will go to server, is anything wrong with submit on server - it will send back to the form page this form state, the `useFormState` will receive the updated form state and will re-render form UI showing the error.
- the example use of `useFormState` can see at branch `snippets-app-2`, `src/app/snippets/new/page.tsx`.

```ts
export const createProfileAction = async (
  formState: { message: string },
  formData: FormData,
) => {
  'use server'

  try {
    const firstname = formData.get('firstname') as string
    const lastname = formData.get('lastname') as string

    if (!firstname || !lastname) {
      throw new Error('Form values missing')
    }

    await db.profile.create({
      data: {
        firstname,
        lastname,
      },
    })
  } catch (error) {
    return { message: getErrorMessage(error) }
  }

  revalidatePath('/')
  redirect('/')
}
```
#### Then server action imported in Form component together with the `useFormState` :

```tsx
'use client'

import { useFormState } from 'react-dom'
import { createProfileAction } from '@/lib/serverActions'

const CreateForm = () => {
 const [formState, formAction] = useFormState<{message: string}, FormData>(
    createProfileAction, // this is the server action we created above
    { message: '' }, // this is initial state value
  );

  return (
    <form action={formAction}>
      <input type="text" name="firstname"/>
      <input type="text" name="lastname"/>
      <button type="submit">submit</button>
      {
        formState.message && <p className="text-red-700">{formState.message}</p>
      }
    </form>
  )

}
```

## Caching
- Data Fetch Cache: responses from network requests made by `fetch` api, stored and reused across requests
- Router Cache: 'soft' navigation between the pages, are cached in the browser and reused when a user revisits a page
- Request Memoization: eg. make 2 or more `GET` requests using `fetch` during a user's request to your server? Only one `GET` is actually executed
- Full Route Cache: AT BUILD TIME(only), NEXT decides if your route is `static` OR `dynamic`. IF it is `static`, the page result is rendered and STORED, in production user is served this stored result.
- ○  (Static): NEXT sees that this route contains only static data, so NEXT will render it at BUILD time, cache it, and serve this cached version eevery time a user is visiting that page
- ●  (SSG): Statically generated page. NEXT will render it at BUILD time, cache it, and serve this cached version eevery time a user is visiting that page
- λ  (Dynamic): NEXT sees this route contains dynamic data, so NEXT will render this page EVERY time user visits it.

### What makes a page `dynamic` ?
- using a dynamic route: `src/app/snippets/[id]/page.tsx`, `src/app/snippets/[id]/edit/page.tsx`, unless we pre-generate static params.
- calling a `dynamic function` or referencing a `dynamic variable` whe nyour route is rendered: `cookies.set()`, `cookies.delete()`, `props.searchParams`, `useSearchParams`
- assigning a special 'route segment config' options: `export const dynamic = 'force-dynamic'`, `export const revalidate = 0`
- calling `fetch` and opt-out caching: `fetch(url, { next: { revalidate: 0 }})`

### Several ways to control caching:
- time based revalidation
- on-demand revalidation
- disable caching completely

### Enable caching for dynamic routes, `generateStaticparams()`
- at BUILD time: NEXT finds all provided routes in your dynamic segment from `generateStaticparams()`, and at BUILD time renders and caches each of them.
- when user requests one of these dynamic routes - NEXT serves these cached pages


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
