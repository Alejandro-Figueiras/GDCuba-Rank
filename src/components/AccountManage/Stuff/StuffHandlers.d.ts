export default interface StuffHandlers {
  handleSort?: (accStuff: string) => Promise<void>
  handleDelete?: (id: number) => Promise<void>
  setStuffItems?: (newStuffItems: StuffItem[]) => void
}
