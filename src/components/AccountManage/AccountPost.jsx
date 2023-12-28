import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { PlusIcon } from "../Icons/PlusIcon";

export function AccountComments({posts}) {
  return (
    <Card className="max-w-full w-full">
      <CardHeader className="flex justify-center items-center gap-2">
        <p>
          Posts <span className="opacity-50">({posts.length}/3)</span>
        </p>
        <Button
          isIconOnly
          color="primary"
          size="sm"
          className="w-[20px] h-[20px] min-h-0 min-w-0"
        >
          <PlusIcon />
        </Button>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {posts.map((post, key) => (
          <div
            key={key}
            className="flex item-center justify-between p-4 rounded-md bg-zinc-800 relative"
          >
            <p>{post.message}</p>
            <Button
              color="danger"
              size="sm"
              className="w-[20px] h-[20px] min-h-0 min-w-0 absolute right-0 top-0"
            >
              x
            </Button>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
