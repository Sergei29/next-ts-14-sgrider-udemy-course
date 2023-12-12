'use client'

import { Button, Textarea } from '@nextui-org/react'
import { useState, useEffect, useRef } from 'react'
import { useFormState } from 'react-dom'

import FormButton from '@/components/common/FormButton'
import * as actions from '@/lib/serverActions'

interface IProps {
  postId: string
  parentId?: string
  startOpen?: boolean
}

const CommentCreateForm = ({
  postId,
  parentId,
  startOpen,
}: IProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(() => !!startOpen)
  const [formState, formAction] = useFormState(
    actions.createComment.bind(null, { postId, parentId }),
    {},
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset()

      if (!startOpen) {
        setIsOpen(false)
      }
    }
  }, [formState.success, startOpen])

  const form = (
    <form action={formAction} ref={formRef} className="space-y-2 px-1">
      <Textarea
        name="content"
        label="Reply"
        placeholder="Enter your comment"
        isInvalid={!!formState.errors?.content}
        errorMessage={formState.errors?.content?.join(', ')}
      />
      {formState.errors?._form ? (
        <div className="p-2 bg-red-200 border rounded border-red-400">
          {formState.errors._form?.join(', ')}
        </div>
      ) : null}

      <FormButton>Create Comment</FormButton>
    </form>
  )
  return (
    <div>
      <Button
        size="sm"
        variant="light"
        onClick={() => setIsOpen((current) => !current)}
      >
        Reply
      </Button>
      {isOpen && form}
    </div>
  )
}

export default CommentCreateForm
