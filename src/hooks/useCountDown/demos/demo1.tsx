import React from 'react'
import useCountDown from '../index'
import { Text } from 'react-native'

export default () => {
  const [countdown, setTargetDate, formattedRes] = useCountDown({
    targetDate: '2021-12-31 24:00:00'
  })
  const { days, hours, minutes, seconds, milliseconds } = formattedRes

  return (
    <>
      <Text>
        There are {days} days {hours} hours {minutes} minutes {seconds} seconds {milliseconds}{' '}
        milliseconds until 2021-12-31 24:00:00
      </Text>
    </>
  )
}
