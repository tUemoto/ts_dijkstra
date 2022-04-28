// endpointのインターフェースを規定する型定義の集合

import { Static, Type } from '@sinclair/typebox'

const StartEnd = Type.Object({
  shiten: Type.String(),
  shuten: Type.String(),
})

type StartEndInterface = Static<typeof StartEnd>
