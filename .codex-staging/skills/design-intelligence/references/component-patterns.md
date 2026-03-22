# Component Patterns

Proven implementations for common components in the stack (React + shadcn/ui + Tailwind + Next.js).
Read the relevant section before implementing that component type.

---

## Forms

Always use shadcn Field + Zod + React Hook Form. Never plain HTML form elements.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupText } from "@/components/ui/input-group"

const schema = z.object({
  fieldName: z.string().min(1, "Required"),
})

const MyForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { fieldName: "" },
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    // handle submission
  }

  return (
    <form id="my-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="fieldName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="field-id">Label</FieldLabel>
              <Input
                {...field}
                id="field-id"
                aria-invalid={fieldState.invalid}
                placeholder="Placeholder"
              />
              <FieldDescription>Helper text</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" form="my-form">Submit</Button>
    </form>
  )
}

export default MyForm
```

### Textarea with character count

```tsx
<InputGroup>
  <InputGroupTextarea
    {...field}
    id="field-id"
    rows={4}
    className="min-h-24 resize-none"
    aria-invalid={fieldState.invalid}
  />
  <InputGroupAddon align="block-end">
    <InputGroupText className="tabular-nums">
      {field.value.length}/200 characters
    </InputGroupText>
  </InputGroupAddon>
</InputGroup>
```

---

## Cards

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const MyCard = () => (
  <Card className="w-full sm:max-w-md">
    <CardHeader>
      <CardTitle>Title</CardTitle>
      <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>
      {/* content */}
    </CardContent>
    <CardFooter>
      {/* actions */}
    </CardFooter>
  </Card>
)

export default MyCard
```

---

## Data tables

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const MyTable = ({ data }: { data: Row[] }) => (
  <div className="rounded-lg border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Column</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

export default MyTable
```

---

## Dialogs / Modals

```tsx
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const MyDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Open</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
      </DialogHeader>
      {/* content */}
      <DialogFooter>
        <Button type="submit">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export default MyDialog
```

---

## Zustand store skeleton (for deep prop drilling — 3+ levels)

Leave as comments unless user asks to implement:

```tsx
// zustand store skeleton — implement as needed:
// import { create } from 'zustand'
//
// interface StoreState {
//   // state fields here
//   // actions here
// }
//
// const useStore = create<StoreState>((set) => ({
//   // initial state + actions
// }))
//
// export { useStore }
```

---

## Font loading (Next.js + Tailwind)

```ts
// lib/fonts.ts
import { Instrument_Serif, IBM_Plex_Mono } from 'next/font/google'

export const displayFont = Instrument_Serif({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-display',
})

export const monoFont = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-mono',
})
```

```tsx
// app/layout.tsx
import { displayFont, monoFont } from '@/lib/fonts'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${monoFont.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

Use in Tailwind: `font-[family-name:var(--font-display)]`