import { Accordion } from '@heroui/react'
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
    <li>
      <Accordion aria-label={info.title} className='px-0'>
        <Accordion.Item>
          <Accordion.Heading>
            <Accordion.Trigger>
              <div className='flex flex-col'>
                <p className='text-lg'>{info.title}</p>
                <p className='text-muted text-sm'>{info.responsiveSubtitle}</p>
              </div>
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>
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
                      <img
                        src={itemInfo.img}
                        width={'22'}
                        alt={itemInfo.label}
                      />
                    </span>
                    {itemInfo.label}
                  </div>
                </NavMenuLink>
              ))}
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </li>
  )
}
