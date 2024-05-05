import { Accordion, AccordionItem } from '@nextui-org/react'
import { NavMenuLink } from './NavbarLinks'
import { usePathname } from 'next/navigation'
import type FrontNavbarItem from './FrontNavbarItem'

export const ResponsiveNavAccordion = ({
  onLinkSelected,
  info
}: {
  info: {
    title: string
    startsWith: string
    responsiveSubtitle: string
    items: FrontNavbarItem[]
  }
  onLinkSelected: () => void
}) => {
  const route = usePathname()

  return (
    <Accordion aria-label={info.title} className='px-0'>
      <AccordionItem
        key='1'
        title={info.title}
        subtitle={info.responsiveSubtitle}
        classNames={{
          title: 'text-2xl'
          // indicator: "absolute left-[100px] ",
        }}
      >
        {info.items.map((itemInfo) => (
          <NavMenuLink
            href={itemInfo.href}
            fontSize={'text-lg'}
            key={itemInfo.key}
          >
            <div
              className={`mb-3 flex items-center justify-start gap-2 ${itemInfo.href == route && 'text-cyan-600'}`}
              onClick={onLinkSelected}
            >
              <span className='left-10'>
                <img src={itemInfo.img} width={'22'} alt={itemInfo.label} />
              </span>
              {itemInfo.label}
            </div>
          </NavMenuLink>
        ))}
      </AccordionItem>
    </Accordion>
  )
}
