'use client'
import {
  Card,
  CardBody,
  Image
} from "@nextui-org/react";
import { getDifficultyNameByNumber, getDifficultyPath } from '@/helpers/levelParser';

const RecordCard = ({record, className}) => {
  if (!record) return null;
  return (<Card className={`w-[300px] ${className}`}>
    <CardBody className="flex flex-row justify-between">
      <div className="flex flex-row gap-3 justify-between">
        <Image
          alt="diff"
          height={40}
          radius="sm"
          src={getDifficultyPath({
            featured: record.featured, 
            difficultyName: getDifficultyNameByNumber(record.difficulty)
          })}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{record.levelname} {record.video && <Link href={record.video} isExternal>
            <YouTubeIcon/>
          </Link>}</p>
          <p className="text-small text-default-500">{getDifficultyNameByNumber(record.difficulty)}</p>
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        {(record.percent == 100)?<img src='/assets/ui/success.png' width={30}/>:`${record.percent}%`}
      </div>
    </CardBody>
  </Card>)
}

export default RecordCard;