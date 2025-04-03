import { Column, ColumnType } from "../EntityRelationValidationStep"

export const setIgnoreColumn = <T extends string>({ header, index }: Column<T>): Column<T> => ({
  header,
  index,
  type: ColumnType.ignored,
})
