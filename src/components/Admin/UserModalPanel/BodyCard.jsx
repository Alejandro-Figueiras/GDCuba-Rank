import {
  Card,
  CardHeader,
  CardBody
} from '@nextui-org/react'

const BodyCard = ({ children, cardTitle }) => {
  return (
    <Card title="Datos" className="h-full">
      <CardHeader>
        <h2 className="text-center w-full">{cardTitle}</h2>
      </CardHeader>
      <CardBody className="flex gap-3 justify-center items-center p-0">
        {children}
      </CardBody>
    </Card>
  );
}

export default BodyCard