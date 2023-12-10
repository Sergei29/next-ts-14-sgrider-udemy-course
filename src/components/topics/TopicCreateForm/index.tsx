import {
  Button,
  Input,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react'

import * as actions from '@/lib/serverActions'

interface IProps {}

const TopicCreateForm = ({}: IProps): JSX.Element => {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          action={actions.createTopic}
          className="p-4 w-80 flex flex-col gap-4"
        >
          <h3 className="text-lg">Create a Topic</h3>
          <fieldset className="flex flex-col gap-4">
            <Input
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              name="name"
            />
            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              name="description"
            />
          </fieldset>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default TopicCreateForm
