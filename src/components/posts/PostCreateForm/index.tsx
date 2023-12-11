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
import { IFormStateCreatePost } from '@/types'
import FormButton from '@/components/common/FormButton'

interface IProps {
  slug: string
}

const PostCreateForm = ({ slug }: IProps): JSX.Element => {
  const [formState, formAction] = useFormState<IFormStateCreatePost, FormData>(
    actions.createPost.bind(null, slug),
    {},
  )

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={formAction} className="p-4 w-80 flex flex-col gap-4">
          <h3 className="text-lg">Create a Post</h3>
          <fieldset className="flex flex-col gap-4">
            <Input
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              name="title"
              isInvalid={!!formState.errors?.title}
              errorMessage={
                !!formState.errors?.title && formState.errors.title.join(', ')
              }
            />
            <Textarea
              label="Content"
              labelPlacement="outside"
              placeholder="Your post content"
              name="content"
              isInvalid={!!formState.errors?.content}
              errorMessage={
                !!formState.errors?.content &&
                formState.errors.content.join(', ')
              }
            />
          </fieldset>

          {formState.errors?._form && (
            <p className="p-2 bg-red-600 border border-red-800 text-white font-semibold text-center w-full rounded-xl">
              {formState.errors._form.join(', ')}
            </p>
          )}

          <FormButton>Submit</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default PostCreateForm
