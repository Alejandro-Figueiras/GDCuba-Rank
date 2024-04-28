import React, { useState } from 'react'
import { Accordion, AccordionItem } from '@nextui-org/accordion'
import ChevronUpIcon from '@/components/Icons/ChevronUpIcon'
import Link from 'next/link'

export const CollapseItems = ({ icon, items, title }) => {
  return (
    <div className='flex h-full cursor-pointer items-center gap-4'>
      <Accordion className='px-0'>
        <AccordionItem
          indicator={<ChevronUpIcon />}
          classNames={{
            indicator: 'data-[open=true]:-rotate-180',
            trigger:
              'py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5',

            title:
              'px-0 flex text-base gap-2 h-full items-center cursor-pointer'
          }}
          aria-label='Accordion 1'
          title={
            <div className='flex flex-row gap-2'>
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className='pl-12'>
            {items.map((item, index) => (
              <Link
                key={index}
                className='flex w-full  text-default-500 transition-colors hover:text-default-900'
                href={item.href}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
