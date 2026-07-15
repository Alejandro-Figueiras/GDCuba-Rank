'use client'

import {
  getDifficultyNameByNumber,
  getDifficultyPath
} from '@/helpers/levelParser'
import { Table, Link } from '@heroui/react'
import UsernameCell from '../Rank/UsernameCell'
import YouTubeIcon from '../Icons/YouTubeIcon'
import { type Record, type RecordLevel } from '@/models/Record'
import { type Account } from '@/models/Account'
import DictionaryObject from '@/helpers/DictionaryObject'

const ListLevelVictors = ({
  level,
  records,
  pos,
  players
}: {
  level: RecordLevel
  records: Record[]
  pos?: number
  players: DictionaryObject<Account>
}) => {
  return (
    <div className='mx-4 sm:mx-6'>
      <Table variant='secondary'>
        <Table.ScrollContainer>
          <Table.Content aria-label={level.levelname} className='mb-8'>
            <Table.Header>
              <Table.Column className='text-lg' isRowHeader>
                <div className='flex gap-2 align-middle'>
                  {pos && <span className='text-white'>{pos}.</span>}
                  <img
                    src={getDifficultyPath({
                      featured: level.featured,
                      difficultyName: getDifficultyNameByNumber(
                        level.difficulty
                      )
                    })}
                    alt='Difficulty'
                    style={{
                      height: '28px',
                      filter: `grayscale(${level.difficulty == 15 && level.difficultyscore == 0 ? 100 : 0}%)`
                    }}
                  />

                  {level.levelname}
                </div>
              </Table.Column>
            </Table.Header>
            <Table.Body>
              {records.map((record, i) => (
                <Table.Row key={i} className='ml-2'>
                  <Table.Cell className='flex gap-3 border-none'>
                    <UsernameCell player={players[record.accountid]} />
                    {record.video && (
                      <Link href={record.video}>
                        <YouTubeIcon />
                      </Link>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  )
}

export default ListLevelVictors
