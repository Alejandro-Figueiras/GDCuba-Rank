'use client'
import {
  Card,
  CardBody,
  Image,
  Link
} from "@nextui-org/react";
import { getDifficultyNameByNumber, getDifficultyPath, parseDifficulty } from '@/helpers/levelParser';
import YouTubeIcon from "../Icons/YouTubeIcon";

const CreatedLevelCard = ({level, className}) => {
  if (!level) return null;

  const difficultyData = parseDifficulty(level)
  return (<Card className={`w-[300px] ${className}`}>
    <CardBody className="flex flex-row justify-between">
      <div className="flex flex-row gap-3 justify-between">
        <Image
          alt="diff"
          height={35}
          width={35}
          radius="sm"
          src={difficultyData.path}
        />
        <div className="flex flex-col justify-center">
          <p className="text-md flex gap-2">{level.levelname} {level.video && <Link href={level.video} isExternal>
            <YouTubeIcon/>
          </Link>}</p>
          
        </div>
      </div>
    </CardBody>
  </Card>)
}

export default CreatedLevelCard;