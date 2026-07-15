'use client'
import { calcularTrofeo } from '@/helpers/calcularTrofeoGR'
import { useUser } from '@/hooks/useUser'
import { Table, Spinner, EmptyState, Card } from '@heroui/react'
import UsernameCell from './UsernameCell'
import React from 'react'
import { type Account } from '@/models/Account'
import { type RankingTypes } from './Rankings'

const RankTable = ({
  ranking,
  tipo = 'stars',
  loading = false
}: {
  ranking: Account[]
  tipo?: RankingTypes
  loading?: boolean
}) => {
  const { openUserView } = useUser()

  const cols: React.JSX.Element[] = [],
    cells: ((player: Account, i: number) => React.JSX.Element)[] = []

  cols.push(
    <Table.Column width={40} key={'col_pos'}>
      #
    </Table.Column>
  )
  cells.push((player, i) => (
    <Table.Cell key={`cell${i}_${player.username}_pos`}>{i + 1}</Table.Cell>
  ))

  cols.push(
    <Table.Column key={'col_name'} minWidth={180} isRowHeader>
      Jugador
    </Table.Column>
  )
  cells.push((player, i) => (
    <Table.Cell key={`cell${i}_${player.username}_name`}>
      <UsernameCell player={player} />
    </Table.Cell>
  ))

  if (tipo == 'stars') {
    cols.push(
      <Table.Column width={120} key={'col_stars'}>
        <span className='flex'>
          <img
            src='/assets/stats/starsIcon.png'
            alt='Star'
            className='mr-1 h-4'
          />{' '}
          Estrellas
        </span>
      </Table.Column>
    )
    cells.push((player, i) => (
      <Table.Cell key={`cell${i}_${player.username}_stars`}>
        <span className='flex align-middle'>
          <img
            src='/assets/stats/starsIcon.png'
            alt='Star'
            className='mr-1 h-5'
          />{' '}
          {player.stars}
        </span>
      </Table.Cell>
    ))

    cols.push(
      <Table.Column width={120} key={'col_globalrank'}>
        <span className='flex align-middle'>
          <img
            src='/assets/trofeos/rankIcon_1_001.png'
            alt='Trofeo'
            className='mr-1 h-4'
          />{' '}
          Global Rank
        </span>
      </Table.Column>
    )
    cells.push((player, i) => (
      <Table.Cell key={`cell${i}_${player.username}_globalrank`}>
        <span className='flex align-middle'>
          <img
            src={calcularTrofeo(player.globalrank)}
            alt='Trofeo'
            className='mr-1 h-5'
          />{' '}
          {player.globalrank}
        </span>
      </Table.Cell>
    ))
  } else if (tipo == 'demons') {
    cols.push(
      <Table.Column width={100} key={'col_demons'}>
        <span className='flex'>
          <img
            src='/assets/dificultades/none/hard_demon.png'
            alt='Demon'
            className='mr-1 h-4'
          />{' '}
          Demons
        </span>
      </Table.Column>
    )
    cells.push((player, i) => (
      <Table.Cell key={`cell${i}_${player.username}_demons`}>
        <span className='flex align-middle'>
          <img
            src='/assets/dificultades/none/hard_demon.png'
            alt='Demon'
            className='mr-1 h-5'
          />{' '}
          {player.demons}
        </span>
      </Table.Cell>
    ))
  } else if (tipo == 'moons') {
    cols.push(
      <Table.Column width={100} key={'col_moons'}>
        <span className='flex'>
          <img
            src='/assets/stats/moonsIcon.png'
            alt='Luna'
            className='mr-1 h-4'
          />{' '}
          Lunas
        </span>
      </Table.Column>
    )
    cells.push((player, i) => (
      <Table.Cell key={`cell${i}_${player.username}_moons`}>
        <span className='flex align-middle'>
          <img
            src='/assets/stats/moonsIcon.png'
            alt='Luna'
            className='mr-1 h-5'
          />{' '}
          {player.moons}
        </span>
      </Table.Cell>
    ))
  } else if (tipo == 'usercoins') {
    cols.push(
      <Table.Column width={110} key={'col_usercoin'}>
        <span className='flex'>
          <img
            src='/assets/stats/usercoin.png'
            alt='Coin'
            className='mr-1 h-4'
          />{' '}
          User Coins
        </span>
      </Table.Column>
    )
    cells.push((player, i) => (
      <Table.Cell key={`cell${i}_${player.username}_usercoins`}>
        <span className='flex align-middle'>
          <img
            src='/assets/stats/usercoin.png'
            alt='Coin'
            className='mr-1 h-5'
          />{' '}
          {player.usercoins}
        </span>
      </Table.Cell>
    ))
  } else if (tipo == 'cp') {
    cols.push(
      <Table.Column width={130} key={'col_cp'}>
        <span className='flex'>
          <img
            src='/assets/stats/creatorpoints.png'
            alt='CP'
            className='mr-1 h-4'
          />{' '}
          Creator Points
        </span>
      </Table.Column>
    )
    cells.push((player, i) => (
      <Table.Cell key={`cell${i}_${player.username}_cp`}>
        <span className='flex align-middle'>
          <img
            src='/assets/stats/creatorpoints.png'
            alt='CP'
            className='mr-1 h-5'
          />{' '}
          {player.creatorpoints}
        </span>
      </Table.Cell>
    ))
  } else if (tipo == 'extreme_demons') {
    cols.push(
      <Table.Column width={130} key={'col_extreme'}>
        <span className='flex align-middle'>
          <img
            src='/assets/dificultades/none/extreme_demon.png'
            alt='ED'
            className='mr-1 h-8'
          />{' '}
          Extreme
          <br />
          Demons
        </span>
      </Table.Column>
    )
    cells.push((player, i) => (
      <Table.Cell key={`cell${i}_${player.username}_extreme`}>
        <span className='flex align-middle'>
          <img
            src='/assets/dificultades/none/extreme_demon.png'
            alt='ED'
            className='mr-1 h-5'
          />{' '}
          {player.verified_extreme_demons}
        </span>
      </Table.Cell>
    ))
  }

  return (
    <div className='m-2 sm:m-4'>
      <Card>
        <Card.Content>
          <Table variant='secondary'>
            <Table.ScrollContainer>
              <Table.Content
                aria-label='Rank Table'
                className={`${tipo == 'stars' ? 'min-w-120' : 'min-w-[320px]'} overflow-scroll ${loading ? 'min-h-100' : ''}`}
              >
                <Table.Header>{cols}</Table.Header>

                <Table.Body
                  renderEmptyState={() =>
                    loading ? (
                      <EmptyState className='flex h-full w-full flex-col items-center justify-center gap-4 text-center'>
                        <Spinner size='lg' color='current' />
                        <span>Cargando datos</span>
                      </EmptyState>
                    ) : (
                      <EmptyState className='flex h-full w-full flex-col items-center justify-center gap-4 text-center'>
                        <span className='text-muted text-sm'>
                          No hay usuarios para mostrar
                        </span>
                      </EmptyState>
                    )
                  }
                >
                  {ranking.map((player, i) => (
                    <Table.Row
                      key={i + 1}
                      onAction={() => openUserView(player, true)}
                      className='cursor-pointer'
                    >
                      {cells.map((cell) => cell(player, i))}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Card.Content>
      </Card>
    </div>
  )
}

export default RankTable
