'use client'

import { useFormState } from 'react-dom'
import {
  Button,
  Input,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react'

import * as actions from '@/lib/serverActions'
import { IFormStateCreateTopic } from '@/types'

const TopicCreateForm = (): JSX.Element => {
  const [formState, formAction] = useFormState<IFormStateCreateTopic, FormData>(
    actions.createTopic,
    {},
  )

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={formAction} className="p-4 w-80 flex flex-col gap-4">
          <h3 className="text-lg">Create a Topic</h3>
          <fieldset className="flex flex-col gap-4">
            <Input
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              name="name"
              isInvalid={!!formState.errors?.name}
              errorMessage={
                !!formState.errors?.name && formState.errors.name.join(', ')
              }
            />
            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              name="description"
              isInvalid={!!formState.errors?.description}
              errorMessage={
                !!formState.errors?.description &&
                formState.errors.description.join(', ')
              }
            />
          </fieldset>

          {formState.errors?._form && (
            <p className="p-2 bg-red-600 border border-red-800 text-white font-semibold text-center w-full rounded-xl">
              {formState.errors._form.join(', ')}
            </p>
          )}

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default TopicCreateForm
