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



### Error handling in Server forms
- the whole point of server forms - is that they can work in browser without any JS;
- the forms are sending `FormData` into server action
- we need somehow a way to communicate from server action back to browser page if something is wrong with submit
- `React-DOM` ( not `react` ), contains a hook called `useFormState`, specifically for this, this specific hook
can run on server even if there is no JS code on browser. ( the client component still renders on server first - this is where this hook will run )
- `useFormState` will render in the form component and will have a certain form state, then when the for maction is called with `FormData` - it all will go to server, is anything wrong with submit on server - it will send back to the form page this form state, the `useFormState` will receive the updated form state and will re-render form UI showing the error.
- the example use of `useFormState` can see at `src/app/snippets/new/page.tsx`.


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
