export default interface StuffHandlers {
  handleSort?: (accStuff: string) => Promise<void>
  handleDelete?: (id: number) => Promise<void>
  handleEdit?: () => void
  setStuffItems?: Dispatch<SetStateAction<StuffItem[]>>
}
