import type React from "react"
import type { Column, Columns } from "../EntityRelationValidationStep"
import { Box, Flex, Heading, ModalBody, Text, useStyleConfig } from "@chakra-ui/react"
import { FadingWrapper } from "../../../components/FadingWrapper"
import { ContinueButton } from "../../../components/ContinueButton"
import { useRsi } from "../../../hooks/useRsi"
import type { themeOverrides } from "../../../theme"

type ColumnGridProps<T extends string> = {
  columns: Columns<T>
  userColumn: (column: Column<T>) => React.ReactNode
  templateColumn: (column: Column<T>) => React.ReactNode
  onContinue: (val: Record<string, string>[]) => void
  onBack?: () => void
  isLoading: boolean
}

export type Styles = (typeof themeOverrides)["components"]["EntityRelationValidationStep"]["baseStyle"]

export const ColumnGrid = <T extends string>({
  columns,
  userColumn,
  templateColumn,
  onContinue,
  onBack,
  isLoading,
}: ColumnGridProps<T>) => {
  const { translations } = useRsi()
  const styles = useStyleConfig("EntityRelationValidationStep") as Styles

  return (
    <>
      <ModalBody flexDir="column" p={8} overflow="auto">
        <Heading sx={styles.heading}>{translations.matchColumnsStep.title}</Heading>
        <Flex
          flex={1}
          display="grid"
          gridTemplateRows="auto auto auto 1fr"
          gridTemplateColumns={`0.75rem repeat(${columns.length}, minmax(18rem, auto)) 0.75rem`}
        >
          <Box gridColumn={`1/${columns.length + 3}`}>
            <Text sx={styles.title}>{translations.matchColumnsStep.userTableTitle}</Text>
          </Box>
          {columns.map((column, index) => (
            <Box gridRow="2/3" gridColumn={`${index + 2}/${index + 3}`} pt={3} key={column.header + index}>
              {userColumn(column)}
            </Box>
          ))}
          <FadingWrapper gridColumn={`1/${columns.length + 3}`} gridRow="2/3" />
          <Box gridColumn={`1/${columns.length + 3}`} mt={7}>
            <Text sx={styles.title}>{translations.matchColumnsStep.templateTitle}</Text>
          </Box>
          <FadingWrapper gridColumn={`1/${columns.length + 3}`} gridRow="4/5" />
          {columns.map((column, index) => (
            <Box
              gridRow="4/5"
              gridColumn={`${index + 2}/${index + 3}`}
              key={column.header + index}
              py="1.125rem"
              pl={2}
              pr={3}
            >
              {templateColumn(column)}
            </Box>
          ))}
        </Flex>
      </ModalBody>
      <ContinueButton
        isLoading={isLoading}
        onContinue={onContinue}
        onBack={onBack}
        title={translations.matchColumnsStep.nextButtonTitle}
        backTitle={translations.matchColumnsStep.backButtonTitle}
      />
    </>
  )
}
