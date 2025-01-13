"use client"

import {ChakraProvider, createSystem, defaultConfig, SystemContext} from "@chakra-ui/react"
import {ColorModeProvider, type ColorModeProviderProps,} from "./color-mode"

export function Provider(props: ColorModeProviderProps&{system?:SystemContext}) {

  return (
    <ChakraProvider value={props.system ?? createSystem(defaultConfig)}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
