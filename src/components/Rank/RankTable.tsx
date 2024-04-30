'use client'
import { calcularTrofeo } from '@/helpers/calcularTrofeoGR'
import { useUser } from '@/hooks/useUser'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner
} from '@nextui-org/react'
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
    <TableColumn width={40} key={'col_pos'}>
      #
    </TableColumn>
  )
  cells.push((player, i) => (
    <TableCell key={`cell${i}_${player.username}_pos`}>{i + 1}</TableCell>
  ))

  cols.push(
    <TableColumn key={'col_name'} minWidth={180}>
      Jugador
    </TableColumn>
  )
  cells.push((player, i) => (
    <TableCell key={`cell${i}_${player.username}_name`}>
      <UsernameCell player={player} />
    </TableCell>
  ))

  if (tipo == 'stars') {
    cols.push(
      <TableColumn width={120} key={'col_stars'}>
        <span className='flex'>
          <img
            src='/assets/stats/starsIcon.png'
            alt='Star'
            className='mr-1 h-4'
          />{' '}
          Estrellas
        </span>
      </TableColumn>
    )
    cells.push((player, i) => (
      <TableCell key={`cell${i}_${player.username}_stars`}>
        <span className='flex align-middle'>
          <img
            src='/assets/stats/starsIcon.png'
            alt='Star'
            className='mr-1 h-5'
          />{' '}
          {player.stars}
        </span>
      </TableCell>
    ))

    cols.push(
      <TableColumn width={120} key={'col_globalrank'}>
        <span className='flex align-middle'>
          <img
            src='/assets/trofeos/rankIcon_1_001.png'
            alt='Trofeo'
            className='mr-1 h-4'
          />{' '}
          Global Rank
        </span>
      </TableColumn>
    )
    cells.push((player, i) => (
      <TableCell key={`cell${i}_${player.username}_globalrank`}>
        <span className='flex align-middle'>
          <img
            src={calcularTrofeo(player.globalrank)}
            alt='Trofeo'
            className='mr-1 h-5'
          />{' '}
          {player.globalrank}
        </span>
      </TableCell>
    ))
  } else if (tipo == 'demons') {
    cols.push(
      <TableColumn width={100} key={'col_demons'}>
        <span className='flex'>
          <img
            src='/assets/dificultades/none/hard_demon.png'
            alt='Demon'
            className='mr-1 h-4'
          />{' '}
          Demons
        </span>
      </TableColumn>
    )
    cells.push((player, i) => (
      <TableCell key={`cell${i}_${player.username}_demons`}>
        <span className='flex align-middle'>
          <img
            src='/assets/dificultades/none/hard_demon.png'
            alt='Demon'
            className='mr-1 h-5'
          />{' '}
          {player.demons}
        </span>
      </TableCell>
    ))
  } else if (tipo == 'moons') {
    cols.push(
      <TableColumn width={100} key={'col_moons'}>
        <span className='flex'>
          <img
            src='/assets/stats/moonsIcon.png'
            alt='Luna'
            className='mr-1 h-4'
          />{' '}
          Lunas
        </span>
      </TableColumn>
    )
    cells.push((player, i) => (
      <TableCell key={`cell${i}_${player.username}_moons`}>
        <span className='flex align-middle'>
          <img
            src='/assets/stats/moonsIcon.png'
            alt='Luna'
            className='mr-1 h-5'
          />{' '}
          {player.moons}
        </span>
      </TableCell>
    ))
  } else if (tipo == 'usercoins') {
    cols.push(
      <TableColumn width={110} key={'col_usercoin'}>
        <span className='flex'>
          <img
            src='/assets/stats/usercoin.png'
            alt='Coin'
            className='mr-1 h-4'
          />{' '}
          User Coins
        </span>
      </TableColumn>
    )
    cells.push((player, i) => (
      <TableCell key={`cell${i}_${player.username}_usercoins`}>
        <span className='flex align-middle'>
          <img
            src='/assets/stats/usercoin.png'
            alt='Coin'
            className='mr-1 h-5'
          />{' '}
          {player.usercoins}
        </span>
      </TableCell>
    ))
  } else if (tipo == 'cp') {
    cols.push(
      <TableColumn width={130} key={'col_cp'}>
        <span className='flex'>
          <img
            src='/assets/stats/creatorpoints.png'
            alt='CP'
            className='mr-1 h-4'
          />{' '}
          Creator Points
        </span>
      </TableColumn>
    )
    cells.push((player, i) => (
      <TableCell key={`cell${i}_${player.username}_cp`}>
        <span className='flex align-middle'>
          <img
            src='/assets/stats/creatorpoints.png'
            alt='CP'
            className='mr-1 h-5'
          />{' '}
          {player.creatorpoints}
        </span>
      </TableCell>
    ))
  } else if (tipo == 'extreme_demons') {
    cols.push(
      <TableColumn width={130} key={'col_extreme'}>
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
      </TableColumn>
    )
    cells.push((player, i) => (
      <TableCell key={`cell${i}_${player.username}_extreme`}>
        <span className='flex align-middle'>
          <img
            src='/assets/dificultades/none/extreme_demon.png'
            alt='ED'
            className='mr-1 h-5'
          />{' '}
          {player.verified_extreme_demons}
        </span>
      </TableCell>
    ))
  }

  return (
    <div className='m-2 sm:m-4'>
      <Table
        selectionMode='single'
        classNames={{
          table: `${tipo == 'stars' ? 'min-w-[480px]' : 'min-w-[320px]'} overflow-scroll ${loading ? 'min-h-[400px]' : ''}`
        }}
        aria-label='Rank Table'
      >
        <TableHeader>{cols}</TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner label='Cargando datos...' />}
          emptyContent={loading ? null : 'No hay usuarios para mostrar'}
        >
          {ranking.map((player, i) => (
            <TableRow
              key={i + 1}
              onClick={() => openUserView({ user: player, update: true })}
            >
              {cells.map((cell) => cell(player, i))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RankTable
