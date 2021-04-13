import React from 'react'

export default function Result({result}) {
    const resultVal = result

    if (!result) {
      return null
    }
    return (
        <li>
        {' '}
        {resultVal.codeResult.code} [{resultVal.codeResult.format}]{' '}
        </li>
    )
}
